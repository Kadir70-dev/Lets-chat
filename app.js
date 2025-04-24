// app.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
const cors = require('cors');

require('dotenv').config();


const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
const server = http.createServer(app);
// const io = socketIo(server);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    // methods: ['GET', 'POST'],
    credentials: true
  }
});
// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});



// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api', messageRoutes);

io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle sendMessage event
  socket.on('sendMessage', (msg) => {
    console.log('Message received:', msg);

    // Emit the message to all connected clients except the sender
    const modifiedMsg = { ...msg, sender: 'Friend', status: 'seen' };
    socket.broadcast.emit('receiveMessage', modifiedMsg);

    // After a delay, mark the message as seen for the sender
    setTimeout(() => {
      socket.emit('receiveMessage', { ...msg, status: 'seen' });
    }, 1500);
  });

   // Simulate message typing behavior
   setTimeout(() => {
    socket.broadcast.emit('typing', 'Friend');
  }, 1000);

  // Typing indicator
  socket.on('typing', (user) => {
    socket.broadcast.emit('typing', user);
  });
  console.log('Client connected',socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected',socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
