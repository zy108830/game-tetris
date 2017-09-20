var ws = require("nodejs-websocket"),clientCount=0;
var server = ws.createServer(function (conn) {
    console.log("New connection")
    clientCount++;
    conn.nickname='user'+clientCount
    broadcast(conn.nickname+' comes in');
    conn.on("text", function (str) {
        console.log("Received " + str)
        broadcast(str);
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        broadcast(conn.nickname+' left');
    })
    conn.on("error", function (err) {
        console.log(err)
    })
}).listen(8001)

function broadcast(str) {
    //遍历所有的连接，群发信息
    server.connections.forEach(function (connection) {
        connection.sendText(str);
    })
}