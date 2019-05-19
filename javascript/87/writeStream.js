const fs = require('fs');
const writeStream = fs.createWriteStream(process.argv[2]);

writeStream.write('This is something to write');
writeStream.end();

writeStream.on('finish', () => {
    console.log('finish event');
});

writeStream.on('error', err => {
    console.error('error event:', err);
});