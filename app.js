// app.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
require('dotenv').config();


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

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


// Socket.io connection
io.on('connection', (socket) => {
    console.log('New client connected');
  
    socket.on('sendMessage', (message) => {
      io.emit('receiveMessage', message);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

const PORT = process.env.PORT || 3000;
server.listen(PORT,'0,0,0,0', () => console.log(`Server running on port ${PORT}`));
