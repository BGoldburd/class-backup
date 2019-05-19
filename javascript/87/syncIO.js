const fs = require('fs');
const theText = fs.readFileSync(process.argv[2], 'utf-8');
//console.log(theText.toString().split('\n').length - 1);
console.log(theText.split('\n').length - 1);
console.log('After read file');
