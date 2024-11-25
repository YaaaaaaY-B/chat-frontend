// Connect to the Socket.io server (replace this URL with your actual Heroku URL later)
const socket = io('https://your-backend.herokuapp.com');  // Replace with your Heroku URL

const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const chatBox = document.getElementById('chat-box');

// Send message on button click
sendBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('message', message);
        messageInput.value = '';
    }
});

// Receive message and append it to the chat box
socket.on('message', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = msg;
    chatBox.appendChild(messageElement);
});
