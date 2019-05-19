//(function () {
//'use strict';

window.onload = function () {
    'use strict';

    let allowNavigation = false;

    let theButton = document.getElementById('theButton');
    theButton.style.backgroundColor = 'yellow';
    theButton.style.border = '2px solid green';
    theButton.style.borderRadius = '5px';
    theButton.style.padding = '8px';

    function handleTheButtonClick() {
        console.log('The button was clicked!');
        allowNavigation = true;
    }

    function addEvent(element, type, callback) {
        /* browser sniffing
        if(navigator.userAgent.indexOf('IE') >= 0) {
            element.attachEvent(type, callback)
        } else if(navigator.userAgent.indexOf('chrome') ) {
            element.addEventListener(type, callback);
        }  else {
            ....
        }*/

        // feature detection
        if (element.addEventListener) { // if standard event listener ibterface exists
            element.addEventListener(type, callback);
        } else if (element.attachEvent) {
            element.attachEvent(type, callback);
        } /* else {

        } */
    }

    /*if(browser === 'IE') {
        theButton.attachEvent('click', handleClick)
    } else if(browser === 'chrome' || browser === 'firefox') {
        theButton.addEventListener('click', handleClick);
    }  else {
        ....
    }*/
    addEvent(theButton, 'click', handleTheButtonClick);


    /*theButton.addEventListener('click', function () {
        console.log('The button was clicked!');
    });*/

    let theDiv = document.getElementById('theDiv');
    addEvent(theDiv, 'click', function (event) {
        console.log('The div was clicked', event);

        /*if (event.target.innerHTML === '1') {
            console.log('div says button 1 was clicked');
        } else if (event.target.innerHTML === '2') {
            console.log('div says button 2 was clicked');
        } else if (event.target.innerHTML === '3') {
            console.log('div says button 3 was clicked');
        }*/

        console.log(event.target.innerHTML, 'was clicked');
    });

    let button1 = document.getElementById('button1');
    addEvent(button1, 'click', function (event) {
        console.log('button 1 was clicked');
        event.stopPropagation();
    });

    let theAnchor = document.getElementById('theAnchor');
    addEvent(theAnchor, 'click', function (event) {
        console.log('The anchor was clicked');

        if (!allowNavigation) {
            event.preventDefault();
        }
    });
};

//}());