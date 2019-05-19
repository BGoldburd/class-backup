// "use strict";

/*
/ *var* / const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

function getMonthName(number) {
    return months[number - 1];
}

function getMonthNumber(name) {
    for (let i = 0; i < months.length; i++) {
        if (months[i] === name) {
            return i + 1;
        }
    }
    return 'No such month';
}

console.log('getMonthName(2)', getMonthName(2));
console.log('getMonthNumber("February")', getMonthNumber("February"));*/

/*
var monthUtils = {
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'],

    getMonthName: function (number) {
        return this.months[number - 1];
    },

    getMonthNumber: function (name) {
        for (let i = 0; i < this.months.length; i++) {
            if (this.months[i] === name) {
                return i + 1;
            }
        }
        return 'No such month';
    }
};


console.log('monthUtils.getMonthName(2)', monthUtils.getMonthName(2));
console.log('monthUtils.getMonthNumber("February")', monthUtils.getMonthNumber("February"));*/

/*
function mapUtils() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];

    /*function getMonthName(number) {
        return months[number - 1];
    }

    function getMonthNumber(name) {
        for (let i = 0; i < months.length; i++) {
            if (months[i] === name) {
                return i + 1;
            }
        }
        return 'No such month';
    }

    return {
        getMonthName: getMonthName,
        getMonthNumber: getMonthNumber
    }* /

    return {
        getMonthName: function (number) {
            return months[number - 1];
        },
        getMonthNumber: function (name) {
            for (let i = 0; i < months.length; i++) {
                if (months[i] === name) {
                    return i + 1;
                }
            }
            return 'No such month';
        }
    }
}

let mu = mapUtils();
console.log('mu.getMonthName(2)', mu.getMonthName(2));
console.log('mu.getMonthNumber("February")', mu.getMonthNumber("February"));*/

const mu = (function () {
    'use strict';

    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];

    return {
        getMonthName: function (number) {
            return months[number - 1];
        },
        getMonthNumber: function (name) {
            for (let i = 0; i < months.length; i++) {
                if (months[i] === name) {
                    return i + 1;
                }
            }
            return 'No such month';
        }
    };
}());

console.log('mu.getMonthName(2)', mu.getMonthName(2));
console.log('mu.getMonthNumber("February")', mu.getMonthNumber("February"));