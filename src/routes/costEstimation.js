const express = require('express');
const router = express.Router();
const { getFullCost, getPartialCost } = require('../controller/estimatedCostController');

router.get('/:recipe_id', getFullCost);
router.get('/:recipe_id/:exclude_ids', getPartialCost);

module.exports = router;
