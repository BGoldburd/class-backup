(function () {
    'use strict';

    function get(id) {
        return document.getElementById(id);
    }

    function setCss(elem, property, value) {
        elem.style[property] = value;
    }

    let colorElem = get('color');
    let bgcolorElem = get('bgcolor');

    get('theForm').addEventListener('submit', function (event) {
        setCss(document.body, 'color', colorElem.value);
        setCss(document.body, 'backgroundColor', bgcolorElem.value);
        event.preventDefault();
    });

    console.log(document.cookie);
}());