'use strict';

function some(anArray, callback) {
    for (let i = 0; i < anArray.length; i++) {
        if (callback(anArray[i])) {
            return true;
        }
    }
    return false;
}

let capitalLetters = ['A', 'B', 'C'];
let lowercaseLetters = ['a', 'b', 'c'];
let mixedLetters = ['A', 'b', 'C'];

function isUpperCase(letter) {
    return letter === letter.toUpperCase();
}

console.log('some(capitalLetters, isUpperCase)', some(capitalLetters, isUpperCase));
console.log('some(lowercaseLetters, isUpperCase)', some(lowercaseLetters, isUpperCase));
console.log('some(mixedLetters, isUpperCase)', some(mixedLetters, isUpperCase));

console.log('capitalLetters.some(isUpperCase)', capitalLetters.some(isUpperCase));
console.log('lowercaseLetters.some(isUpperCase)', lowercaseLetters.some(isUpperCase));
console.log('mixedLetters.some(isUpperCase)', mixedLetters.some(isUpperCase));


function onlyIf(anArray, test, action) {
    for (let i = 0; i < anArray.length; i++) {
        if (test(anArray[i])) {
            action(anArray[i]);
        }
    }
}

function printIt(it) {
    console.log(it);
}

console.log('onlyIf(mixedLetters, isUpperCase, printIt)', onlyIf(mixedLetters, isUpperCase, printIt));

mixedLetters.filter(isUpperCase).forEach(printIt);