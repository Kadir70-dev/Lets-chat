// const http = require('http');
// const socketIo = require('socket.io');
// const app = require('./app');
// const socketHandler = require('./sockets');

// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//     allowedHeaders: ['Content-Type'],
//   }
// });

// io.on('connection', (socket) => socketHandler(socket, io));

// const PORT = process.env.PORT || 5000;
// server.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
