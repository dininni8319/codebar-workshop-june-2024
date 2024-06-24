// init socket.io
const socket = io();

// Get the input and button elements
const messageInput = document.querySelector('#message-input');
const nameInput = document.querySelector('#name-input');

const button = document.querySelector('button');
const messageContainer = document.querySelector("#message-container");

// Function to handle sending a message
function sendMessage() {
    // Get the message text from the input
    const message = messageInput.value;

    // Send message to server
    socket.emit('newMessage', {
        sender: nameInput.value,
        message: message
    });

    // Clear the input field
    messageInput.value = '';
}

// Add event listener to the button for sending a message
button.addEventListener('click', sendMessage);

// Handle receiving new messages from the server
socket.on("dispenseMessage", data => {
    const { sender, message } = data;

    console.log("🚀 ~ message:", message)

    // Create a new message element
    const messageElement = document.createElement("div");
    messageElement.classList.add('message'); // Add a generic class for styling

    // Set the message content
    // const username = document.createElement("span");
    // username.textContent = sender;
    // messageElement.appendChild(username)
    messageElement.textContent = `${sender}: ${message}`; // Use textContent to prevent HTML injection

    // Append the message element to the message container
    const messageContainer = document.querySelector(".message-container");
    messageContainer?.appendChild(messageElement);
});

// Function to escape HTML characters (if needed)
function escapeHTML(html) {
    return html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
