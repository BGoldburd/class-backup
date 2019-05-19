const fs = require('fs');
const path = require('path');

const mimeTypes = {
    '.html' : 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript'
};

module.exports = (req, res, next) => {
    const url = `public/${req.url}`;

    const readStream = fs.createReadStream(url);
    const ext = path.extname(url);
    if (mimeTypes[ext]) {
        res.setHeader('content-type', mimeTypes[ext]);
    }
    readStream.pipe(res);

    readStream.on('error', err => {
        if (err.code === 'ENOENT') {
            next();
            return;
        }
        next(err);
    });
};