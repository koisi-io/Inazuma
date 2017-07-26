var box={width:36,height:36};//每一个方块的高度
var row=16;
var col=24;
var DIR={
    DIR_RIGHT:1,
    DIR_LEFT:2,
    DIR_TOP:3,
    DIR_BOTTOM:4
};
var dir=DIR.DIR_BOTTOM;
var food=null; //始终记录当前的食物
var poi=[[7,2],[0,1],[1,1],[2,1],[3,1]];
var snakeOld=[];
/****************************************/
/****************************************/
window.onload=function(){
    GameSetInit();
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
function GameSetInit(){
  drawMap();
  createFood();
  delivStart();
}
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
  var con=document.getElementById("container");
  food=document.createElement("span");
  con.appendChild(food);
}
function drawFood(coor){
  food.className="food";
  food.style.width=box.width+"px";
  food.style.height=box.height+"px";
  food.style.left=coor[0]*box.width+"px";
  food.style.top=coor[1]*box.height+"px";
}
function drawSnake(){
  var oneBody=null;
  var con=document.getElementById("container");

  for(var i=0;i<snakeOld.length;++i){
    con.removeChild(snakeOld[i]);
  }
  snakeOld=[];

  for(var i=1;i<poi.length;++i){
    oneBody=document.createElement("span");
    oneBody.style.width=box.width+"px";
    oneBody.style.height=box.height+"px";
    oneBody.style.left=poi[i][0]*box.width+"px";
    oneBody.style.top=poi[i][1]*box.height+"px";
    oneBody.className="snake";
    con.appendChild(oneBody);
    snakeOld.push(oneBody);
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
function drawGameSet(){
  getGameSet();
  drawFood(poi[0]);
  drawSnake();
}