const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserCredentials } = require("../model/usersModel");
const { addMfaToken, verifyMfaToken } = require("../model/mfatokensModel");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");
const supabase = require("../model/dbConnection");
const { validationResult } = require("express-validator");

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;

  let clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress || req.ip;
  clientIp = clientIp === "::1" ? "127.0.0.1" : clientIp;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const tenMinutesAgoISO = new Date(Date.now() - 10 * 60 * 1000).toISOString();

  try {
    // Count failed login attempts in the past 10 minutes
    const { data: failuresByEmail } = await supabase
      .from("brute_force_logs")
      .select("id")
      .eq("email", email)
      .eq("success", false)
      .gte("created_at", tenMinutesAgoISO);

    const failureCount = failuresByEmail?.length || 0;

    if (failureCount >= 10) {
      return res.status(429).json({
        error: "❌ Too many failed login attempts. Please try again after 10 minutes."
      });
    }

    // Validate credentials
    const user = await getUserCredentials(email);
    const userExists = user && user.length !== 0;
    const isPasswordValid = userExists ? await bcrypt.compare(password, user.password) : false;
    const isLoginValid = userExists && isPasswordValid;

    if (!isLoginValid) {
      await supabase.from("brute_force_logs").insert([{
        email,
        ip_address: clientIp,
        success: false,
        created_at: new Date().toISOString()
      }]);

      if (failureCount === 9) {
        return res.status(429).json({
          warning: "⚠ You have one attempt left before your account is temporarily locked."
        });
      }

      if (!userExists) return res.status(401).json({ error: "Invalid email" });
      if (!isPasswordValid) return res.status(401).json({ error: "Invalid password" });
    }

    // Log successful login
    await supabase.from("brute_force_logs").insert([{
      email,
      success: true,
      created_at: new Date().toISOString()
    }]);

    // ✅ Delete all failed attempts for this email
    const { error: deleteError } = await supabase
      .from("brute_force_logs")
      .delete()
      .eq("email", email)
      .eq("success", false);

    if (deleteError) {
      console.error("Failed to delete failed logs:", deleteError);
    }

    // MFA handling
    if (user.mfa_enabled) {
      const token = crypto.randomInt(100000, 999999);
      await addMfaToken(user.user_id, token);
      await sendEmail(user, token);
      return res.status(202).json({
        message: "An MFA Token has been sent to your email address"
      });
    }

    // JWT generation
    const token = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ user, token });

  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const loginMfa = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const email = req.body.email?.trim().toLowerCase();
  const password = req.body.password;
  const mfa_token = req.body.mfa_token;

  if (!email || !password || !mfa_token) {
    return res.status(400).json({ error: "Email, password, and token are required" });
  }

  try {
    const user = await getUserCredentials(email);
    if (!user || user.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const tokenValid = await verifyMfaToken(user.user_id, mfa_token);
    if (!tokenValid) {
      return res.status(401).json({ error: "Token is invalid or has expired" });
    }

    const token = jwt.sign(
      { userId: user.user_id },
      process.env.JWT_TOKEN,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ user, token });

  } catch (err) {
    console.error("MFA login error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

async function sendEmail(user, token) {
  sgMail.setApiKey(process.env.SENDGRID_KEY);
  try {
    await sgMail.send({
      to: user.email,
      from: "nutrihelpnoreply@gmail.com",
      subject: "Nutrihelp login Token",
      text: `Your token to log in is ${token}`,
      html: `Your token to log in is <strong>${token}</strong>`
    });
    console.log("Email sent successfully!");
  } catch (err) {
    console.error("Error sending email:", err);
  }
}

module.exports = { login, loginMfa };