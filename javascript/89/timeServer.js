const net = require('net');

function ensureTwoDigits(n) {
    return (n < 10 ? '0' : '') + n;
}

const server = net.createServer(socket => {
    // "YYYY-MM-DD hh:mm"
    const now = new Date();
    const year = now.getFullYear();
    const month = ensureTwoDigits(now.getMonth() + 1);
    const day = ensureTwoDigits(now.getDate());
    const hour = ensureTwoDigits(now.getHours());
    const minute = ensureTwoDigits(now.getMinutes());

    const result = `${year}-${month}-${day} ${hour}:${minute}\n`;
    socket.end(result);
});

server.listen(+process.argv[2]);