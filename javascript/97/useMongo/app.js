var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongo = require('mongodb');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
let people;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/people', (req, res, next) => {
    people.find().toArray((err, persons) => {
        if (err) {
            return next(err);
        }
        res.render('people', {
            people: persons
        });
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

mongo.MongoClient('mongodb://localhost:27017').connect((err, client) => {
    if (err) {
        console.error(err);
    }

    const db = client.db('one');
    /*const*/ people = db.collection('people');

    /*people.find().toArray((err, persons) => {
        persons.forEach(p => {
            console.log(p.name, p.age);
        });
    });*/
});

module.exports = app;
