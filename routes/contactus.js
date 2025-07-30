const express = require("express");
const router = express.Router();
const { addContactMsg } = require('../controller/contactusController');

// Import the validation rule and middleware
const { contactusValidator } = require('./validators/contactusValidator.js');
const validate = require('../middleware/validateRequest.js');
const { formLimiter } = require('../middleware/rateLimiter'); // rate limiter added

router.post('/', formLimiter, contactusValidator, validate, (req, res) => {
    addContactMsg(req, res);
});

module.exports = router;