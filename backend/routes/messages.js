const express = require('express');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();
const messagesController = require('../controllers/messages');

router.post('/user/new-message', checkAuth, messagesController.addMessage);

router.get('/user/get-messages', checkAuth, messagesController.getMessages);

router.delete('/user/delete-message/:id/:messageStatus', checkAuth, messagesController.deleteMessage);

module.exports = router;
