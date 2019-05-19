var app = app || {};

// app.myFunction = function () { };

app.utils = (function (theModule) {
    'use strict';

    theModule.caseInsensitiveCompare = function (a, b) {
        return a.toUpperCase() === b.toUpperCase();
    };

    return theModule;
}(app.utils || {}));

