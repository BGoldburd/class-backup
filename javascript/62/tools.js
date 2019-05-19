window.pcs = function (id) {
    'use strict';

    const elem = get(id);
    const data = {};

    function get(id) {
        return document.getElementById(id);
    }

    function setCss(elem, property, value) {
        elem.style[property] = value;
    }

    function getCss(elem, property) {
        //return elem.style[property];
        return getComputedStyle(elem)[property];//getPropertyValue(property)
    }

    function getRandomColorPart() {
        return Math.floor(Math.random() * 256);
    }

    function getRandomColor() {
        const r = getRandomColorPart();
        const g = getRandomColorPart();
        const b = getRandomColorPart();

        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    const speeds = {
        slow: 500,
        fast: 50,
        default: 200
    };

    function getSpeed(val) {
        if (typeof (val) !== 'number') {
            if (speeds[val]) {
                val = speeds[val];
            } else {
                val = speeds.default;
            }
        }

        return val;
    }

    return {
        /*setCss: function (property, value) {
            setCss(elem, property, value)
            //elem.style[property] = value;
            return this;
        },
        getCss: function (property) {
            getCss(elem, property);
        },*/
        css: function (property, value) {
            if (arguments.length < 2) {
                return getCss(elem, property);
            }
            setCss(elem, property, value);
            return this;
        },
        hide: function () {
            setCss(elem, 'display', 'none');
            return this;
        },
        show: function () {
            setCss(elem, 'display', 'block');
            return this;
        },
        click: function (callback) {
            elem.addEventListener('click', callback);
            return this;
        },
        sparkle: function (duration, flashTime) {
            duration = duration || 3000;
            flashTime = getSpeed(flashTime);

            const initialColor = getCss(elem, 'color');
            const intervalId = setInterval(function () {
                setCss(elem, 'color', getRandomColor());
            }, flashTime);

            setTimeout(function () {
                clearInterval(intervalId);
                setCss(elem, 'color', initialColor);
            }, duration);
            return this;
        },
        data(key, value) {
            if (arguments.length < 2) {
                return data[key];
            }
            data[key] = value;
            return this;
        }
    };
};