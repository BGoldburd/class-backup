/*let defaultWidth = 100;
let userSettingWidth;

let width = userSettingWidth || defaultWidth;
console.log(width);*/

var app = (function (theModule) {
    'use strict';

    /*return {
        a: function () {
            console.log('a');
        },
        b: function () {
            console.log('b');
        }
    };*/

    theModule.a = function () {
        console.log('a');
    };

    theModule.b = function () {
        console.log('b');
    };

    return theModule;
}(app || {}));

// app.a();
// app.b();


