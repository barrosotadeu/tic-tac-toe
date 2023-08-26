const GameBoard = (() => {
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    const render = () => {
        for(let i = 0; i < gameBoard.length; i++){
            const square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("index", i);
            const gameBoardRenderized = document.querySelector("#gameboard");
            gameBoardRenderized.appendChild(square);
        }
        const squares = document.querySelectorAll(".square");

        squares.forEach(square => square.addEventListener("click", e => {
            console.log("teste");
            let index = e.target.getAttribute("index");
            if(gameBoard[index] !== ""){
                alert("Spot already clicked!");
            }else {
                let currentPlayer = Game.getCurrentPlayer();
                currentPlayer.play(index);
                if(checkForGameOver()){                    
                    showResults(currentPlayer);
                    Game.endGame();
                    return;
                }
                Game.changePlayer();
                currentPlayer = Game.getCurrentPlayer();
                document.querySelector("#game-display").textContent = `Current player: ${currentPlayer.name}.
                Mark: ${currentPlayer.mark}`; 

                }
                            
            
        }))
    };


    const updateGameboard = (index, mark) => {        
        gameBoard[index] = mark;
        const square = document.querySelector(`div[index = "${index}"]`);
        square.textContent = mark;
        console.log(gameBoard);
    };

    const checkForGameOver = () => {
        if(checkForWinner()){
                console.log("Funcionou!");
                return true;
            }        
          
        
        return checkForTie();         
               
          
        
    }

    const checkForWinner = () => {
        return (
            (gameBoard[0] === gameBoard[1] && gameBoard[0] === gameBoard[2] && gameBoard[0] !== '')||
            (gameBoard[0] === gameBoard[3] && gameBoard[0] === gameBoard[6] && gameBoard[0] !== '')||
            (gameBoard[0] === gameBoard[4] && gameBoard[0] === gameBoard[8] && gameBoard[0] !== '')||
            (gameBoard[1] === gameBoard[4] && gameBoard[4] === gameBoard[7] && gameBoard[1] !== '')|| 
            (gameBoard[3] === gameBoard[4] && gameBoard[3] === gameBoard[5] && gameBoard[3] !== '')||
            (gameBoard[6] === gameBoard[7] && gameBoard[6] === gameBoard[8] && gameBoard[6] !== '')||
            (gameBoard[2] === gameBoard[5] && gameBoard[2] === gameBoard[8] && gameBoard[2] !== '')||
            (gameBoard[2] === gameBoard[4] && gameBoard[2] === gameBoard[6] && gameBoard[2] !== '')          

           );
    }

    const checkForTie = () =>{
        return gameBoard.every(square => square !== '');
    };

    const showResults = (currentPlayer) => {
        const display = document.querySelector("#game-display");
        if(checkForWinner()){
            console.log(display);
            display.textContent = `Game over. The winner is ${currentPlayer.name}!`
            
            return;
        }
        display.textContent = "Game Over! It's a tie!";

        ;
    };

    
    const resetGameboard = () => {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        const squares = document.querySelectorAll(".square");
        squares.forEach(square => square.remove());
    }
    
    

    return {render, updateGameboard, resetGameboard};
})();


//GameBoard.render();


function createPlayer(name, mark){
    const play = (index) => {
        GameBoard.updateGameboard(index, mark);
    }
    return {name, mark, play};
};

const Game = (() => {


    let started = false;    
    let currentPlayer;
    
    

    const start = () => {
        if(!started){
            if(!checkForPlayersInput()){
                alert("Please insert player 1 and player 2 names");
                return;
            }
            gameOver = false;
            started = true;           
              
            currentPlayer = createPlayer(document.querySelector("#player1").value, "X");  
            console.log(currentPlayer);       
            GameBoard.render();
            document.querySelector("#game-display").textContent = `Current player: ${currentPlayer.name}.
             Mark: ${currentPlayer.mark}`; 
            

            }
        };
    

    const getCurrentPlayer = function() {
        return currentPlayer;
    };
    
    const changePlayer = () => {
        if(currentPlayer.mark === "X"){
            currentPlayer = createPlayer(document.querySelector("#player2").value, "O");            
        }else {
            currentPlayer = createPlayer(document.querySelector("#player1").value, "X");
        }
        console.log(currentPlayer);
    };

    const restartGame = () => {
        started = false;
        GameBoard.resetGameboard();
        Game.start();
    }

    const endGame = () =>{
        started = false;
        document.querySelector("#player1").value = '';
        document.querySelector("#player2").value = '';
        GameBoard.resetGameboard();

    };

    const checkForPlayersInput = () => {
        return document.querySelector("#player1").value !== '' && document.querySelector("#player2").value !== '';
    }

    return {start, getCurrentPlayer, changePlayer, restartGame, endGame};    
})();


const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", Game.start);

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", Game.restartGame );