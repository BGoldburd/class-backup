const fs = require('fs'),
    path = require('path');

fs.readdir(process.argv[2], (err, files) => {
    const ext = '.' + process.argv[3];
    files.filter(f => path.extname(f) === ext)
        .forEach(f => console.log(f));
});