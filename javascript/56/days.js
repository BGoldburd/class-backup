const daysUtils = (function () {
    'use strict';

    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return {
        getDayName: function (num) {
            return days[num - 1];
        },
        getDayNumber: function (name) {
            /*return 1 + days.findIndex(function (element) {
                return element === name;
            });*/
            return 1 + days.indexOf(name);
        }
    };
}());

console.log('daysUtils.getDayName(2)', daysUtils.getDayName(2));
console.log('daysUtils.getDayNumber("Tuesday")', daysUtils.getDayNumber("Tuesday"));
