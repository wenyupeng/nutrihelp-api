const express = require('express');
const { filterRecipes } = require('../controller/recipeFilterController');

const router = express.Router();

// Define the /filter route
router.get('/', filterRecipes);

module.exports = {
    path: '/filter',
    router: router
};