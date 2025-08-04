const express = require("express");
const router = express.Router();
const { updateUserPassword } = require('../controller/userPasswordController');

router.route('/').put(function (req, res) {
  updateUserPassword(req, res);
});

module.exports = router;