const express = require('express');
const app = express();
const mongo = require('mongodb');
const path = require('path');
const socketIo = require('socket.io');
let io;
let posts;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = 'Mongo Socket.io Blog';

app.get('/', (req, res, next) => {
    posts.find().toArray((err, postResults) => {
        if (err) {
            return next(err);
        }

        res.render('layout', {
            subtitle: 'Welcome to the blog!',
            links: [{ href: 'addPost', text: 'Add Post' }],
            css: ['posts'],
            scripts: ['posts'],
            posts: postResults,
            partials: {
                content: 'posts',
                comments: 'comments'
            }
        });
    });
});

app.get('/addPost', (req, res) => {
    res.render('layout', {
        subtitle: 'Add new post',
        links: [{ href: '/', text: 'Home' }],
        css: ['addPost'],
        partials: {
            content: 'newPost'
        }
    });
});

app.post('/addPost', (req, res, next) => {
    const newPost = {
        title: req.body.title,
        content: req.body.content,
        author: 'someone',
        date: new Date()
    };
    posts.insert(newPost, (err, result) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

app.post('/posts/:id/comments', (req, res, next) => {
    const newComment = {
        content: req.body.content,
        author: 'someone',
        date: new Date()
    };
    posts.update({ _id: mongo.ObjectId(req.params.id) },
        { $push: { comments: newComment } }, (err, result) => {
            if (err) {
                return next(err);
            }
            // io.emit('comment', { post: req.params.id, comment: newComment });
            res.render('comments', {
                comments: [newComment]
            }, (err, html) => {
                if (err) {
                    return next(err);
                }
                io.emit('comment', { post: req.params.id, comment: html });
                res.end('Comment added');
            });
        });
});

mongo.MongoClient('mongodb://localhost:27017').connect((err, client) => {
    if (err) {
        console.error(err);
    }

    const db = client.db('blog');
    posts = db.collection('posts');
});

io = socketIo.listen(app.listen(80));