var box={width:36,height:36};//每一个方块的高度
var row=16;
var col=24;
var DIR={
    DIR_RIGHT:1,
    DIR_LEFT:2,
    DIR_TOP:3,
    DIR_BOTTOM:4
};
var dir=DIR.DIR_LEFT;
var food=[]; //始终记录当前的食物
var snakeOld=[];
var poi;
var playerID;
/****************************************/
/****************************************/
window.onload=function(){
  console.log("init beg");
    GameSetInit();
    console.log("init end");
    setInterval(drawGameSet,200);
    document.onkeyup=function(e){
        switch(e.keyCode){
            case 37:dir=DIR.DIR_LEFT;break;
            case 38:dir=DIR.DIR_TOP;break;
            case 39:dir=DIR.DIR_RIGHT;break;
            case 40:dir=DIR.DIR_BOTTOM;break;
        }
    }
};
window.onunload=function(){
  delivClose();
}
/****************************************/
/****************************************/
function drawMap(){
  var con=document.getElementById("container");
  var num=row*col;
  var newSpan=null;
  for(var i=1;i<=num;i++){
    newSpan=document.createElement("span");
    newSpan.style.width=box.width+"px";
    newSpan.style.height=box.height+"px";
    con.appendChild(newSpan);
  }
}
function createFood(){
  for(var i=0;i<4;++i){
    var con=document.getElementById("container");
    food[i]=document.createElement("span");
    con.appendChild(food[i]);
    food[i].className="food";
    food[i].style.width=box.width+"px";
    food[i].style.height=box.height+"px";
  }
}
function drawFood(){
  for(var i=0;i<4;++i){
    food[i].style.left=poi[0][i][0]*box.width+"px";
    food[i].style.top=poi[0][i][1]*box.height+"px";
  }
}
function drawSnake(){

  var oneBody=null;
  var con=document.getElementById("container");

  for(var i=0;i<snakeOld.length;++i){
    con.removeChild(snakeOld[i]);
  }
  snakeOld=[];

  playerID=poi[poi.length-1];
  console.log("playerID");console.log(playerID);
  for(var i=1;i<poi.length-1;++i){
    for(var k=0;k<poi[i].length;++k){
      oneBody=document.createElement("span");
      oneBody.style.width=box.width+"px";
      oneBody.style.height=box.height+"px";
      oneBody.style.left=poi[i][k][0]*box.width+"px";
      oneBody.style.top=poi[i][k][1]*box.height+"px";

      if((i-1) == playerID)oneBody.className="snakeMe";
      else if(((i-1)%2)==(playerID%2))oneBody.className="snakeFr";
      else{oneBody.className="snakeFo";}

      con.appendChild(oneBody);
      snakeOld.push(oneBody);
    }
  }
}
/****************************************/
/****************************************/
const client = require('../src/CMod/build/Release/client') ;
function getGameSet(){
  poi = client.clientWking(dir);
}
function delivStart(){
  console.log(client.clientStart());
}
function delivClose(){
  console.log(client.clientClose());
}
function GameSetInit(){
  drawMap();
  createFood();
  delivStart();
}
function drawGameSet(){
  getGameSet();
  drawFood();
  drawSnake();
}
