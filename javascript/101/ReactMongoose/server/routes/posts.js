const express = require('express');
const router = express.Router();
const authenticatedOnly = require('../authenticatedOnly');
const Post = require('../models/post');

router.route('/')
    .get((req, res) => {
        Post.find({}, (err, postResults) => {
            if (err) {
                res.status(500).end(err);
            }

            res.status(200).json(postResults);
        });
    })
    .post(authenticatedOnly, (req, res) => {
        const newPost = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.session.user
        });
        newPost.save(err => {
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
    Post.findByIdAndUpdate(req.params.id,
        { $push: { comments: newComment } }, (err, updatedPost) => {
            if (err) {
                res.status(500).end(err);
            }
            if (!updatedPost) {
                return res.status(404).end('No post found for id');
            }
            const commentData = { post: req.params.id, comment: newComment };
            req.app.locals.io.emit('comment', commentData);
            res.status(201).json(commentData);
        });
});

module.exports = router;
