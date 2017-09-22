var app = require('http').createServer()
var io = require('socket.io')(app);
app.listen(8001);
var clientCount = 0;
//存储客户端socket
var socketMap = {}
io.on('connection', function (socket) {
    clientCount += 1;
    socket.clientNum = clientCount;
    socketMap[clientCount] = socket;
    if (clientCount % 2 == 1) {
        socket.emit('waiting','wating for another person');
    }else {
        socket.emit('start');
        socketMap[(clientCount-1)].emit('start');
    }
    socket.on('disconnect', function (data) {
        console.log(data);
    });
});