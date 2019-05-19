const http = require('http');
const results = [];
let finished = 0;

function httpGet(url, index) {
    http.get(url, res => {
        let result = '';
        res.setEncoding('utf8');
        res.on('data', data => {
            result += data;
        });
        res.on('end', () => {
            results[index] = result;
            if (++finished === 3) {
                results.forEach(r => console.log(r));
            }
        });
        res.on('error', err => console.error('INNER ERROR: =>', err));
    }).on('error', err => console.error('OUTER ERROR: =>', err));
}

for (let i = 0; i < 3; i++) {
    httpGet(process.argv[i + 2], i);
}
