var app = app || {};

app.models = (function (theModule) {
    'use strict';

    theModule.modelFunction = function () {
        console.log('Im a model function');
    };

    return theModule;
}(app.models || {}));