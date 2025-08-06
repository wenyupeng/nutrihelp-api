const express = require('express');
const router = express.Router();
const { uploadFile } = require('../controller/uploadController');

router.post('/', uploadFile);

module.exports = router;
