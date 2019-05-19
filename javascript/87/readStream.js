const fs = require('fs');
const readStream = fs.createReadStream(process.argv[2], 'utf-8');

/*readStream.on('data', data => {
    console.log('data event:', data);
});*/

setTimeout(() => {
    readStream.on('data', data => {
        console.log('=====> second data event:', data);
    });
}, 2000);

let chunks = 0;
/*readStream.on('data', () => {
    chunks++;
});*/

readStream.on('end', () => {
    console.log('end event: total chunks = ', chunks);
});

readStream.on('error', err => {
    console.error('error event:', err);
});
