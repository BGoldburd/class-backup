const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');

router.post('/register', (req, res) => {
    if (!req.body.name || !req.body.password) {
        res.status(400).end('name and password are required');
    }
    bcrypt.hash(req.body.password, null, null, (err, hash) => {
        if (err) {
            return res.status(500).end(err);
        }
        req.app.locals.users.insertOne({ name: req.body.name, password: hash }, (err, result) => {
            if (err) {
                const msg = err.code = 11000 ? 'Duplicate user name, please try another' : 'Unable to register';
                return res.status(500).end(msg);
            }
            res.status(201).end();
        });

    });
});

router.get('/logout', require('../authenticatedOnly'), (req, res, next) => {
    req.session.destroy();
    res.end();
});

router.post('/login', (req, res, next) => {
    if (!req.body.name || !req.body.password) {
        res.status(400).end('name and password are required');
    } else {
        req.app.locals.users.findOne({ name: req.body.name }, (err, user) => {
            if (err) {
                return res.status(401).end(err);
            }

            if (!user) {
                return res.status(401).end('Invalid user / password');
            }
            bcrypt.compare(req.body.password, user.password, (err, hashResult) => {
                if (hashResult) {
                    req.session.user = req.body.name;
                    return res.end();
                } else {
                    return res.status(401).end('Invalid user / password');
                }
            });
        });
    }
});

module.exports = router;
