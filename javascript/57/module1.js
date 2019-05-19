var app = app || {};

app.utils = (function (theModule) {
    'use strict';

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    function getDayName(num) {
        return days[num - 1];
    }

    function getDayNumber(name) {
        return 1 + days.indexOf(name);
    }

    /*return {
        getDayName: getDayName,
        getDayNumber: getDayNumber
    }*/
    theModule.getDayName = getDayName;
    theModule.getDayNumber = getDayNumber;

    return theModule;
}(app.utils || {}));

//console.log(dayUtils.getDayName(1));

/*
dayUtilsObject = {
    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    getDayName: function(num) {
        return this.days[num - 1];
    },
    getDayNumber: function(name) {
        return 1 + this.days.indexOf(name);
    }
}
*/
