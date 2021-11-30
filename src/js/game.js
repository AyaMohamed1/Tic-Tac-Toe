selectBox = document.querySelector(".select-box");
playBoard = document.querySelector(".play-board");
xTurn = document.getElementById("Xturn");
oTurn = document.getElementById("Oturn");

// if x --> 1, if o --> 0
var player;
var ai = 0;
var human = 1;
var aiMode = false;
var arr = [
  [-1,-1,-1],
  [-1,-1,-1],
  [-1,-1,-1]
]

function modeChosen(cell){
  if(aiMode){
    playAreaAI(cell);
  }
  else{
    playArea(cell);
  }
}

// intialization
function single() {
  selectBox.classList.add("hide");
  playBoard.classList.add("show");
  xTurn.classList.add("active");
  player = human;
  aiMode = true;
}
function multi() {
  selectBox.classList.add("hide");
  playBoard.classList.add("show");
  xTurn.classList.add("active");
  player = 1;
  aiMode = false;
}
function playArea(cell) {
  var Val = document.getElementById(cell.id);
  if (xTurn.classList.contains("active") == true && Val.innerHTML == "") {
    document.getElementById(cell.id).innerHTML = "X";
    xTurn.classList.remove("active");
    oTurn.classList.add("active");
    checkNewValue(cell);
  } 
  else if (!xTurn.classList.contains("active") == true && Val.innerHTML == "") {
    document.getElementById(cell.id).innerHTML = "O";
    oTurn.classList.remove("active");
    xTurn.classList.add("active");
    checkNewValue(cell);
  }
  
}

function playAreaAI(cell) {
  if(player == human){
    var Val = document.getElementById(cell.id);
    if(Val.innerHTML == ""){
      if (xTurn.classList.contains("active") == true) {
        document.getElementById(cell.id).innerHTML = "X";

      } 
      checkNewValue(cell);
        player = ai;
        bestMoveAi(); 
    }
  }
}

function putFirstOBoard(ai){
  var firstRow;
  var firstCol;
  for(var row = 0; row < 3; row++){
    for(var col = 0; col < 3; col++){
      if(arr[row][col] == ai){
        firstRow = row;
        firstCol = col;
      }
    }
  }
  var symbolBoard = (ai) ? "X" : "O";
  var boxIndex = (firstRow * 3 + firstCol) + 1;
  var newBoxId = "box" + boxIndex;
  console.log(newBoxId)
  if(newBoxId)
    document.getElementById(newBoxId).innerText = symbolBoard;
}

function putOnBoard(cellRow, cellCol, ai){
  if(notAvailable() != 1){
    var symbolBoard = (ai) ? "X" : "O";
    var boxIndex = (cellRow * 3 + cellCol) + 1;
    var boxId = "box" + boxIndex;

    if(!player){
      xTurn.classList.remove("active");
      oTurn.classList.add("active");
    }
    else{
      oTurn.classList.remove("active");
      xTurn.classList.add("active");
    }
    
    async function aiPlay() { 
      console.log('start timer in ai play'); 
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      document.getElementById(boxId).innerText = symbolBoard;
      if(player){
        oTurn.classList.remove("active");
        xTurn.classList.add("active");
      }
      else{
        xTurn.classList.remove("active");
        oTurn.classList.add("active");
      }
    }
    aiPlay(); 
  

    // want to see if ai won, i will need it if ai play first
    var notAvailableCells = notAvailable();
    console.log("check for winning in playArea Ai "+checkWinning(arr, ai));
    var winnerAI = checkWinning(arr, ai);
    
    if(winnerAI){
      for(var row = 0; row < 3; row++){
        for(var col = 0; col < 3; col++){
          console.log(row + ", " + col+ " : " + arr[row][col]);
        }
      }
      arr = [
        [-1,-1,-1],
        [-1,-1,-1],
        [-1,-1,-1]
      ]
      console.log("player " + ai + "won the gameeeeeeeeeeeeee!");

      // setting the result box value
      async function aiPlayWin() { 
        console.log('start timer'); 
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        document.getElementById("winner").innerText = (ai == 1) ? "Player X Wins!" : "Player O Wins!";
        onWin();
        clearBoard();
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%clear%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
      }
      aiPlayWin(); 
      
      // player = (player == 1) ? 0 : 1;
    }
    else if(notAvailableCells == 9){
      arr = [
        [-1,-1,-1],
        [-1,-1,-1],
        [-1,-1,-1]
      ]
      // edit in this bta3a
      console.log("TiEEEEEEEEEEEEEEEEEEEEEEEEE");
      async function aiPlayDraw() { 
        console.log('start timer'); 
        await new Promise(resolve => setTimeout(resolve, 2000)); 
        document.getElementById("winner").innerText = "Cool Draw!";
        onWin();
        clearBoard();
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%clearDraw%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
      }
      aiPlayDraw(); 
    }
    
  }
}

function bestMoveAi(){
  console.log("hello  from best move!");
  var bestScore = -Infinity;
  var chosenCell;
  var cellRow;
  var cellCol;
  var isMaximizing;
  for(var row = 0; row < 3; row++){
    for(var col = 0; col < 3; col++){
      if(arr[row][col] == -1){
        arr[row][col] = ai; // put O == 0
        //edited
        isMaximizing = (ai) ? true : false;
        var score = minimax(arr, 0, isMaximizing);
        arr[row][col] = -1;
        if(score > bestScore){
          bestScore = score;
          chosenCell = {row, col};
        }
      }

    }
  }
  cellRow = chosenCell.row;
  cellCol = chosenCell.col;
  arr[cellRow][cellCol] = ai;
  if(notAvailable != 0){
    putOnBoard(cellRow, cellCol, ai);
  }

  // change player turn
  player = human;

  // print
  for(var row = 0; row < 3; row++){
    for(var col = 0; col < 3; col++){
      console.log(row + ", " + col+ " : " + arr[row][col]);
    }
  }
}


function minimax(arr, depth, isMaximizing){
  var notAvailableCells = notAvailable();
  if(checkWinning(arr, human)){
    return -10;
  }
  else if(checkWinning(arr, ai)){
    return 10;
  }
  else if(notAvailableCells == 9){
    return 0;
  }

  if(isMaximizing){
    var bestScore = -Infinity;
    for(var row = 0; row < 3; row++){
      for(var col = 0; col < 3; col++){
        if(arr[row][col] == -1){
          //and here
          arr[row][col] = 0;
          var score = minimax(arr, depth + 1, false);
          arr[row][col] = -1;
          bestScore = Math.max(score, bestScore);
        }
      }
    }

    return bestScore;
  }
  else{
    var bestScore = Infinity;
    for(var row = 0; row < 3; row++){
      for(var col = 0; col < 3; col++){
        if(arr[row][col] == -1){
          //and here
          arr[row][col] = 1;
          var score = minimax(arr, depth + 1, true);
          arr[row][col] = -1;
          bestScore = Math.min(score, bestScore);
        }
      }
    }
    return bestScore;
  }

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
  for(var row = 0; row < 3; row++){
      for(var col = 0; col < 3; col++){
          
          if(arr[col][row] == player){
              count++;
          }
      }
      if(count == 3){
          return true;
      }
      else{
          count = 0;
      }
  }

  // case 2:: vertical
  for(var row = 0; row < 3; row++){
      for(var col = 0; col < 3; col++){
          
          if(arr[row][col] == player){
              count++;
          }
      }
      if(count == 3){
          return true;
      }
      else{
          count = 0;
      }
  }

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

//counting not available cells
function notAvailable(){
  var countUnAvailable = 0;
  for(var row = 0; row < 3; row++){
    for(var col = 0; col < 3; col++){
      if(arr[row][col] != -1){
        countUnAvailable++;
      }
    }
  }
  return countUnAvailable;
}

//mark the cell input with the global board array
function mapIdCellToArray(cellId, cellValue){
  // cell value not null
  if(cellValue != ""){
    var arrValue = (cellValue == "X")? 1 : 0;
    var cellI = parseInt(cellId / 3);
    var cellJ = parseInt(cellId % 3);
    arr[cellI][cellJ] = arrValue;
    console.log("in mapping");
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        console.log(i + "," + j + ": "+ arr[i][j] + " ");
      }
      console.log();
    }
    console.log("*****************mapping finished******************");
  }
}

function clearBoard(){
  for(var i = 1; i <= 9; i++){
    var boxId = "box" + i;
    document.getElementById(boxId).innerText = "";
  }
  if(notAvailable() == 1){
    putFirstOBoard(ai);
  }
}

// function newValue
function checkNewValue(cell){
  // debugger;
  var newCellValue = cell.textContent;
  var newCellId = parseInt(cell.id.substring(3)) - 1;
  var winner;
  console.log("player is " + player);

  // call mapping function
  mapIdCellToArray(newCellId, newCellValue);

  // count unavailble cells
  var notAvailableCells = notAvailable();

  // call checkWinning function
  console.log(checkWinning(arr, player));
  winner = checkWinning(arr, player);
  
  if(winner){
    arr = [
      [-1,-1,-1],
      [-1,-1,-1],
      [-1,-1,-1]
    ]
    console.log("player " + player + "won the gameeeeeeeeeeeeee!");

    // setting the result box value
    async function PlayerWin() { 
      console.log('start timer'); 
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      player = (aiMode) ? player : !player;
      console.log("player inside await is " + player)
      document.getElementById("winner").innerText = (player == 1) ? "Player X Wins!" : "Player O Wins!";
      player = (aiMode) ? player : !player;
      onWin();
      clearBoard();
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%player%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    }
    PlayerWin(); 
    // player = (player == 1) ? 0 : 1;
  }
  else if(notAvailableCells == 9){
    arr = [
      [-1,-1,-1],
      [-1,-1,-1],
      [-1,-1,-1]
    ]
    console.log("TiEEEEEEEEEEEEEEEEEEEEEEEEE");
    async function PlayerDraw() { 
      console.log('start timer'); 
      await new Promise(resolve => setTimeout(resolve, 1000)); 
      document.getElementById("winner").innerText = "Cool Draw!";
      onWin();
      clearBoard();
      console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%playerDraw%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    }
    PlayerDraw(); 
  }
  player = (player == 1) ? 0 : 1;


}





