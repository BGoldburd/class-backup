//const connect = require('connect');
//const app = connect();
const app = require('connect')();
// const url = require('url');

app.use(require('./logger'));

app.use(require('./fileServerMiddleware'));

app.use((req, res, next) => {
    //res.write('Hello from connect');
    res.setHeader('Content-Type', 'text/html');
    next();
});

app.use('/home', (req, res, next) => {
    res.end('<h1>Welcome to PCS</h1>');
    //next();
});

app.use('/about', (req, res, next) => {
    res.end('<h1>PCS is a non profit great place</h1>');
    //next();
});

/*app.use((req, res, next) => {
    const parsedUrl = url.parse(req.url, true);
    req.query = parsedUrl.query;
    next();
});*/
app.use(require('./queryParser'));

app.use('/sayHello', (req, res, next) => {
    // const parsedUrl = url.parse(req.url, true);
    res.end(`<h2>Hello ${req.query.name || ' guest'}!</h2>`);
    //next();
});

app.use('/sayGoodbye', (req, res/*, next*/) => {
    // const parsedUrl = url.parse(req.url, true);
    res.end(`<h2>Goodbye ${req.query.name || ' guest'}!</h2>`);
    //next();
});

app.use('/makeError', (req, res, next) => {
    // foo.bar();
    // throw new Error('Something bad happened');
    next(new Error('Something bad happened'));
});

app.use((err, req, res, next) => {
    res.write(`<h3>OOPS: ${err.message} </h3>`);
    next(err);
});

app.use((err, req, res, next) => {
    res.end(`<h3>MORE OOPS: ${err.message} </h3>`);
});

app.use((req, res, next) => {
    res.statusCode = 404;
    res.end('<h2>No such page. Try again</h2>');
});

/*app.use((req, res, next) => {
    res.end('<hr/><h5>Copyright &copy; 2019</h5>');
});*/


app.listen(80);