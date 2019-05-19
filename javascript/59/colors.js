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

    get('apply').addEventListener('click', function () {
        setCss(document.body, 'color', colorElem.value);
        setCss(document.body, 'backgroundColor', bgcolorElem.value);
    });

}());