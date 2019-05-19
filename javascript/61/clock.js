(function () {
    'use strict';

    let clockDiv = document.createElement('div');
    clockDiv.className = 'clock';
    document.body.appendChild(clockDiv);

    function updateClock() {
        clockDiv.innerHTML = new Date().toLocaleTimeString();
    }

    setInterval(updateClock, 1000);
    updateClock();
}());