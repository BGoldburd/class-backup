var app = app || {};
app.counter2 = (function () {
    'use strict';

    let numberOfCounters = 0;

    /*return function () {
        numberOfCounters++;
        console.log('There are now', numberOfCounters);

        let counter = 0;

        function increment() {
            counter++;
        }

        function getCount() {
            return counter;
        }

        return {
            increment: increment,
            getCount: getCount,
            numberOfCounters: function () {
                return numberOfCounters;
            }
        };
    }*/

    return {
        createCounter: function () {
            numberOfCounters++;

            let counter = 0;

            function increment() {
                counter++;
            }

            function getCount() {
                return counter;
            }

            return {
                increment: increment,
                getCount: getCount
            };
        },
        numberOfCounters: function () {
            return numberOfCounters;
        }
    };
}());
