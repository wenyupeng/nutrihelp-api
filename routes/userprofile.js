const express = require("express");
const router = express.Router();
const { getUserProfile, updateUserProfile } = require('../controller/userProfileController');
const updateUserProfileController = require('../controller/updateUserProfileController');

router.put('/', function (req, res) {
  updateUserProfile(req, res);
});

router.get('/', function (req, res) {
  getUserProfile(req, res);
});

router.put('/update-by-identifier', updateUserProfileController.updateUserProfile);

module.exports = router;