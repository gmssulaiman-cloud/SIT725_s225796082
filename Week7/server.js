const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('A client connected');

  socket.emit('welcome', 'Connected to live status board');

  socket.on('postStatus', (statusText) => {
    io.emit('newStatus', statusText);
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});