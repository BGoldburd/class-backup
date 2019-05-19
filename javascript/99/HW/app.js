const express = require('express');
const app = express();
const mongo = require('mongodb');
const path = require('path');
const socketIo = require('socket.io');
const NUM_POSTS_PER_PAGE = 3;
let io;
let posts;
let numPosts;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.locals.title = 'Mongo Socket.io Blog';

app.get('/', (req, res, next) => {
    let skip = +req.query.skip || 0;

    posts.find()/*.sort({ date: -1 })*/.skip(skip).limit(NUM_POSTS_PER_PAGE).toArray((err, postResults) => {
        if (err) {
            return next(err);
        }

        res.render('layout', {
            subtitle: 'Welcome to the blog!',
            links: [{ href: 'addPost', text: 'Add Post' }],
            css: ['posts'],
            scripts: ['posts'],
            posts: postResults,
            numPosts: numPosts,
            partials: {
                content: 'postContainer',
                posts: 'posts',
                comments: 'comments'
            }
        });
    });
});

app.get('/morePosts', (req, res, next) => {
    let skip = +req.query.skip || 0;

    posts.find().skip(skip)/*.sort({ date: -1 })*/.limit(NUM_POSTS_PER_PAGE).toArray((err, postResults) => {
        if (err) {
            return next(err);
        }

        res.render('posts', {
            posts: postResults,
            partials: {
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

const auth = require('./basicAuth')({
    users: {
        donald: 'trump',
        mike: 'pence'
    }
});

app.post('/addPost', auth, (req, res, next) => {
    const newPost = {
        title: req.body.title,
        content: req.body.content,
        author: req.user,
        date: new Date()
    };
    posts.insert(newPost, (err, result) => {
        if (err) {
            return next(err);
        }
        numPosts++;
        io.emit('post');
        res.redirect('/');
    });
});

app.post('/posts/:id/comments', auth, (req, res, next) => {
    const newComment = {
        content: req.body.content,
        author: req.user,
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
    posts.count((err, num) => {
        numPosts = num;
    });
});

io = socketIo.listen(app.listen(80));