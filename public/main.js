document.addEventListener('DOMContentLoaded', (event) => {
  const socket = io();

  const messages = document.getElementById('messages');
  const messageInput = document.getElementById('messageInput');
  const sendButton = document.getElementById('sendButton');

  sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
      socket.emit('sendMessage', message);
      messageInput.value = '';
    }
  });

  socket.on('receiveMessage', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;
  });
});
