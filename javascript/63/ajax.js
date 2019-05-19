(function () {
    'use strict';
    const request = new XMLHttpRequest();
    //console.log(request, request.responseText);

    request.onreadystatechange = function (event) {
        if (request.readyState === 4) {
            if (request.status < 400) {
                console.log('SUCCESS', event, request, request.responseText);
            } else {
                console.log('OOPS', request.status, request.statusText);
            }
        }
    };

    request.open('GET', 'ajax.html');
    request.send();

    //setTimeout(() => alert(request.responseText), 2000);
}());