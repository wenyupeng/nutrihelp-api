const express = require('express')
const router = express.Router()

const { logLoginAttempt } = require('../controller/authController')

router.post('/log-login-attempt', logLoginAttempt)

module.exports = router
