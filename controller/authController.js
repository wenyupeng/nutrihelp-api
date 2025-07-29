const { insertAuthLog } = require('../model/auth_logs');

exports.logLoginAttempt = async (req, res) => {
  const { email, user_id, success, ip_address, created_at } = req.body

  if (!email || success === undefined || !ip_address || !created_at) {
    return res.status(400).json({
      error: 'Missing required fields: email, success, ip_address, created_at',
    })
  }

  await insertAuthLog(req.body);

  return res.status(201).json({ message: 'Login attempt logged successfully' })
}
