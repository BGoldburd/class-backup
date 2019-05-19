const express = require('express');
const router = express.Router();
const ObjectId = require('mongodb').ObjectId;
const authenticatedOnly = require('../authenticatedOnly');

router.route('/')
    .get((req, res) => {
        req.app.locals.posts.find().toArray((err, postResults) => {
            if (err) {
                res.status(500).end(err);
            }

            res.status(200).json(postResults);
        });
    })
    .post(authenticatedOnly, (req, res) => {
        const newPost = {
            title: req.body.title,
            content: req.body.content,
            author: req.session.user,
            date: new Date()
        };
        req.app.locals.posts.insert(newPost, (err, result) => {
            if (err) {
                res.status(500).end(err);
            }
            res.status(201).json(newPost);
        });
    });

router.post('/:id/comments', authenticatedOnly, (req, res) => {
    const newComment = {
        content: req.body.content,
        author: req.session.user,
        date: new Date()
    };
    req.app.locals.posts.update({ _id: ObjectId(req.params.id) },
        { $push: { comments: newComment } }, (err, result) => {
            if (err) {
                res.status(500).end(err);
            }
            if (!result.result.nModified) {
                return res.status(404).end('No post found for id');
            }
            const commentData = { post: req.params.id, comment: newComment };
            app.locals.io.emit('comment', commentData);
            res.status(201).json(commentData);
        });
});

module.exports = router;
