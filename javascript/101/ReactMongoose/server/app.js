const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const socketIo = require('socket.io');
const session = require('express-session');

app.use(session({
    secret: 'mySecret',
    cookie: {
        // maxAge: 20000
        // expires: false
    },
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/posts', require('./routes/posts'));
app.use('/', require('./routes/users'));

app.get('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'build') + '/index.html');
});

mongoose.connect('mongodb://localhost:27017/blog', err => {
    if (err) {
        console.error(err);
    }
});

app.locals.io = socketIo.listen(app.listen(80));
