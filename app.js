const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path'); // Include path module

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Event listener for socket.io connections
io.on("connection", (socket) => {
    console.log("A user has connected");

    // Handle new message event
    socket.on("newMessage", (data) => {
        console.log("Message:\t", data);
        // Broadcast the message to all connected clients
        io.emit("dispenseMessage", data);
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("A user has disconnected");
    });
});

// Serve the index.html file for the root route
app.get('/', (req, res) => {
    // Send the HTML file as the response
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start the server
const port = process.env.PORT || 3000; // Use process.env.PORT if available, otherwise use port 3000
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
