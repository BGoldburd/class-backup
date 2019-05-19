(function () {
    'use strict';

    function map(theArray, callback) {
        let mappedArray = [];

        theArray.forEach(function (element) {
            mappedArray.push(callback(element));
        });

        return mappedArray;
    }

    let numbers = [2, 4, 6, 8];

    function double(number) {
        return number * 2;
    }

    let doubledNumbers = map(numbers, double);

    let tripledNumbers = map(numbers, function (number) {
        return number * 3;
    });

    console.log(numbers, doubledNumbers, tripledNumbers);

    console.log(numbers, numbers.map(double), numbers.map(function (number) {
        return number * 3;
    }));
}());