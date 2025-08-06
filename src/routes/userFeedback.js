const express = require("express");
const router = express.Router();
const { userfeedback } = require('../controller/userFeedbackController');
const { feedbackValidation } = require('./validators/feedbackValidator');
const validate = require('../middleware/validateRequest');
const { formLimiter } = require('../middleware/rateLimiter');

router.post('/', formLimiter, feedbackValidation, validate, (req, res) => {
    userfeedback(req, res);
});

module.exports = {
    path: '/userfeedback',
    router
};
