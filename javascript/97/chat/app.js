const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const socketIo = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

let chatters = {};
socketIo.on('connection', socket => {
    // console.log('Got a connection');
    // socket.emit('message', 'hello');

    let name;

    socket.on('login', (data, callback) => {
        const n = data.trim();
        if (!n.length) {
            return callback('Username is required');
        }
        if (Object.keys(chatters).find(c => c === n)) {
            return callback('Username taken. Try another');
        }
        name = n;
        chatters[name] = socket;
        socket.broadcast.emit('status', { name, joined: true });
        callback(null, Object.keys(chatters));
    });

    socket.on('message', (msg, callback) => {
        if (msg[0] == '@') {
            let index = msg.indexOf(' ');
            const pmName = msg.substring(1, index);
            if (!chatters[pmName]) {
                return callback(`No chatter named ${pmName} found`);
            }
            chatters[pmName].emit('privateMessage', { from: name, msg: msg.substr(index + 1) });
        } else {
            socketIo.emit('message', { name: name, msg: msg });
        }
    });

    socket.on('disconnect', () => {
        delete chatters[name];
        if (name) {
            socket.broadcast.emit('status', { name, joined: false });
        }
    });
});


http.listen(80);