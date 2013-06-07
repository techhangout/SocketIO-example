var io = require('socket.io').listen(80);

io.sockets.on('connection', function (socket) {
    socket.emit('message', 'Chat started');
    socket.on('message', function(data) {
        console.log('Message sent form user: ' + data);
        socket.broadcast.emit('message', data);
        socket.emit('message', data);
    });
});
