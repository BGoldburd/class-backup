const connect = require('connect');
const app = connect();

app.use('/home', (req, res, next) => {
    res.end('Welcome to the PCS home page');
});

app.use('/about', (req, res, next) => {
    res.end('PCS is a great place');
});

app.use(require('./queryParser'));
app.use(require('./basicAuth')({
    users: {
        donald: 'trump',
        mike: 'pence'
    }
}));

app.use('/admin', (req, res, next) => {
    res.end('This is the admin page');
});

app.use((err, req, res, next) => {
    res.statusCode = err.statusCode ? err.statusCode : 500;
    res.end(err.message ? err.message : 'Something went wrong');
});

app.listen(80);