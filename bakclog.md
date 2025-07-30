# abstract parameters
some fix domain need to be parameter in env parameter
- chtbotController.js

# unify validate
when validate the input, inject validateRequest in relevant routes.

# update url
```js
router.post('/query', chatbotController.getChatResponse);

// router.route('/chat').post(chatbotController.getChatResponse);
router.post('/add_urls', chatbotController.addURL);
router.post('/add_pdfs', chatbotController.addPDF);

router.post('/history', chatbotController.getChatHistory);
router.delete('/history', chatbotController.clearChatHistory);
```

