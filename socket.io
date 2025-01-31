const socket = io();

sendButton.addEventListener('click', () => {
  let message = messageInput.value;
  if (message.trim()) {
    let msgData = {
      sender: 'Your Name',
      message: message,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    socket.emit('send_message', msgData);

    let newMessage = document.createElement('div');
    newMessage.classList.add('message');
    newMessage.innerHTML = `
      <img src="user_profile.jpg" alt="User Profile">
      <span class="sender-name">Your Name</span>
      <p class="message-text">${message}</p>
      <span class="timestamp">${msgData.timestamp}</span>
    `;
    messageWindow.appendChild(newMessage);
    messageInput.value = '';
    messageWindow.scrollTop = messageWindow.scrollHeight;
  }
});

socket.on('receive_message', (msgData) => {
  let newMessage = document.createElement('div');
  newMessage.classList.add('message');
  newMessage.innerHTML = `
    <img src="sender_profile.jpg" alt="Sender's Profile">
    <span class="sender-name">${msgData.sender}</span>
    <p class="message-text">${msgData.message}</p>
    <span class="timestamp">${msgData.timestamp}</span>
  `;
  messageWindow.appendChild(newMessage);
  messageWindow.scrollTop = messageWindow.scrollHeight;
});
