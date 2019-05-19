const net = require('net');
let sockets = [];
let messages = '';

net.createServer(socket => {
    // echo server
    /*socket.on('data', data => {
        socket.write(data);
    });*/
    // socket.pipe(socket);

    socket.write(messages);
    sockets.push(socket);

    socket.on('data', data => {
        messages += data;
        sockets.filter(s => s !== socket).forEach(s => s.write(data));
    });

    socket.on('end', () => {
        sockets = sockets.filter(s => s !== socket);
    });
}).listen(8080);