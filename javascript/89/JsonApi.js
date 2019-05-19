const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    const theUrl = url.parse(req.url, true);
    const date = new Date(theUrl.query.iso);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (theUrl.pathname === '/api/parsetime') {
        res.write(JSON.stringify({
            hour: date.getHours(),
            minute: date.getMinutes(),
            second:  date.getSeconds()
        }));
    } else if (theUrl.pathname === '/api/unixtime') {
        res.write(JSON.stringify({unixtime: date.getTime()}));
    } else {
        res.write('bad request');
    }
    res.end();
}).listen(+process.argv[2]);