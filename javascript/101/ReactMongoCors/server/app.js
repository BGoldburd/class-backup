const express = require('express');
const app = express();
const mongo = require('mongodb');
const path = require('path');
const socketIo = require('socket.io');
const session = require('express-session');

app.use(require('cors')({
    origin: 'http://127.0.0.1:3000',
    credentials: true
}));

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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/posts', require('./routes/posts'));
app.use('/', require('./routes/users'));

mongo.MongoClient('mongodb://localhost:27017').connect((err, client) => {
    if (err) {
        console.error(err);
    }

    const db = client.db('blog');
    app.locals.posts = db.collection('posts');
    app.locals.users = db.collection('users');
});

app.locals.io = socketIo.listen(app.listen(80));
