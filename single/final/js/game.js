var Game=function () {
    //dom 元素
    var gameDiv;
    var nextDiv;
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
    //初始化div
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
    //刷新div
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

    var init=function (doms) {
        gameDiv=doms.gameDiv;
        nextDiv=doms.nextDiv;
        cur=new Square();
        next=new Square();
        initDiv(gameDiv,gameData,gameDivs);
        initDiv(nextDiv,next.data,nextDivs);
        cur.origin.x=10;
        cur.origin.y=5;
        for(var i=0;i<cur.data.length;i++){
            for (var j=0;j<cur.data[i].length;j++){
                gameData[cur.origin.x+i][cur.origin.y+j]=cur.data[i][j]
            }
        }
        refreshDiv(gameData,gameDivs)
        refreshDiv(next.data,nextDivs)
    }

    this.init=init;
}