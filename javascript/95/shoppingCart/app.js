var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const Cart = require('./cart');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'mySecret',
    cookie: {
        maxAge: 20000
    },
    resave: false,
    saveUninitialized: false
}));

global.items = [
    {
        id: 1,
        name: 'mouse',
        description: 'wireless computer mouse',
        price: 9.99,
        img: 'https://assets.logitech.com/assets/64362/8/wireless-mouse-m325.png'
    },
    {
        id: 2,
        name: 'keyboard',
        description: 'wireless computer keyboard',
        price: 19.95,
        img: 'https://images-na.ssl-images-amazon.com/images/G/01/aplus/detail-page/B005DKZTMG_K400_FOB_US_lg.jpg'
    }
];

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => {
    let cart = new Cart(req.session.cart ? req.session.cart.items : {});
    req.session.cart = cart;
    next();
});

app.post('/addToCart', (req, res, next) => {
    req.session.cart.addItem(req.body.id, +req.body.count || 1);
    res.redirect('/');
});

app.get('/cart', (req, res, next) => {
    const items = req.session.cart.getItems();

    res.render('layout',
        {
            items: items,
            empty: !items.length,
            notEmpty: items.length,
            grandTotal: items.reduce((a, b) => a + +b['subtotal'], 0).toFixed(2),
            partials: {
                content: 'cart'
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

module.exports = app;
