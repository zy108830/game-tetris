var Local=function () {
    //游戏对象
    var game;
    //绑定键盘事件
    var bindKeyEvent=function () {
        document.onkeydown=function (e) {
            switch (e.keyCode){
                case 38:
                    break;
                case 39:
                    break;
                case 40:
                    game.down();
                    break;
                case 37:
                    break;
                case 32:
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