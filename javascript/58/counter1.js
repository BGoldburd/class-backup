var app = app || {};
app.counter = (function () {
    'use strict';

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
}());
