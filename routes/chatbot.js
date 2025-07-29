const express = require('express');
const router = express.Router();
const {getChatResponse,addURL,addPDF, getChatHistory,clearChatHistory  } = require('../controller/chatbotController');

router.post('/query', getChatResponse);

// router.route('/chat').post(chatbotController.getChatResponse);
router.post('/add_urls', addURL);
router.post('/add_pdfs', addPDF);

router.post('/history', getChatHistory);
router.delete('/history', clearChatHistory);

module.exports = router;
