const express = require('express');
const app = express();
const mongo = require('mongodb');
const socketIo = require('socket.io');
let io;
let posts;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(require('cors')(/*{
    origin: 'http://localhost:3000'
}*/));
/*app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    next();
});*/

app.get('/posts', (req, res, next) => {
    let skip = +req.query.skip || 0;
    let numPosts = +req.query.limit;

    posts.find().skip(skip).limit(numPosts).toArray((err, postResults) => {
        if (err) {
            return res.status(500).end(err);
        }

        res.json(postResults);
    });
});

app.post('/posts', (req, res, next) => {
    const newPost = {
        title: req.body.title,
        content: req.body.content,
        author: req.user,
        date: new Date()
    };
    posts.insert(newPost, (err, result) => {
        if (err) {
            return res.status(500).end(err);
        }
        io.emit('post');
        res.status(201).json(newPost);
    });
});

app.post('/posts/:id/comments', (req, res, next) => {
    const newComment = {
        content: req.body.content,
        author: req.user,
        date: new Date()
    };
    posts.update({ _id: mongo.ObjectId(req.params.id) },
        { $push: { comments: newComment } }, (err, result) => {
            if (err) {
                return res.status(500).end(err);
            }
            io.emit('comment', { post: req.params.id, comment: newComment });
            res.status(201).json(newComment);
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