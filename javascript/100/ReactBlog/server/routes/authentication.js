const router = require('express').Router();
const bcrypt = require('bcrypt-nodejs');

router.get('/logout', require('../authenticatedOnly'), (req, res, next) => {
    req.session.destroy();
    res.end();
});

router.post('/register', (req, res, next) => {
    if (!req.body.name || !req.body.password) {
        next(new Error('name and password are required'));
    } else {
        bcrypt.hash(req.body.password, null, null, (err, hash) => {
            if (err) {
                return res.status(500).end('Unable to register #1');
            }

            req.app.locals.users.insertOne({ name: req.body.name, password: hash }, (err, result) => {
                console.error(err);
                if (err) {
                    const message = err.code === 11000 ? 'Duplicate user name' : 'Unable to register';
                    return res.status(500).end(message);
                }

                res.status(201).end();
            });
        });
    }
});

router.post('/login', (req, res, next) => {
    if (!req.body.name || !req.body.password) {
        next(new Error('name and password are required'));
    } else {
        req.app.locals.users.findOne({ name: req.body.name }, (err, result) => {
            if (err) {
                return res.status(401).end('Unable to login');
            }

            if (!result) {
                return res.status(401).end('Invalid name and password');
            }
            bcrypt.compare(req.body.password, result.password, (err, hashResult) => {
                if (hashResult) {
                    req.session.user = req.body.user;
                    res.end();
                } else {
                    return res.status(401).end('Invalid name and password');
                }
            });
        });
    }
});

module.exports = router;