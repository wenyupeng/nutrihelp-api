const express = require("express");
const router = express.Router();
const { postUserPreferences, getUserPreferences } = require("../controller/userPreferencesController");
const authenticateToken = require("../middleware/authenticateToken");
const { validateUserPreferences } = require("./validators/userPreferencesValidator");
const ValidateRequest = require("../middleware/validateRequest");

router.get("/", authenticateToken, getUserPreferences);

router.post(
  "/",
  authenticateToken,
  validateUserPreferences,
  ValidateRequest,
  postUserPreferences
);

module.exports = router;