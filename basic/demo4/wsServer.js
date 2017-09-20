var ws = require("nodejs-websocket"),clientCount=0;
var server = ws.createServer(function (conn) {
    console.log("New connection")
    clientCount++;
    conn.nickname='user'+clientCount

    var mes={}
    mes.type="enter";
    mes.data=conn.nickname+' comes in';
    broadcast(JSON.stringify(mes));

    conn.on("text", function (str) {
        console.log("Received " + str)
        var mes={}
        mes.type="message";
        mes.data=conn.nickname+' says: '+str;
        broadcast(JSON.stringify(mes));
    })
    conn.on("close", function (code, reason) {
        console.log("Connection closed")
        var mes={};
        mes.type="leave";
        mes.data=conn.nickname+' left';
        broadcast(JSON.stringify(mes));
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