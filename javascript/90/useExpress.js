const express = require('express');
const app = express();

app.get('/',(req, res, next) => {
    res.send('Welcome to express!');
});

app.get('/sayHello', (req, res, next) => {
    res.send(`Hello ${req.query.name ? req.query.name : 'guest'}`);
});

app.get('/sayHello/:name', (req, res, next) => {
    res.send(`Hello #2 ${req.params.name ? req.params.name : 'guest'}`);
});

app.get('/reports/:division/:year/:month', (req, res, next) => {
    res.send(req.params);
});

app.param('userId', (req, res, next) => {
    // look up user in database by id...
    req.user = {
        name: 'Name from db',
        id: req.params.userId
    };
    next();
});

app.get('/one/:userId', (req, res, next) => {
    res.send(req.user);
});

app.get('/two/:userId', (req, res, next) => {
    res.send(req.user);
});

app.listen(80);