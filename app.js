const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

const cors = require('cors');

const app = express();

app.use(cors());
const server = http.createServer(app);
const io = socketIo(server);

// Replace this with your actual Google Maps API key
const googleMapsApiKey = 'AIzaSyCa_C1GIFGfE-T50ac8_ZSweJ2SG-hFtUI';

// Serve the client files
app.use(express.static('public'));

// Handle the root route to serve the index.html file
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

io.on('connection', (socket) => {
    console.log('New client connected');

    // Receive the coordinates from the client
    socket.on('sendCoordinates', (coordinates) => {
        console.log('Received coordinates:', coordinates);
        // Emit the coordinates back to the client
        socket.emit('coordinates', coordinates);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const port = process.env.PORT || 4000;
server.listen(port, () => console.log(`Server running on port ${port}`));
