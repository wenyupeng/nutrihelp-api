const express = require("express");
const router = express.Router();
const { getAllDietaryRequirements, getAllCuisines, getAllAllergies,
    getAllIngredients, getAllCookingMethods, getAllSpiceLevels, getAllHealthConditions
} = require("../controller/foodDataController");


router.get("/dietaryrequirements", getAllDietaryRequirements);
router.get("/cuisines", getAllCuisines);
router.get("/allergies", getAllAllergies);
router.get("/ingredients", getAllIngredients);
router.get("/cookingmethods", getAllCookingMethods);
router.get("/spicelevels", getAllSpiceLevels);
router.get("/healthconditions", getAllHealthConditions);

module.exports = {
    path: '/fooddata',
    router: router
};