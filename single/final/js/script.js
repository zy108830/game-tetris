var socket=io('http://localhost:8001');
var local=new Local(socket);
var remote=new Remote(socket);

socket.on('waiting',function (str) {
    document.getElementById('wating').innerHTML=str;
})