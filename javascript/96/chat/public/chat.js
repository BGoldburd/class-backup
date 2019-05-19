/* global $ */
(function () {
    'use strict';

    const socket = io(); // io.connect('localhost:80')
    //socket.emit('message', 'Nice to be connected');
    //socket.on('message', data => {
    //    console.log(data);
    //});
    const messageInput = $('#message');
    const loginForm = $('#loginForm');
    const messagesContainer = $('#messagesContainer');

    loginForm.submit(e => {
        e.preventDefault();

        socket.emit('login', $('#name').val(), callbackData => {
            if (callbackData) {
                return $('#loginError').text(callbackData);
            }

            loginForm.hide();
            messagesContainer.show();
        });

    });



    $('#messageForm').submit(e => {
        e.preventDefault();

        socket.emit('message', messageInput.val());
        messageInput.val('');
    });

    const messageElem = $('#messages');
    socket.on('message', msg => {
        messageElem.append(`<div><span>${msg.name} says: ${msg.msg}</div>`);
    });

    socket.on('status', msg => {
        messageElem.append(`<div class="status">${msg}</div>`);
    });
}());