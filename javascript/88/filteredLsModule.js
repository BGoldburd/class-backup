const fs = require('fs'),
    path = require('path');

module.exports = function (dir, extension, callback) {
    fs.readdir(dir, (err, files) => {
        const ext = '.' + extension;
        if (err) {
            callback(err);
            return;
        }
        callback(null, files.filter(f => path.extname(f) === ext));
    });
};