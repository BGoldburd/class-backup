/*global $*/
(function () {
    'use strict';

    let dragging = false;
    const body = $('body');
    const colorPicker = $('#color');
    let offset;

    $(document).on('mousedown', '.box', function (event) {
        console.log('mousedown', event);
        offset = { x: event.offsetX, y: event.offsetY };
        dragging = $(this);
        event.preventDefault();
    }).on('mouseup', event => {
        console.log('mouseup', event);
        dragging = null;
        event.preventDefault();
    }).mousemove(event => {
        if (dragging) {
            console.log('mousemove', event);
            dragging.css({ top: event.clientY - offset.y, left: event.clientX - offset.x });
            event.preventDefault();
        }
    });

    $('#add').click(() => {
        $('<div class="box"></div>').appendTo(body)
            .css('background-color', colorPicker.val());
    });
}());