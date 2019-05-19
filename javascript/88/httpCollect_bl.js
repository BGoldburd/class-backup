const http = require('http');
const bl = require('bl');

http.get(process.argv[2], res => {
    res.pipe(bl((err, data) => {
        if (err) {
            console.error('INNER ERROR: =>', err);
        } else {
            console.log(data.length);
            console.log(data.toString());
        }
    }));
}).on('error', err => console.error('OUTER ERROR: =>', err));