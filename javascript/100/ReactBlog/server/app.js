const express = require('express');
const app = express();
const mongo = require('mongodb');
const socketIo = require('socket.io');
const session = require('express-session');
const posts = require('./routes/posts');
const authentication = require('./routes/authentication');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('cors')({
    origin: 'http://localhost:3000',
    credentials: true
}));
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});*/

app.use(session({
    secret: 'mySecret',
    cookie: {
        // maxAge: 20000
        expires: false,
        secure: false
    },
    resave: false,
    saveUninitialized: false
}));

app.use('/', authentication);
app.use('/posts', posts);

mongo.MongoClient('mongodb://localhost:27017').connect((err, client) => {
    if (err) {
        console.error(err);
    }

    const db = client.db('blog');
    app.locals.posts = db.collection('posts');
    app.locals.users = db.collection('users');
});

app.locals.io = socketIo.listen(app.listen(80));