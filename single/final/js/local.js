var Local = function (socket) {
    //游戏对象
    var game;
    //游戏间隔
    var INTERVAL = 2000;
    //定时器
    var timer = null;
    //事件计数器
    var timeCount = 0;
    var time = 0;
    //绑定键盘事件
    var bindKeyEvent = function () {
        document.onkeydown = function (e) {
            switch (e.keyCode) {
                case 38:
                    game.rotate();
                    socket.emit('rotate');
                    break;
                case 39:
                    game.right();
                    socket.emit('right');
                    break;
                case 40:
                    game.down();
                    socket.emit('down');
                    break;
                case 37:
                    game.left();
                    socket.emit('left');
                    break;
                case 32:
                    game.fall();
                    socket.emit('fall');
                    break;
            }
        }
    }
    var move = function () {
        timeFunc();
        if (!game.down()) {
            game.fixed();
            socket.emit('fixed');
            var line = game.checkClear();
            if (line) {
                game.addScore(line);
                socket.emit('line',line);
                if(line>1){
                    var bottomLines= generateBottomLine(line);
                    socket.emit('bottomLines',bottomLines);
                }
            }
            var gameOver = game.checkGameOver();
            if (gameOver) {
                game.gameover(false);
                document.getElementById('remote_gameover').innerHTML='你赢了';
                socket.emit('lose')
                stop();
            } else {
                var type=generateType(),dir=generateDir();
                game.performNext(type,dir);
                socket.emit('next',{
                    type:type,
                    dir:dir
                });
            }
        }else {
            socket.emit('down');
        }
    }
    var generateBottomLine = function (lineNum) {
        var lines = [];
        for (var i = 0; i < lineNum; i++) {
            var line = [];
            for (var j = 0; j < 10; j++) {
                line.push(Math.ceil(Math.random() * 2) - 1);
            }
            lines.push(line);
        }
        return lines;
    }
    var timeFunc = function () {
        timeCount = timeCount + 1;
        if (timeCount == 5) {
            timeCount = 0;
            time += 1;
            game.setTime(time);
            socket.emit('time',time);
        }
    }
    //随机生成一个方块
    var generateType = function () {
        return Math.ceil(Math.random() * 7) - 1;
    }
    //随机生成一个旋转类型
    var generateDir = function () {
        return Math.ceil(Math.random() * 4) - 1;
    }
    //开始
    var start = function () {
        var doms = {
            gameDiv: document.getElementById('local_game'),
            nextDiv: document.getElementById('local_next'),
            timeDiv: document.getElementById('local_time'),
            scoreDiv: document.getElementById('local_score'),
            resultDiv: document.getElementById('local_gameover'),
        }
        game = new Game();
        var type = generateType(), dir = generateDir();
        game.init(doms, type, dir);
        socket.emit('init',{
            type:type,
            dir:dir
        })
        bindKeyEvent();
        var type=generateType(),dir=generateDir();
        game.performNext(type,dir);
        socket.emit('next',{
            type:type,
            dir:dir
        })
        timer = setInterval(move, INTERVAL)
    }
    var stop = function () {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        document.onkeydown = null;
    }
    socket.on('start', function (data) {
        document.getElementById('waiting').innerHTML = '';
        start();
    })
    socket.on('lose', function (data) {
        game.gameover(true);
        stop();
    });
    socket.on('leave', function (data) {
        document.getElementById('local_gameover').innerHTML='对方掉线';
        document.getElementById('remote_gameover').innerHTML='已掉线';
        stop();
    })
    socket.on('bottomLines', function (data) {
        game.addTailLines(data);
        socket.emit('addTailLines',data);
    })
}