var Game=function () {
    //dom 元素
    var gameDiv;
    var nextDiv;
    var timeDiv;
    var scoreDiv;
    var resultDiv;
    //分数
    var score=0;

    //游戏矩阵
    var gameData=[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
    ];
    //当前方块
    var cur;
    //下一个方块
    var next;
    //divs
    var nextDivs=[];
    var gameDivs=[];
    //容器、容器矩阵数据，容器矩阵dom
    var initDiv=function (container,data,divs) {
        for (var i=0;i<data.length;i++){
            var div=[];
            for (var j=0;j<data[i].length;j++){
                var node=document.createElement('div');
                node.className='none';
                node.style.top=(i*20)+'px';
                node.style.left=(j*20)+'px';
                container.appendChild(node);
                div.push(node)
            }
            divs.push(div);
        }
    }
    //刷新游戏界面和下一方块界面
    var refreshDiv=function (data,divs) {
        for (var i=0;i<data.length;i++){
            for(var j=0;j<data[i].length;j++){
                if(data[i][j]==0){
                    divs[i][j].className='none';
                }else if(data[i][j]==1){
                    divs[i][j].className='done';
                }else if(data[i][j]==2){
                    divs[i][j].className='current';
                }
            }
        }
    }
    //显示最新的方块到网格中
    var setData=function () {
        for(var i=0;i<cur.data.length;i++){
            for (var j=0;j<cur.data[i].length;j++){
                if(check(cur.origin,i,j)){
                    //改成x+j，y+i会更合理一点，暂不改
                    gameData[cur.origin.x+i][cur.origin.y+j]=cur.data[i][j]
                }
            }
        }
        console.log(gameData);
    }

    /*检测方块位置是否合法*/
    var check=function (pos,x,y) {
        if(pos.x+x<0){
            return false;
        }else if(pos.x+x>=gameData.length){
            return false;
        }else if(pos.y+y<0){
            return false;
        }else if(pos.y+y>=gameData[0].length){
            return false;
        }else if(gameData[pos.x+x][pos.y+y]==1){
            return false;
        }
        return true;
    }

    /**判断方块位置是否合法，以及到了底部*/
    var isValid=function (pos,data) {
        for (var i=0;i<data.length;i++){
            for (var j=0;j<data[i].length;j++){
                if(data[i][j]!=0){
                    if(!check(pos,i,j)){
                        return false;
                    }
                }
            }
        }
        return true;
    }

    /**下移前，清除原有位置渲染的dom样式**/
    var clearData=function () {
        for(var i=0;i<cur.data.length;i++){
            for (var j=0;j<cur.data[i].length;j++){
                if(check(cur.origin,i,j)){
                    gameData[cur.origin.x+i][cur.origin.y+j]=0
                }
            }
        }
    }
    /**
     * 方块下移
     */
    var down=function () {
        if(cur.canDown(isValid)){
            clearData();
            cur.down();
            setData();
            refreshDiv(gameData,gameDivs);
            return true;
        }else {
            return false;
        }
    }


    var left=function () {
        if(cur.canLeft(isValid)){
            clearData();
            cur.left();
            setData();
            refreshDiv(gameData,gameDivs);
        }
    }

    var right=function () {
        if(cur.canRight(isValid)){
            clearData();
            cur.right();
            setData();
            refreshDiv(gameData,gameDivs);
        }
    }

    var rotate=function () {
        if(cur.canRotate(isValid)){
            clearData();
            cur.rotate();
            setData();
            refreshDiv(gameData,gameDivs);
        }
    }
    
    var fall=function () {
        while (this.down()){
            this.down();
        }
    }

    //方块移动到底部，固定
    var fixed=function () {
        for (var i=0;i<cur.data.length;i++){
            for (var j=0;j<cur.data[i].length;j++){
                if(check(cur.origin,i,j)){
                    if(gameData[cur.origin.x+i][cur.origin.y+j]==2){
                        gameData[cur.origin.x+i][cur.origin.y+j]=1;
                    }
                }
            }
        }
        refreshDiv(gameData,gameDivs);
    }

    //下一个循环
    var performNext=function (type,dir) {
        cur=next;
        setData();
        next=SquareFactory.prototype.make(type,dir);
        refreshDiv(gameData,gameDivs);
        refreshDiv(next.data,nextDivs);
    }

    //消行
    var checkClear=function () {
        var line=0;
        for (var i=gameData.length-1;i>=0;i--){
            var clear=true;
            for (var j=0;j<gameData[0].length;j++){
                if(gameData[i][j]!=1){
                    clear=false;
                    break;
                }
            }
            if(clear){
                line+=1;
                for (var m=i;m>0;m--){
                    for (var n=0;n<gameData[0].length;n++){
                        gameData[m][n]=gameData[m-1][n];
                    }
                }
                for (var n=0;n<gameData[0].length;n++){
                    gameData[0][n]=0;
                }
                i++;
            }
        }
        return line;
    }
    
    var checkGameOver=function () {
        var gameOver=false;
        for (var i=0;i<gameData[0].length;i++){
            if(gameData[1][i]==1){
                gameOver=true;
            }
        }
        return gameOver;
    }
    
    var gameover=function (win) {
        if(win){
            resultDiv.innerHTML='你赢了';
        }else {
            resultDiv.innerHTML='你输了';
        }
    }
    
    var setTime=function (time) {
        timeDiv.innerHTML=time;
    }
    
    var addScore=function (line) {
        var s=0;
        switch (line){
            case 1:
                s=10;
                break;
            case 2:
                s=30;
                break;
            case 3:
                s=60;
                break;
            case 4:
                s=100;
                break;
        }
        score+=s;
        scoreDiv.innerHTML=score;
    }

    //初始化
    var init=function (doms,type,dir) {
        //初始化游戏容器
        gameDiv=doms.gameDiv;
        initDiv(gameDiv,gameData,gameDivs);
        //初始化下一次的方块所在的容器
        nextDiv=doms.nextDiv;
        timeDiv=doms.timeDiv;
        scoreDiv=doms.scoreDiv;
        resultDiv=doms.resultDiv;
        next=SquareFactory.prototype.make(type,dir);
        initDiv(nextDiv,next.data,nextDivs);
        //在下一次的容器中显示方块
        refreshDiv(next.data,nextDivs)
    }

    this.init=init;
    this.down=down;
    this.left=left;
    this.right=right;
    this.rotate=rotate;
    this.fall=fall;
    this.fixed=fixed;
    this.performNext=performNext;
    this.checkClear=checkClear;
    this.checkGameOver=checkGameOver;
    this.setTime=setTime;
    this.addScore=addScore;
    this.gameover=gameover;
}