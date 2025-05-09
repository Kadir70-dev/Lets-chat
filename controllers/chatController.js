const ChatRoom = require('../models/ChatRoom');
const User = require('../models/User');

exports.createChatRoom = async (req, res) => {
  const { name } = req.body;

  // Validate request body
  if (!name ) {
    return res.status(400).json({ message: 'Name and users are required' });
  }

  try {
    const chatRoom = new ChatRoom({ name });
    console.log(chatRoom);
    await chatRoom.save();
    res.status(201).json(chatRoom);
  } catch (error) {
    console.error('Error creating chat room:', error);
    res.status(500).json({ message: 'Error creating chat room', error });
  }
};

exports.getChatRooms = async (req, res) => {
  try {
    const chatRooms = await ChatRoom.find().populate('users', 'username');
    console.log(chatRooms);
    res.status(200).json(chatRooms);
  } catch (error) {
    console.error('Error fetching chat rooms:', error);
    res.status(500).json({ message: 'Error fetching chat rooms', error });
  }
};
