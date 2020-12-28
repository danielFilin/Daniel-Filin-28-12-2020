const express = require('express');

const router = express.Router();
const messagesController = require('../controllers/messages');

router.post('/user/new-message', messagesController.addMessage);

router.get('/user/get-messages', messagesController.getMessages);

router.delete('/user/delete-message/:id', messagesController.deleteMessage);

module.exports = router;
