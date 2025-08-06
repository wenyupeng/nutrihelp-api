const express = require("express");
const router = express.Router();
const { getIngredientSubstitutions } = require("../controller/ingredientSubstitutionController");

// Route to get substitution options for a specific ingredient
router.get("/ingredient/:ingredientId", getIngredientSubstitutions);

module.exports = {
    path: '/substitution',
    router
};