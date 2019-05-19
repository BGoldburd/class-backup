const http = require('http');
const fs = require('fs');
const path = require('path');

const mimeTypes = {
    '.html' : 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript'
};

http.createServer((req, res) => {
    if(req.url === '/') {
        res.statusCode = 301;
        res.setHeader('Location', '/index.html');
        res.end();
        return;
        //req.url = '/index.html';
    }
    const url = `public/${req.url}`;

    const readStream = fs.createReadStream(url);
    const ext = path.extname(url);
    if (mimeTypes[ext]) {
        res.setHeader('content-type', mimeTypes[ext]);
    }
    readStream.pipe(res);
    readStream.on('error', err => {
        res.statusCode = 500;
        res.setHeader('content-type', mimeTypes['.html']);
        res.end(`<h2 style="color:red">${err.message}</h2>`);
    });

    /*fs.readFile(url, (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader('content-type', mimeTypes['.html']);
            res.end(`<h2 style="color:red">${err.message}</h2>`);
        } else {
            const ext = path.extname(url);
            if (mimeTypes[ext]) {
                res.setHeader('content-type', mimeTypes[ext]);
            }
            res.end(data);
        }
    });*/
}).listen(80);