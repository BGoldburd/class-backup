const fls = require('./filteredLsModule');

fls(process.argv[2], process.argv[3], (err, files) => {
    if (err) {
        console.error(err);
    } else {
        files.forEach(f => console.log(f));
    }
});