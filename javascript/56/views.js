var app = app || {};

app.views = (function (theModule/*, theAlertThing*/) {
    'use strict';

    theModule.viewFunction = function () {
        console.log('Im a view function');
        // theAlertThing("Hello");
    };

    return theModule;
}(app.views || {}/*, window.alert*/));
