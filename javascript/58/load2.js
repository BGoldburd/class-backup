(function () {
    'use strict';

    let oldOnLoad = window.onload;

    window.onload = function () {
        if (oldOnLoad) {
            oldOnLoad();
        }

        let theButton = document.getElementById('theButton');

        theButton.addEventListener('click', function () {
            console.log('#2 The button was clicked!');
        });
    };

}());