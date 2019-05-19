const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    //console.log(req.url);
    const theUrl = url.parse(req.url, true);
    //console.log(theUrl);
    res.setHeader('content-type', 'text/html');
    switch (theUrl.pathname) {
    case '/':
        res.statusCode = 301;
        res.setHeader('Location', '/foo.html');
        break;
    // or just fall through
    case '/foo.html':
        res.write('<h1>Have some FOO!</h1>');
        break;
    case '/about.html':
        res.write('<h2>The FOO pages are brought to you by PCS</h2>');
        break;
    case '/sayHi':
        res.write(`<h2>Hello ${theUrl.query.name || ' guest'}!</h2>`);
        break;
    default:
        res.statusCode = 404;
        res.write('<h2 style="color: red">404. No such page</h2>');
    }
    res.end();
}).listen(80);