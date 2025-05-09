// routes/chatRoutes.js
const express = require('express');
const { createChatRoom, getChatRooms } = require('../controllers/chatController');
const router = express.Router();

router.post('/chatrooms', createChatRoom);
router.get('/chatrooms', getChatRooms);


module.exports = router;
