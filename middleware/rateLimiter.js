const rateLimit = require('express-rate-limit');

// Global Rate Limiting Middleware
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 1000 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        status: 429,
        error: "Too many requests, please try again later.",
    },
});

// For login and MFA
const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 20,
  message: {
    status: 429,
    error: "Too many login attempts, please try again after 10 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// For signup
const signupLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10,
  message: {
    status: 429,
    error: "Too many signup attempts, please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// For contact us and feedback forms
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: {
    status: 429,
    error: "Too many form submissions from this IP, please try again after an hour.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { globalLimiter, loginLimiter, signupLimiter, formLimiter };