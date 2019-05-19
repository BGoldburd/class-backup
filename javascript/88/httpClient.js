const http = require('http');

http.get(process.argv[2], res => {
    res.setEncoding('utf8');
    res.on('data', console.log);
    res.on('error', err => console.error('INNER ERROR: =>', err));
}).on('error', err => console.error('OUTER ERROR: =>', err));