var app = (function (theModule) {
    'use strict';

    /*return {
        c: function () {
            console.log('c');
        },
        d: function () {
            console.log('d');
        }
    };*/

    theModule.c = function () {
        console.log('c');
    };

    theModule.d = function () {
        console.log('d');
    };

    return theModule;
}(app || {}));



// app.c();
// app.d();