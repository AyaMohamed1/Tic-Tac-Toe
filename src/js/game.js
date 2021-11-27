selectBox = document.querySelector(".select-box");
playBoard = document.querySelector(".play-board");
xTurn = document.getElementById("Xturn");
oTurn = document.getElementById("Oturn");

// if x --> 1, if o --> 0
var player;

// count busy cells
var notAvailable = 0;
var arr = [
  [-1,-1,-1],
  [-1,-1,-1],
  [-1,-1,-1]
]

function playerX() {
  selectBox.classList.add("hide");
  playBoard.classList.add("show");
  xTurn.classList.add("active");
  player = 1;
}
function playerY() {
  selectBox.classList.add("hide");
  playBoard.classList.add("show");
  oTurn.classList.add("active");
  player = 0;
}
function playArea(cell) {
  var Val = document.getElementById(cell.id);
  if (xTurn.classList.contains("active") == true && Val.innerHTML == "") {
    document.getElementById(cell.id).innerHTML = "X";
    xTurn.classList.remove("active");
    oTurn.classList.add("active");
  } else if (
    !xTurn.classList.contains("active") == true &&
    Val.innerHTML == ""
  ) {
    document.getElementById(cell.id).innerHTML = "O";
    oTurn.classList.remove("active");
    xTurn.classList.add("active");
  }
  checkNewValue(cell);
}

function onX() {
  document.getElementById("select-box").classList.add("hide");
  document.getElementById("play-board").classList.add("show");
}
function onWin() {
  document.getElementById("play-board").classList.remove("show");
  document.getElementById("play-board").classList.add("hide");
  document.getElementById("result-box").classList.add("show");
  if (document.getElementById("result-box").classList.contains("hide")) {
    document.getElementById("result-box").classList.remove("hide");
    document.getElementById("result-box").classList.add("show");
  }
}
function onReplay() {
  document.getElementById("result-box").classList.add("hide");
  document.getElementById("result-box").classList.remove("show");
  if (document.getElementById("play-board").classList.contains("hide")) {
    document.getElementById("play-board").classList.remove("hide");
    document.getElementById("play-board").classList.add("show");
  }
}


function checkWinning(arr, player){
  var count = 0;
  // case 1:: horizontal
  // console.log("******************case1 started****************");
  for(var row = 0; row < 3; row++){
      for(var col = 0; col < 3; col++){
          
          if(arr[col][row] == player){
              count++;
          }
          // console.log("[" + i + "][" + j + "] = " + arr[j][i] + ", count =  " + count + "*");
      }
      if(count == 3){
          return true;
      }
      else{
          count = 0;
      }
      // console.log("\n");
  }

  // console.log("******************case2 started****************");


  // case 2:: vertical
  for(var row = 0; row < 3; row++){
      for(var col = 0; col < 3; col++){
          
          if(arr[row][col] == player){
              count++;
          }
          // console.log("[" + i + "][" + j + "] = " + arr[i][j] + ", count =  " + count + "**");
      }
      if(count == 3){
          return true;
      }
      else{
          count = 0;
      }
      // console.log("\n");
  }

  // console.log("******************case3 started****************");


  // case 3:: diagonal
  if(arr[1][1] == player){
      // left to right
      if(arr[0][0] == player && arr[2][2] == player){
          // console.log("left to right")
          return true;
      }
      // right to left
      else if(arr[0][2] == player && arr[2][0] == player){
          // console.log("right to left");
          return true;
      }
  }


  return false;
}

function mapIdCellToArray(cellId, cellValue){
  // cell value not null
  if(cellValue != ""){
    var arrValue = (cellValue == "X")? 1 : 0;
    var cellI = parseInt(cellId / 3);
    var cellJ = parseInt(cellId % 3);
    console.log(arrValue + " ij: " + cellI + " " + cellJ);
    arr[cellI][cellJ] = arrValue;
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        console.log(i + "," + j + ": "+ arr[i][j] + " ");
      }
      console.log();
    }
    console.log("***********************************");
  }
}

function clearBoard(){
  for(var i = 1; i <= 9; i++){
    var boxId = "box" + i;
    document.getElementById(boxId).innerText = "";
  }
}

// function newValue
function checkNewValue(cell){
  notAvailable++;
  var newCellValue = cell.textContent;
  var newCellId = parseInt(cell.id.substring(3)) - 1;
  var winner;
  // console.log(newCellValue + " " + newCellId);

  // call mapping function
  mapIdCellToArray(newCellId, newCellValue);
  // call check

  console.log(checkWinning(arr, player));
  winner = checkWinning(arr, player);
  if(winner){
    arr = [
      [-1,-1,-1],
      [-1,-1,-1],
      [-1,-1,-1]
    ]
    console.log("player " + player + "won the gameeeeeeeeeeeeee!");
    document.getElementById("winner").innerText = (player == 1) ? "Player X Wins!" : "Player O Wins!";
    onWin();
    clearBoard();
    notAvailable = 0;
  }
  else if(notAvailable == 9){
    arr = [
      [-1,-1,-1],
      [-1,-1,-1],
      [-1,-1,-1]
    ]
    console.log("TiEEEEEEEEEEEEEEEEEEEEEEEEE");
    document.getElementById("winner").innerText = "Cool Draw!";
    onWin();
    clearBoard();
    notAvailable = 0;
  }
  player = (player == 1) ? 0 : 1;



}



