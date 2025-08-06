const express = require('express');
const router = express.Router();
const { scaleRecipe } = require('../controller/recipeScalingController');

router.get('/:recipe_id/:desired_servings', scaleRecipe);

module.exports = router;