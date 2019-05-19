const myModule = require('./myModule');
myModule.sayHello();
//console.log(myModule.getGreeting());

const Person = require('./Person');
const donald = new Person('Donald Trump', 'dtrump@whitehouse.gov');
//console.log(donald);
donald.print();