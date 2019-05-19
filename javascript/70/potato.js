/*global $*/
(function () {
    'use strict';

    const theParts = $('.part').draggable({
        stack: '.part',
        stop: saveState
    });

    console.log(theParts);

    function saveState() {
        const state = [];

        theParts.each((index, partElem) => {
            const part = $(partElem);
            state.push({
                part: part.attr('src'),
                x: part.css('left'),
                y: part.css('top')
            });
        });

        localStorage.parts = JSON.stringify(state);
    }

    if (localStorage.parts) {
        const savedState = JSON.parse(localStorage.parts);
        savedState.forEach(partState => {
            $(`img[src="${partState.part}"]`).css({ top: partState.y, left: partState.x });
        });
    }
}());