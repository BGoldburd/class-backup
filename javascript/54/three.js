function sayHi() {
    console.log('Hi');
}

for (let i = 0; i < 5; i++) {
    sayHi();
}

function repeat(action, times) {
    for (let i = 0; i < times; i++) {
        action();
    }
}

repeat(sayHi, 5);

function ourForEach(theArray, callback) {
    for (let i = 0; i < theArray.length; i++) {
        callback(theArray[i]); //, i, theArray;)
    }
}

function printIt(it) {
    console.log(it);
}

let letters = ['A', 'B', 'C'];
/*letters = ['A', 'B', 'C'];
letters.push('D');
letters[8] = 'E';*/

ourForEach(letters, function (element) {
    console.log(element);
});

ourForEach(letters, printIt);

ourForEach(letters, console.log);

letters.forEach(function (element) {
    console.log(element);
});
letters.forEach(printIt);
// letters.forEach(console.log);

function takesOneParam(a) {
    console.log(a);
}

function takesTwoParams(a, b) {
    console.log(a, b);
}

takesOneParam();
takesOneParam(1);
takesOneParam(1, 2);

takesTwoParams(1);
takesTwoParams(1, 2);
takesTwoParams(1, 2, 3);

//////////

function ourFilter(theArray, callback) {
    let filteredItems = [];

    /*for (let i = 0; i < theArray.length; i++) {
        if (callback(theArray[i])) {
            filteredItems.push(theArray[i]);
        }
    }*/
    ourForEach(theArray, function (element) {
        if (callback(element)) {
            filteredItems.push(element);
        }
    });

    return filteredItems;
}

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
/*
let odds = ourFilter(numbers, function (number) {
    return number % 2 !== 0;
});
let evens = ourFilter(numbers, function (number) {
    return number % 2 === 0;
});*/

function isOdd(number) {
    return number % 2 !== 0;
}
let odds = ourFilter(numbers, isOdd);
let evens = ourFilter(numbers, function (number) {
    return !isOdd(number);
});

console.log(numbers, 'odds', odds);
console.log(numbers, 'evens', evens);

////////////////////////

odds = numbers.filter(isOdd);
evens = numbers.filter(function (number) {
    return !isOdd(number);
});

console.log('built in filter', numbers, 'odds', odds);
console.log('built in filter', numbers, 'evens', evens);

//////////////

function ourEvery(theArray, callback) {
    /*let allPassed = true;
    ourForEach(theArray, function (element) {
        console.log('testing ' + element);
        if (!callback(element)) {
            allPassed = false;
            // return false;
        }
    });

    //return true;
    return allPassed;*/

    for (let i = 0; i < theArray.length; i++) {
        console.log('testing ' + theArray[i]);
        if (!callback(theArray[i])) {
            return false;
        }
    }

    return true;
}

console.log(ourEvery(numbers, isOdd));

