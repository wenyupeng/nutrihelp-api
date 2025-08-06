const express = require("express");
const router = express.Router();
const controller = require('../controller/mealplanController.js');
const { addMealPlanValidation, getMealPlanValidation, deleteMealPlanValidation } = require('./validators/mealplanValidator');
const validate = require('../middleware/validateRequest');

// Route to add a meal plan
router.post('/', addMealPlanValidation, validate, (req, res) => {
    controller.addMealPlan(req, res);
});

// Route to get a meal plan
router.get('/', getMealPlanValidation, validate, (req, res) => {
    controller.getMealPlan(req, res);
})

// Route to delete a meal plan
router.delete('/', deleteMealPlanValidation, validate, (req, res) => {
    controller.deleteMealPlan(req, res);
});

module.exports = router;