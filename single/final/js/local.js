var Local = function (socket) {
    //游戏对象
    var game;
    //游戏间隔
    var INTERVAL = 200;
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
                    break;
                case 39:
                    game.right();
                    break;
                case 40:
                    game.down();
                    break;
                case 37:
                    game.left();
                    break;
                case 32:
                    game.fall();
                    break;
            }
        }
    }
    var move = function () {
        timeFunc();
        if (!game.down()) {
            game.fixed();
            var line = game.checkClear();
            if (line) {
                game.addScore(line);
            }
            var gameOver = game.checkGameOver();
            if (gameOver) {
                game.gameover(false);
                stop();
            } else {
                game.performNext(generateType(), generateDir());
            }
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
            if (time % 10 == 0) {
                game.addTailLines(generateBottomLine(1));
            }
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
}