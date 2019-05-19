(function () {
    'use strict';

    let clockDiv = document.createElement('div');
    let hourSpan = document.createElement('span');
    let minuteSpan = document.createElement('span');
    let secondSpan = document.createElement('span');
    clockDiv.appendChild(hourSpan);
    clockDiv.appendChild(minuteSpan);
    clockDiv.appendChild(secondSpan);
    clockDiv.className = 'clock';
    document.body.appendChild(clockDiv);

    /*let h = 23;
    let m = 59;
    let s = 50;*/
    let ticks = 43190;

    function zeroPad(number, length) {
        let r = number.toString();
        while (r.length < length) {
            r = '0' + r;
        }
        return r;
    }

    function ensureTwoDigits(number) {
        return zeroPad(number, 2);
    }

    function tick() {
        /*if (++s === 60) {
            s = 0;
            if (++m === 60) {
                m = 0;
                if (++h === 24) {
                    h = 0;
                }
            }
        }*/
        ++ticks;
        updateClock();
    }

    function updateClock() {
        let s = ticks % 60;
        let m = Math.floor((ticks / 60)) % 60;
        let h = Math.floor((ticks / 3600)) % 12;
        let hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
        //clockDiv.innerHTML = ensureTwoDigits(hour) + ':' + ensureTwoDigits(m) + ':' + ensureTwoDigits(s);
        hourSpan.innerHTML = ensureTwoDigits(hour);
        minuteSpan.innerHTML = ensureTwoDigits(m);
        secondSpan.innerHTML = ensureTwoDigits(s);
    }

    setInterval(tick, 250);
    updateClock();
}());