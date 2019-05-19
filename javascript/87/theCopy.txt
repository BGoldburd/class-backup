const fs = require('fs');
const readStream = fs.createReadStream(process.argv[2], 'utf-8');
const writeStream = fs.createWriteStream(process.argv[3]);

/*readStream.on('data', data => {
    writeStream.write(data);
});

readStream.on('end', () => {
    writeStream.end();
});*/

readStream.pipe(writeStream);

writeStream.on('finish', () => {
    console.log('finish event');
});

readStream.on('error', err => {
    console.error('error event:', err);
});

writeStream.on('error', err => {
    console.error('error event:', err);
});
