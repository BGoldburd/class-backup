/*global $*/
(function () {
    'use strict';

    $.get('xjqajax.html', loadedData => console.log(loadedData))
        .fail((xhr, statusCode, statusText) => {
            console.log('OOPS');
            console.log(xhr);
            console.log(statusCode);
            console.log(statusText);
        });
}());