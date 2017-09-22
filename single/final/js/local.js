var Local=function () {
    //游戏对象
    var game;
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
    //开始
    var start=function () {
        var doms={
            gameDiv:document.getElementById('game'),
            nextDiv:document.getElementById('next')
        }
        game=new Game();
        game.init(doms);
        bindKeyEvent();
    }
    this.start=start;
}