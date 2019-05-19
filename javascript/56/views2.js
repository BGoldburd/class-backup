var app = app || {};

app.views = (function (theModule) {
    'use strict';

    theModule.anotherViewFunction = function () {
        console.log('Im another view function');
    };

    return theModule;
}(app.views || {}));