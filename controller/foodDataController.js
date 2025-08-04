const { fetchAllDietaryRequirements } = require("../model/dietaryRequirementsModel");
const { fetchAllCuisines } = require("../model/cuisinesModel");
const { fetchAllAllergies } = require("../model/allergiesModel");
const { fetchAllIngredients } = require("../model/ingredientsModel");
const { fetchAllCookingMethods } = require("../model/cookingMethods");
const { fetchAllSpiceLevels } = require("../model/spiceLevelsModel");
const { fetchAllHealthConditions } = require("../model/healthConditionsModel");

const getAllDietaryRequirements = async (req, res) => {
    try {
        const dietaryRequirements = await fetchAllDietaryRequirements();
        return res.status(200).json(dietaryRequirements);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getAllCuisines = async (req, res) => {
    try {
        const cuisines = await fetchAllCuisines();
        return res.status(200).json(cuisines);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getAllAllergies = async (req, res) => {
    try {
        const allergies = await fetchAllAllergies();
        return res.status(200).json(allergies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getAllIngredients = async (req, res) => {
    try {
        const foodTypes = await fetchAllIngredients();
        return res.status(200).json(foodTypes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getAllCookingMethods = async (req, res) => {
    try {
        const cookingMethods = await fetchAllCookingMethods();
        return res.status(200).json(cookingMethods);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getAllSpiceLevels = async (req, res) => {
    try {
        const spiceLevels = await fetchAllSpiceLevels();
        return res.status(200).json(spiceLevels);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const getAllHealthConditions = async (req, res) => {
    try {
        const healthConditions = await fetchAllHealthConditions();
        return res.status(200).json(healthConditions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getAllDietaryRequirements,
    getAllCuisines,
    getAllAllergies,
    getAllIngredients,
    getAllCookingMethods,
    getAllSpiceLevels,
    getAllHealthConditions
};