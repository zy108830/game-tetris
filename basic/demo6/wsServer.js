var app = require('http').createServer()
var io = require('socket.io')(app);
var clientCount=0;
app.listen(8001);

/**
 * io.emit用于广播，socket用于单点发送
 * connection和disconnect是socket.io的特殊内置事件
 */

io.on('connection', function (socket) {
    clientCount++;
    socket.nickname='user'+clientCount
    io.emit('enter',socket.nickname+' comes in')

    socket.on("message", function (str) {
        io.emit('message',socket.nickname+' says: '+str);
    })
    socket.on("disconnect", function (code, reason) {
        io.emit('leave',socket.nickname+' left');
    })
    socket.on("error", function (err) {
        console.log(err)
    })
});