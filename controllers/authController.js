// controllers/authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};


exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    console.log('Starting login process for:', username);
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log('User found:', username);
    
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      console.log('Password does not match for user:', username);
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    console.log('Password matches for user:', username);
    
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    console.log('Token generated for user:', username, token);
    res.json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Error logging in user', error });
  }
};