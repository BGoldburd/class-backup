const fs = require('fs');
const http = require('http');

http.createServer((req, res) => {
    /*const stream =*/ fs.createReadStream(process.argv[3]).pipe(res);

    // stream.on('data', data => res.write(data));
    // stream.on('end', res.end());
}).listen(+process.argv[2]);