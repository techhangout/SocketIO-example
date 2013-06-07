var app = require('http').createServer(handler)
    , io = require('socket.io').listen(app)
    , fs = require('fs')
    , path = require('path')

app.listen(80);

//function used to handle request to server
function handler (req, res) {
    var filePath = __dirname + req.url;
    if (req.url == '/') {
        filePath = __dirname + '/index.html';
    }

    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }
     
    fs.exists(filePath, function(exists) {
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    res.writeHead(500);
                    res.end();
                }
                else {
                    res.writeHead(200, { 'Content-Type': contentType });
                    res.end(content, 'utf-8');
                }
            });
        }
        else {
            res.writeHead(404);
            res.end();
        }
    });
}

//Socket.IO related code
io.sockets.on('connection', function (socket) {
    socket.emit('message', 'Chat started');
    socket.on('message', function(data) {
        console.log('Message sent form user: ' + data);
        socket.broadcast.emit('message', data);
        socket.emit('message', data);
    });
});
