greet();

function greet() {
    console.log('Hello!');
}

greet();

//////////////////////////

function getGreeter() {
    return function /*theGreeterFunction*/() {
        console.log('Hello');
    };
}

//theGreeterFunction();

let theGreeter = getGreeter();
console.log(theGreeter);
theGreeter();

getGreeter();
getGreeter()();

/*console.log(anotherGreeter);
anotherGreeter();
var*/let anotherGreeter = function () {
    console.log('Hello');
};

anotherGreeter();

//////////////////////////////////

function getBetterGreeter(name) {
    let greeting = 'Hello';
    return function () {
        console.log(greeting + ' ' + name);
    }
}

let greetPotus = getBetterGreeter("Donald");
/// 1000 lines of code
greetPotus();
greetPotus();

//////////////////////////////////

function multiply(x, y) {
    return x * y;
}

console.log('multiply(2,5)', multiply(2, 5));

function getMultiplier(x) {
    return function (y) {
        return x * y;
    };
}

let multiplyBy5 = getMultiplier(5);
let multiplyBy9 = getMultiplier(9);

console.log('multiplyBy5(2)', multiplyBy5(2));
console.log('multiplyBy5(3)', multiplyBy5(3));
console.log('multiplyBy5(4)', multiplyBy5(4));

console.log('multiplyBy9(2)', multiplyBy9(2));
console.log('multiplyBy9(3)', multiplyBy9(3));
console.log('multiplyBy9(4)', multiplyBy9(4));

/*function multiplyBroken(y) {
    return x * y;
}
function getMultiplierBroken(x) {
    return multiplyBroken;
}

let brokenMultiplyBy5 = getMultiplierBroken(5);
console.log('brokenMultiplyBy5(2)', brokenMultiplyBy5(2));*/