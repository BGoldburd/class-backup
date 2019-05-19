let x = 5;
x = 'hello';
x = 5.7;

let a = 1;
let b = "1";
console.log('a == b', a == b);

console.log('"1" - 1', "1" - 1);
console.log('"1" + 1', "1" + 1);
console.log('Number("1") + 1', Number("1") + 1);

console.log('typeof a', typeof a);
console.log('typeof b', typeof b);

console.log('a === b', a === b);
console.log('a != b', a != b);
console.log('a !== b', a !== b);

let c = a / "a";
let d = b / "b";
console.log(c, d, c == d);

if (isNaN(c)) {
    console.log('c is NaN');
}

let e;
let f = null;
console.log(e);
console.log(f);
//console.log(g);

console.log('null == undefined', null == undefined);
console.log('null === undefined', null === undefined);

if (e == undefined) {

}

if (e == null) {

}

if (e === null || e === undefined) {

}