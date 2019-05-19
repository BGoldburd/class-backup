/*global $*/
(function () {
    'use strict';

    const fileNameInput = $('#filename');
    const loadedTextElement = $('#loadedText');
    const errorElement = $('#error');
    const spinner = $('#spinner');

    $('#load').click(() => {
        spinner.show();

        $.get(fileNameInput.val(), loadedText => {
            //setTimeout(() => {
            errorElement.hide();
            loadedTextElement.show();
            loadedTextElement.text(loadedText);
            //$('body').append(loadedText);
            //}, 2000);
        }).fail(xhr => {
            errorElement.show();
            errorElement.text(`${xhr.status} ${xhr.statusText}`);
        }).always(() => {
            spinner.hide();
        });
    });
}());