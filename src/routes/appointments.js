const express = require('express');
const router = express.Router();
const { getAppointments, saveAppointment } = require('../controller/appointmentController');
const { appointmentValidator } = require('./validators/appointmentValidator');
const validate = require('../middleware/validateRequest');

// POST /api/appointments, save appointment data
// todo: is it necessary to have two validate
router.post('/', appointmentValidator, validate, saveAppointment);

// GET /api/appointments, retrieve all appointment data
router.get('/', getAppointments);

module.exports = router;