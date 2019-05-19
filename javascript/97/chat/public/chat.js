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
    const chattersElem = $('#chatters');
    let name;

    loginForm.submit(e => {
        e.preventDefault();
        name = $('#name').val();
        socket.emit('login', name, (err, chatters) => {
            if (err) {
                return $('#loginError').text(err);
            }
            chattersElem.append(chatters.map(c => `<li class="${c === name ? 'self' : 'other'}">${c}</li>`));
            loginForm.hide();
            messagesContainer.show();
        });
    });

    $('#messageForm').submit(e => {
        e.preventDefault();

        socket.emit('message', messageInput.val(), err => {
            console.error(err);
        });
        messageInput.val('');
    });

    const messageElem = $('#messages');
    socket.on('message', msg => {
        messageElem.append(`<div>${msg.name} says: ${msg.msg}</div>`);
    });
    socket.on('privateMessage', msg => {
        messageElem.append(`<div class="private">private message from ${msg.from} : ${msg.msg}</div>`);
    });

    socket.on('status', msg => {
        if (msg.joined) {
            chattersElem.append(`<li>${msg.name}</li>`);
        } else {
            const children = chattersElem.children();
            children.filter(i => {
                return $(children[i]).text() === msg.name;
            }).remove();
        }
        const text = `${msg.name} has ${msg.joined ? 'joined' : 'left'} the chat`;
        messageElem.append(`<div class="status">${text}</div>`);
    });
}());