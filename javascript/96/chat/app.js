const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const socketIo = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

let chatters = [];
socketIo.on('connection', socket => {
    // console.log('Got a connection');
    // socket.emit('message', 'hello');

    let name;

    socket.on('login', (data, callback) => {
        const n = data.trim();
        if (!n.length) {
            return callback('Username is required');
        }
        if (chatters.find(c => c === n)) {
            return callback('Username taken. Try another');
        }
        name = n;
        chatters.push(name);
        socket.broadcast.emit('status', `${name} has joined the chat`);
        callback();
    });

    socket.on('message', msg => {
        socketIo.emit('message', { name: name, msg: msg });
    });

    socket.on('disconnect', () => {
        chatters = chatters.filter(c => c !== name);
        socket.broadcast.emit('status', `${name} has left the chat`);
    });
});


http.listen(80);