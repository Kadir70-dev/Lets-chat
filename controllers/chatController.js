const ChatRoom = require('../models/ChatRoom');
const User = require('../models/User');

exports.createChatRoom = async (req, res) => {
  const { name } = req.body;

  console.log('Received request to create chat room');
  console.log('Request body:', req.body);

  // Validate request body
  if (!name) {
    console.warn('Validation failed: Missing name');
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    console.log('Creating new ChatRoom instance');
    const chatRoom = new ChatRoom({ name });

    console.log('ChatRoom instance created:', chatRoom);

    console.log('Saving chat room to database...');
    await chatRoom.save();

    console.log('ChatRoom saved successfully');
    res.status(201).json(chatRoom);
  } catch (error) {
    console.error('Error occurred while creating chat room:', error);
    res.status(500).json({ message: 'Error creating chat room', error });
  }
};

exports.getChatRooms = async (req, res) => {
  console.log('Received request to fetch chat rooms');

  try {
    console.log('Fetching chat rooms from database...');
    const chatRooms = await ChatRoom.find().populate('users', 'username');

    console.log('Chat rooms fetched successfully from database');
    // Log the chat rooms for debugging
    console.log('Fetched chat rooms:', chatRooms);

    res.status(200).json(chatRooms);
  } catch (error) {
    console.error('Error occurred while fetching chat rooms:', error);
    res.status(500).json({ message: 'Error fetching chat rooms', error });
  }
};
