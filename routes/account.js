const express = require('express');
const router = express.Router();
const { getAllAccount } = require("../controller/accountController");

router.get('/', getAllAccount);

module.exports = router;