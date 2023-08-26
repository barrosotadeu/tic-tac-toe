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
            let index;
            let currentPlayer = Game.getCurrentPlayer();                        
            index = e.target.getAttribute("index");
            
            
            if(gameBoard[index] !== ""){
                alert("Spot already clicked!");
            }else {
                
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
                if(currentPlayer.name === "Computer"){
                    document.querySelector("#game-display").textContent += "\nComputer is playing...";
                    setTimeout(
                        () => {
                            currentPlayer.play(Game.getComputerIndex());
                            if(checkForGameOver()){                    
                                showResults(currentPlayer);
                                Game.endGame();
                                return;
                            };
                            Game.changePlayer();
                            currentPlayer = Game.getCurrentPlayer();
                            document.querySelector("#game-display").textContent = `Current player: ${currentPlayer.name}.
                            Mark: ${currentPlayer.mark}`;     
                        }, 1000);
                    
                    

                }

                }
                            
            
        }))
    };


    const updateGameboard = (index, mark) => {        
        gameBoard[index] = mark;
        const square = document.querySelector(`div[index = "${index}"]`);
        square.textContent = mark;
       
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
    };

    const getGameboard = () => {
        return gameBoard;
    }
    
    

    return {render, getGameboard, updateGameboard, resetGameboard};
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
    let againstComputer = false;
    let currentPlayer;
    
    

    const start = () => {
        if(!started){
            if(!checkForTwoPlayersInput()){
                alert("Please insert player 1 and player 2 names");
                return;
            }
            
            started = true;   
            document.querySelector("#against-computer-message").textContent = '';        
              
            currentPlayer = createPlayer(document.querySelector("#player1").value, "X");                   
            GameBoard.render();
            document.querySelector("#game-display").textContent = `Current player: ${currentPlayer.name}.
             Mark: ${currentPlayer.mark}`; 
            

            }
        };
    const startAgainstComputer = () => {
        if(!started){
            if(!checkForOnePlayerInput()){
                alert("To play against the computer, please start only one player name");
                return;
            }

            document.querySelector("#against-computer-message").textContent = '';
            started = true;
            againstComputer = true;
            currentPlayer = createPlayerWhenAgainsComputer();
                            
            
            document.querySelector("#game-display").textContent = `Current player: ${currentPlayer.name}.
             Mark: ${currentPlayer.mark}`;                 
            GameBoard.render();

        }
    };
    
    const createPlayerWhenAgainsComputer = () => {
        return document.querySelector("#player1").value? 
                                                createPlayer(document.querySelector("#player1").value, "X") :
                                                createPlayer(document.querySelector("#player2").value, "O");    
    };
    

    const getCurrentPlayer = function() {
        return currentPlayer;
    };

    const getAgainstComputer = () => {
        return againstComputer;
    };

    const getComputerIndex = () => {
        const gameBoard = GameBoard.getGameboard();
        const index = Math.floor(Math.random() * gameBoard.length);        
        return gameBoard[index] === ""? index : getComputerIndex();

    }
    
    const changePlayer = () => {
        if(againstComputer){
            if(currentPlayer.name === "Computer"){
                currentPlayer = createPlayerWhenAgainsComputer();                
                return;
            };
            if(currentPlayer.mark === "X"){
                currentPlayer = createPlayer("Computer", "O")                
                return;
            }
            if(currentPlayer.mark === "O"){
                currentPlayer = createPlayer("Computer", "X");
                return;
            }
            currentPlayer = createPlayer("Computer", "X");            
            return;
        };


        if(currentPlayer.mark === "X"){
            currentPlayer = createPlayer(document.querySelector("#player2").value, "O");
            return;            
        }
        currentPlayer = createPlayer(document.querySelector("#player1").value, "X");
        return;
        
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

    const checkForTwoPlayersInput = () => {
        return document.querySelector("#player1").value !== '' && document.querySelector("#player2").value !== '';
    };

    const checkForOnePlayerInput = () => {
        return document.querySelector("#player1").value !== '' && document.querySelector("#player2").value === '' ||
               document.querySelector("#player1").value === '' && document.querySelector("#player2").value !== '';
    }

    return {start, startAgainstComputer, getCurrentPlayer, getAgainstComputer, getComputerIndex, changePlayer, restartGame, endGame};    
})();


const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", Game.start);

const startAgainstComputerButton = document.querySelector("#start-against-computar-button");
startAgainstComputerButton.addEventListener("click", Game.startAgainstComputer);

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", Game.restartGame );

