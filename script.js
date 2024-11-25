// Connect to the back-end server using Socket.io
const socket = io('https://chat-backend-3wqd.onrender.com');  // Replace with your Render back-end URL

// Get references to DOM elements
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-btn');

// Function to append messages to the chat box
function appendMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add(sender === 'user' ? 'user-message' : 'other-message');
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;  // Auto scroll to the bottom
}

// Listen for incoming messages
socket.on('message', (message) => {
    appendMessage(message, 'other');  // Display the received message as from another user
});

// Send message when the button is clicked
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message.trim()) {
        socket.emit('message', message);  // Send the message to the server
        appendMessage(`You: ${message}`, 'user');  // Display the message on the sender's screen
        messageInput.value = '';  // Clear the input field
    }
});

// Allow pressing "Enter" to send a message
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});
