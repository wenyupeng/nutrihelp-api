const express = require('express');
const router = express.Router();
const { createAndSaveRecipe, getRecipes, deleteRecipe } = require('../controller/recipeController');
const { validateRecipe } = require('./validators/recipeValidator');
const validateRequest = require('../middleware/validateRequest');

// Validate and create recipe
router.post('/createRecipe', validateRecipe, validateRequest, createAndSaveRecipe);

router.post('/', getRecipes);
router.delete('/', deleteRecipe);

module.exports = router;
