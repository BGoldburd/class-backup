const router = require('express').Router();
const mongo = require('mongodb');
const authenticatedOnly = require('../authenticatedOnly');

router.route('/')
    .get((req, res, next) => {
        let skip = +req.query.skip || 0;
        let numPosts = +req.query.limit;

        req.app.locals.posts.find().skip(skip).limit(numPosts).toArray((err, postResults) => {
            if (err) {
                return res.status(500).end(err);
            }

            res.json(postResults);
        });
    })
    .post(authenticatedOnly, (req, res, next) => {
        const newPost = {
            title: req.body.title,
            content: req.body.content,
            author: req.user,
            date: new Date()
        };
        req.app.locals.posts.insert(newPost, (err, result) => {
            if (err) {
                return res.status(500).end(err);
            }
            req.app.locals.io.emit('post');
            res.status(201).json(newPost);
        });
    });

router.post('/:id/comments', authenticatedOnly, (req, res, next) => {
    const newComment = {
        content: req.body.content,
        author: req.user,
        date: new Date()
    };
    req.app.locals.posts.update({ _id: mongo.ObjectId(req.params.id) },
        { $push: { comments: newComment } }, (err, result) => {
            if (err) {
                return res.status(500).end(err);
            }
            req.app.locals.io.emit('comment', { post: req.params.id, comment: newComment });
            res.status(201).json(newComment);
        });
});

module.exports = router;