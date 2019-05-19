const http = require('http');

http.get(process.argv[2], res => {
    let result = '';
    res.setEncoding('utf8');
    res.on('data', data => {
        result += data;
    });
    res.on('end', () => {
        console.log(result.length);
        console.log(result);
    });
    res.on('error', err => console.error('INNER ERROR: =>', err));
}).on('error', err => console.error('OUTER ERROR: =>', err));