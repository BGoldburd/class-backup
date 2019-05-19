(function () {
    'use strict';

    let i = 0;
    let theButton = document.getElementById('theButton');

    theButton.style.position = 'absolute';
    theButton.style.top = 0;

    /*for (let i = 0; i < 500; i++) {
        theButton.style.top = i + 'px';
    }*/

    function moveTheButton() {
        i += .1;
        theButton.style.top = i + 'px';

        //setTimeout(moveTheButton, 500);
    }

    // let running = false;
    let intervalId;
    let moveIt = document.getElementById('moveIt');
    moveIt.addEventListener('click', function () {
        //if (!running) {
        if (!intervalId) {
            intervalId = setInterval(moveTheButton, 0);
            moveIt.innerHTML = 'Stop';
            //running = true;
        } else {
            clearInterval(intervalId);
            intervalId = null;
            moveIt.innerHTML = 'Start';
            //running = false;
        }
    });

    //setTimeout(moveTheButton, 500);
    //moveTheButton();
}());