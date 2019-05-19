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

    colorElem.addEventListener('input', function () {
        setCss(document.body, 'color', colorElem.value);
    });

    bgcolorElem.addEventListener('input', function () {
        setCss(document.body, 'backgroundColor', bgcolorElem.value);
        console.log('input', bgcolorElem.value);
    });

    bgcolorElem.addEventListener('change', function () {
        setCss(document.body, 'backgroundColor', bgcolorElem.value);
        console.log('change', bgcolorElem.value);
    });

    let theTextInput = get('someText');
    theTextInput.addEventListener('input', function () {
        console.log('input', theTextInput.value);
    });

    theTextInput.addEventListener('change', function () {
        console.log('change', theTextInput.value);
    });

}());