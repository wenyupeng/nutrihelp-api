const express = require('express');
const router = express.Router();
const { predict } = require('../controller/medicalPredictionController');

// router.route('/predict').post(obesityPredictionController.predict);
router.post('/retrieve', predict);

module.exports = {
    path: '/medical-report',
    router
};

