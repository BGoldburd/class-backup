const http = require('http');

http.createServer((req, res) => {
    //res.setHeader('content-type', 'text/html');
    //res.write('Goodbye World');
    //res.end();
    res.statusCode = 404;
    res.end('Sorry, this is not the page you are looking for. Page not found.');
}).listen(80);