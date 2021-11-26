// if x --> 1, if o --> 0
var player = 1;

// count busy cells
var notAvailable = 0;
var arr = [
  [-1,-1,-1],
  [-1,-1,-1],
  [-1,-1,-1]
]

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
  // case 1:: vertical
  console.log("******************case1 started****************");
  for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
          
          if(arr[j][i] == player){
              count++;
          }
          console.log("[" + i + "][" + j + "] = " + arr[j][i] + ", count =  " + count + "*");
      }
      if(count == 3){
          return true;
      }
      else{
          count = 0;
      }
      console.log("\n");
  }

  console.log("******************case2 started****************");


  // case 2:: horizontal
  for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
          
          if(arr[i][j] == player){
              count++;
          }
          console.log("[" + i + "][" + j + "] = " + arr[i][j] + ", count =  " + count + "**");
      }
      if(count == 3){
          return true;
      }
      else{
          count = 0;
      }
      console.log("\n");
  }

  console.log("******************case3 started****************");


  // case 3:: vertical
  if(arr[1][1] == player){
      // left to right
      if(arr[0][0] == player && arr[2][2] == player){
          console.log("left to right")
          return true;
      }
      // right to left
      else if(arr[0][2] == player && arr[2][0] == player){
          console.log("right to left");
          return true;
      }
  }


  return false;
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

  // console.log(checkWinning(arr, player));
  winner = checkWinning(arr, player);
  if(winner){
    arr = [
      [-1,-1,-1],
      [-1,-1,-1],
      [-1,-1,-1]
    ]
    //console.log("player " + player + "won the gameeeeeeeeeeeeee!");
    document.getElementById("winner").innerText = (player == 1) ? " X" : " O";
    onWin();
    clearBoard();
  }
  else if(notAvailable == 9){
    arr = [
      [-1,-1,-1],
      [-1,-1,-1],
      [-1,-1,-1]
    ]
    console.log("TiEEEEEEEEEEEEEEEEEEEEEEEEE");
    // document.getElementById("won-text").innerText = "Tie!"
    onWin();
    clearBoard();
  }
  player = (player == 1) ? 0 : 1;



}

function mapIdCellToArray(cellId, cellValue){
  // cell value not null
  if(cellValue != ""){
    var arrValue = (cellValue == "X")? 1 : 0;
    var cellI = parseInt(cellId / 3);
    var cellJ = parseInt(cellId % 3);
    // console.log(arrValue + " ij: " + cellI + " " + cellJ);
    arr[cellI][cellJ] = arrValue;
    // for(var i = 0; i < 3; i++){
    //   for(var j = 0; j < 3; j++){
    //     console.log(i + "," + j + ": "+ arr[i][j] + " ");
    //   }
    //   console.log();
    // }
    // console.log("***********************************");
  }
}

function clearBoard(){
  for(var i = 1; i <= 9; i++){
    var boxId = "box" + i;
    document.getElementById(boxId).innerText = "";
  }
}

