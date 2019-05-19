const http = require('http');
const map = require('through2-map');

http.createServer((req, res) => {
    if( req.method !== 'POST') {
        return res.end('NO UPPERCASE FOR YOU');
    }
    /*req.pipe(map(chunk => {
        return chunk.toString().toUpperCase();
    }).pipe(res);*/
    req.on('data', data => res.write(data.toString().toUpperCase()));
    req.on('end', () => res.end());
}).listen(+process.argv[2]);