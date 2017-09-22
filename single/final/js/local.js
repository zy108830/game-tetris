var Local=function () {
    //游戏对象
    var game;
    //游戏间隔
    var INTERVAL=200;
    //定时器
    var timer=null;
    //绑定键盘事件
    var bindKeyEvent=function () {
        document.onkeydown=function (e) {
            switch (e.keyCode){
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
    var move=function () {
        if(!game.down()){
            game.fixed();
            game.checkClear();
            var gameOver=game.checkGameOver();
            if(gameOver){
                stop();
            }else {
                game.performNext(generateType(),generateDir());
            }
        }
    }
    //随机生成一个方块
    var generateType=function () {
       return Math.ceil(Math.random()*7)-1;
    }
    //随机生成一个旋转类型
    var generateDir=function () {
        return Math.ceil(Math.random()*4)-1;
    }
    //开始
    var start=function () {
        var doms={
            gameDiv:document.getElementById('game'),
            nextDiv:document.getElementById('next')
        }
        game=new Game();
        game.init(doms);
        bindKeyEvent();
        timer=setInterval(move,INTERVAL)
    }
    var stop=function () {
        if(timer){
            clearInterval(timer);
            timer=null;
        }
        document.onkeydown=null;
    }
    this.start=start;
}