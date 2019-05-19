var pcs = pcs || {};

/*pcs.clock = (function (parent = document.body) {
    'use strict';*/

    /*return {
        createClock: function (parent = document.body) {
            let clockDiv = document.createElement('div');
            clockDiv.className = 'clock';
            //parent = parent || document.body;
            parent.appendChild(clockDiv);

            function updateClock() {
                clockDiv.innerHTML = new Date().toLocaleTimeString();
            }

            setInterval(updateClock, 1000);
            updateClock();
        }
    };*/

    /*return*/ pcs.clock = function (parent) {
    'use strict';

    let clockDiv = document.createElement('div');
    clockDiv.className = 'clock';

    parent = parent || document.body;
    parent.appendChild(clockDiv);

    function updateClock() {
        clockDiv.innerHTML = new Date().toLocaleTimeString();
    }

    setInterval(updateClock, 1000);
    updateClock();
};
//}());