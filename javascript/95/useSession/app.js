var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const db = require('./db');
const bcrypt = require('bcrypt-nodejs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(session({
    secret: 'mySecret',
    cookie: {
        maxAge: 20000
    },
    resave: false,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/useSession', (req, res, next) => {
    if (req.session.pageViews) {
        req.session.pageViews++;
        res.write(`<p>You visited this site ${req.session.pageViews} times</p>`);
        res.send();
    } else {
        req.session.pageViews = 1;
        res.send('Welcome to the site for the first time (at least in 20 seconds)');
    }
});

app.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/');
});

app.post('/login', (req, res, next) => {
    if (!req.body.user || !req.body.password) {
        next(new Error('name and password are required'));
    } else {
        db((err, connection) => {
            if (err) {
                return next(err);
            }
            connection.query('SELECT hashed_password FROM users2 WHERE name = ?', [req.body.user], (err, result) => {
                connection.release();
                if (err) {
                    return next(err);
                }
                if (!result.length) {
                    return next(new Error('Invalid name and password'));
                }
                bcrypt.compare(req.body.password, result[0].hashed_password, (err, hashResult) => {
                    if (hashResult) {
                        req.session.user = req.body.user;
                        res.redirect('/loggedInOnly');
                    } else {
                        next(new Error('Invalid name and password'));
                    }
                });
            });
        });
    }
});

/*app.use((req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    next();
});*/
const auth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/');
    }
    next();
};

app.get('/loggedInOnly', auth, (req, res, next) => {
    res.render('layout', {
        user: req.session.user,
        partials: {
            content: 'logged_in_only'
        }
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

/* we dont have a register page....
bcrypt.hash('trump', null, null, (err, hash) => {
    console.log('trump', hash);
});*/

module.exports = app;
