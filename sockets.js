module.exports = (socket, io) => {
    console.log('New client connected');
  
    socket.on('sendMessage', (msg) => {
      console.log('Message received:', msg);
  
      const modifiedMsg = { ...msg, sender: 'Friend', status: 'seen' };
      socket.broadcast.emit('receiveMessage', modifiedMsg);
  
      setTimeout(() => {
        socket.emit('receiveMessage', { ...msg, status: 'seen' });
      }, 1500);
    });
  
    setTimeout(() => {
      socket.broadcast.emit('typing', 'Friend');
    }, 1000);
  
    socket.on('typing', (user) => {
      socket.broadcast.emit('typing', user);
    });
  
    socket.on('videoSignal', (data) => {
      socket.broadcast.emit('videoSignal', data);
    });
  
    socket.on('disconnect', () => {
      console.log('Client disconnected', socket.id);
    });
  };
  