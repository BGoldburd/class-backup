//var x;
//var sayHi;

console.log(x);
//console.log(y);
//console.log(b);

console.log('add(2,3)', add(2, 3));

function add(x, y) {
    return x + y;
}

console.log('add(hello,3)', add('hello', 3));

console.log('sayHi before', sayHi);
// sayHi();
var sayHi = function () {
    console.log('Hi!');
};
console.log('sayHi after', sayHi);
sayHi();

var x = 5;
// var x = 6;
y = 6;
//console.log(z);
let z = 27;
z = 28;
const zz = 29;
zz = 30;
function foo() {
    //var x;
    console.log('x in foo', x);
    var a = 15;
    b = 16;
    console.log(a, b);
    var x = 10;
}

foo();
console.log(x);
console.log(y);
console.log(b);
console.log(a);