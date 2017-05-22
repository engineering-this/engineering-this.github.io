// Player constructor
const Player = function (name, symbol) {
    this.name = name;
    this.symbol = symbol;
};

// game constructor
const Game = function () {
    this.rows = 3;
    this.cols = 3;
    this.board = [];
    this.round = 0;


    // create board for game
    this.createBoard = function () {
        for (let i = 0; i < this.rows; i++){
            this.board.push([]);
            for (let j = 0; j < this.cols; j++){
                this.board[i].push(null);
            }
        }
    };

    // function that ends game
    this.gameEnd = function(result) {
        if(result==="draw"){
            alert("REMIS!!!");
        } else {
           alert("WYGRYWA " + result.name + "!!!");
        }
    };

    // function to check if game is ended and calls gameEnd
    this.checkWin = function() {

        let el1, el2, el3;

        // check if three elements are the same

        function checkLine (obj){
            if (el1 !== null && el1 === el2 && el1 === el3){
                if (el1 === playerX.symbol){
                    return obj.gameEnd(playerX)
                } else {
                    return obj.gameEnd(playerO)
                }
            }
        }

        // horizontal win
        for (let i = 0; i < this.rows; i++){
            el1 = this.board[i][0];
            el2 = this.board[i][1];
            el3 = this.board[i][2];
            checkLine(this);
        }

        //vertical win
        for (let i = 0; i < this.cols; i++){
            el1 = this.board[0][i];
            el2 = this.board[1][i];
            el3 = this.board[2][i];
            checkLine(this);
        }

        //diagonal win
        if (this.board[0][0] !== null){
            el1 = this.board[0][0];
            el2 = this.board[1][1];
            el3 = this.board[2][2];
            checkLine(this);
        }

        else if (this.board[0][2] !== null){
            el1 = this.board[0][2];
            el2 = this.board[1][1];
            el3 = this.board[2][0];
            checkLine(this);
        }

        //draw
        if (this.round === 9){
             return this.gameEnd("draw");
        }

    };

    // Player moves function
    this.playerMove  = function (playerX, tRow, tCol){
        this.board[tRow][tCol] = playerX.symbol;
        this.round++;
    };

};

//create players

let game, playerX, playerO, currentPlayer;

playerX = new Player ("Player 1", "x");
playerO = new Player ("Player 2", "o");

//initialize game

let init = function (){
    game = new Game();

    game.createBoard();
    currentPlayer = playerX;
};

init();

//getting dom elements for game

const squares = Array.from(document.querySelectorAll("td")),
    playerXBanner = document.querySelector("div.playerX"),
    playerOBanner = document.querySelector("div.playerO"),
    startButton = document.querySelector('.start');


//change player name and symbol

let playerBanner = function (e, player) {
    let name = prompt("Przedstaw się!");
    let symbol = prompt("Jaki jest twój znacznik?");
    if (player === playerX && symbol === playerO.symbol || player === playerO && symbol === playerX.symbol){
        alert("Musisz wybrać inny znak niż twój rywal");
        return playerBanner(e, player);
    }
    e.currentTarget.innerHTML = `<p>${name}</p><p>${symbol}</p>`;
    player.name = name;
    player.symbol = symbol;
};

//click on board function

let click = function (e){
    game.playerMove(currentPlayer, e.target.dataset.row, e.target.dataset.col);
    e.target.innerHTML = currentPlayer.symbol;
    game.checkWin();
    if (currentPlayer === playerX){
        currentPlayer = playerO} else {
        currentPlayer = playerX
    }

    this.removeEventListener('click', click)
};

//new game function

let restart = function () {
    squares.forEach(square => square.innerHTML = "");
    squares.forEach(square => square.addEventListener('click', click));
    init();
};

//adding event listeners

startButton.addEventListener('click', restart);

squares.forEach(square => square.addEventListener('click', click));

playerXBanner.addEventListener('click', function(e){
    playerBanner(e, playerX)});

playerOBanner.addEventListener('click', function(e){
    playerBanner(e, playerO)});
