var pcs = pcs || {};

pcs.tools = (function () {
    'use strict';

    function get(id) {
        return document.getElementById(id);
    }

    function setCss(elem, property, value) {
        elem.style[property] = value;
    }

    function getCss(elem, property) {
        return elem.style[property];
    }

    return {
        wrap: function (id) {
            const elem = get(id);

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
                },
                show: function () {
                    setCss(elem, 'display', 'block');
                },
                click: function (callback) {
                    elem.addEventListener('click', callback);
                    return this;
                }
            };
        }
    };
}());