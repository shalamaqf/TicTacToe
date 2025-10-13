// Create a module pattern to wrap logic of the game board
var GameBoard = ( function () {
    // Create a board made from a 2D array
    let board = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    // Create a function to display the board to the console
    const displayBoard = function () {
        let i;
        for (i = 0; i < 3; i++) {
            console.log(board[i].join(' | '));
        }
    }

    // Create a function to reset the board
    const resetBoard = function () {
        board = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9]
        ];
    }

    // Create a function to check if a cell is avail
    const isCellAvail = function (num) {
        let i;
        let j;
        
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (board[i][j] == num) {
                    return true;
                }
            }
        }
        
        return false;

    }

    // Create a function to update the board current state
    const updateBoard = function (playerMark, num) {
        let i;
        let j;
        
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                if (board[i][j] == num) {
                    board[i][j] = playerMark;
                    return true;
                }
            }
        }

        return false;

    }

    // Create a getter for the board
    const getBoard = function () {
        return board.map(row => row.slice());
    }

    return {
        displayBoard: displayBoard,
        resetBoard: resetBoard,
        isCellAvail: isCellAvail,
        updateBoard: updateBoard,
        getBoard: getBoard,
    }
})();



// Create a module pattern to wrap the logic of game controller
var gameController = ( function () {
    // Create a variable to store the player object properties such as mark and score
    let player1 = createPlayer("Player 1", 'X');
    let player2 = createPlayer('Player 2', 'O');

    // Create a variable to store the current player
    let currentPlayer = player1;

    // Create a function to get the player's input
    const getPlayerInput = function () {
        const playerInput = prompt("Choose a cell (1 - 9): ");
        return playerInput;
    }

    // Create a function to check if player input is valid or not
    const isValid = function (cell) {
        if (GameBoard.isCellAvail(cell)) {
            return true;
        }
        else {
            return false;
        }
    }

    // Create a function to handle user input and the state of the board
    const handleTurn = function () {
        GameBoard.displayBoard();

        const cell = getPlayerInput();

        if (!validateInput(cell)) {
            return false;
        }
        
        if (isValid(cell)){
            GameBoard.updateBoard(currentPlayer.mark, cell);
            return true; 
        }
        else {
            console.log("Your choose is not valid. Try again!");
            return false;
        }
    }

    // Create a getter for current player
    const getCurrentPlayer = function () {
        return currentPlayer;
    }

    // Create a function to switch the current player to play the game
    const switchPlayer = function () {
        if (currentPlayer === player1) {
            currentPlayer = player2;
        }
        else {
            currentPlayer = player1;
        }
    }

    // Create a function to check player's mark on the board in horizontal pattern
    const checkHorizontal = function () {
        const board = GameBoard.getBoard();
        let i;

        for (i = 0; i < 3; i++) {
            if ((board[i][0] === 'X' || board[i][0] === 'O') && 
                (board[i][0] === board[i][1] && board[i][1] === board[i][2])) {
                    return true;
            }
        }

        return false;
    }

    // Create a function to check player's mark on the board in vertical pattern
    const checkVertical = function () {
        const board = GameBoard.getBoard();
        let i;

        for (i = 0; i < 3; i++) {
            if ((board[0][i] === 'X' || board[0][i] === 'O') && 
                (board[0][i] === board[1][i] && board[1][i] === board [2][i])){
                    return true;
            }
        }

        return false;
    }

    // Create a function to check player's mark on the board in diagonal pattern
    const checkDiagonal = function () {
        const board = GameBoard.getBoard();
       
        // Check top left - bottom right
        if (
            (board[0][0] === 'X' || board[0][0] === 'O') && 
            (board[0][0] === board[1][1] && board[1][1] ===board[2][2])) {
                return true;
        }

        // Check right top - left bottom
        if (
            (board[0][2] === 'X' || board[0][2] === 'O') && 
            (board[0][2] === board[1][1] && board[1][1] ===board[2][0])) {
                return true;
        }

        return false;
    }

    // Create a function to check the winner of the game
    const checkWin = function () {
        if ((checkHorizontal()) || (checkVertical()) || (checkDiagonal())){
            return true;
        }

        return false;
    }

    // Create a function to declare the winner of the game
    const declareWinner = function () {
        if (checkWin()) {
            GameBoard.displayBoard();
            console.log("The winner is " + currentPlayer.name);
            return true;
        } 
        else {
            return false;
        }
    }

    // Create a function to validate player's input
    const validateInput = function (cell) {
        if (/^[1-9]$/.test(cell)){
            return true;
        }
        
        return false;
    }

    // Create a function to check a draw in the game
    const checkDraw = function () {
        const board = GameBoard.getBoard().flat();

        if (board.every(cell => cell === 'X' || cell === 'O')) {
            GameBoard.displayBoard();
            console.log("It's a draw!");
            return true;
        }

        return false;
    }

    // Create a function to ask the player whether they want to play again or no
    const playAgain = function () {
        const playerInput = prompt("Do you want to play again? Y/N: ");

        if (playerInput.toLowerCase() === 'y') {
            return true;
        }

        return false;

    }

    // Create a function to reset the game
    const resetGame = function() {
        // Reset the board
        GameBoard.resetBoard();
    }

    // Create a function to play one round
    const playRound = function () {
        if (!handleTurn()) {
            // Invalid input, make the player choose again
            return true;
        }

        // Check a draw or win
        if (checkDraw() || declareWinner()) {
            // If there's, ask the play again or no
            if (playAgain()) {
                resetGame();
                return true;
            }
            // If no, end the game
            return false;
        }

        /*
            Valid input but there's no a draw or win,
            then switch the player,
            and continue the game
        */
        switchPlayer();
        return true;
    }

    // Create a function to play the game
    const playGame = function () {
        while(true) {
            const continueTheGame = playRound();

            if (!continueTheGame) {
                console.log("Thanks for play!");
                break;
            }
        }   
    }   

    return {
       playGame: playGame,
       getCurrentPlayer: getCurrentPlayer
    }
})();   



// Create a function factory to create player object
function createPlayer(name, mark) {
    return {
        name: name,
        mark: mark,
    };
}



// Create a module pattern to wrap the logic of UI
const screenController = ( function () {
    // Query the game container
    const gameContainer = document.querySelector("#game-container");

    // Render the start game button
    const renderStartButton = function () {
        const startButton = document.createElement("button");

        startButton.id = "startBtn";
        startButton.textContent = "Start Game";

        gameContainer.appendChild(startButton);

        return startButton;
    }

    // Create an event listener for 'Start Game' button
    const handleStartGameClick = function () {
        const startBtn = document.querySelector("#startBtn");

        // Attach an event to the button
        startBtn.addEventListener('click', function () {
            clearScreen();
            renderNameInputForm();
        })
    }

    // Create a function to set up the start game UI logic
    const startGameSetup = function () {
        renderStartButton();
        handleStartGameClick();
    }

    // Render the player's name input form
    const renderNameInputForm = function () {
        const inputContainer = document.createElement("div");
        const firstInputContainer = document.createElement("div");
        const secondInputContainer = document.createElement("div");
        const labelInputFirstPlayer = document.createElement("label");
        const nameInputFirstPlayer = document.createElement("input");
        const labelInputSecondPlayer = document.createElement("label");
        const nameInputSecondPlayer = document.createElement("input");
        const continueButton = document.createElement("button");

        inputContainer.id = "input-container";
        firstInputContainer.className = "input firstPlayer";
        secondInputContainer.className = "input secondPlayer"
        labelInputFirstPlayer.className = "label input";
        nameInputFirstPlayer.className = "name input";
        nameInputFirstPlayer.type = "text";
        nameInputFirstPlayer.required = true;
        nameInputFirstPlayer.minLength = 1;
        nameInputFirstPlayer.maxLength = 15;
        labelInputSecondPlayer.className = "label input";
        nameInputSecondPlayer.className = "name input";
        nameInputSecondPlayer.type = "text";
        nameInputSecondPlayer.required = true;
        nameInputSecondPlayer.minLength = 1;
        nameInputSecondPlayer.maxLength = 15;
        continueButton.id = "continueBtn";
        continueButton.type = "button";

        labelInputFirstPlayer.textContent = "Player 1: "
        nameInputFirstPlayer.placeholder = "Enter your name ...";
        labelInputSecondPlayer.textContent = "Player 2: ";
        nameInputSecondPlayer.placeholder = "Enter your name ...";
        continueButton.textContent = "Continue";

        firstInputContainer.appendChild(labelInputFirstPlayer);
        firstInputContainer.appendChild(nameInputFirstPlayer);
        secondInputContainer.appendChild(labelInputSecondPlayer);
        secondInputContainer.appendChild(nameInputSecondPlayer);
        inputContainer.appendChild(firstInputContainer);
        inputContainer.appendChild(secondInputContainer);
        inputContainer.appendChild(continueButton);
        gameContainer.appendChild(inputContainer);

        return inputContainer;
    }

    // Create an event listener for 'Continue' button
    const handleContinueClick = function () {
        const continueBtn = document.querySelector("#continueBtn");

        // Attach the event to the button
        continueBtn.addEventListener('click', function () {
            clearScreen();
            renderGameBoard();
        })
    }

    // Create a function to setup the 'Continue' button
    const continueButtonSetup = function () {
        renderNameInputForm();
        handleContinueClick();
    }

    // Render player's turn indicator
    const renderPlayerTurn = function () {
        const turnContainer = document.createElement("div");
        const turnIndicator = document.createElement("p");

        turnContainer.className = "turn-container";
        turnIndicator.id = "turn-indicator";

        turnIndicator.textContent = gameController.getCurrentPlayer().name + "'s turn!";

        turnContainer.appendChild(turnIndicator);
        gameContainer.appendChild(turnContainer);

        return turnContainer;
    }

    // Render invalid move indicator
    const renderInvalidMove = function () {
        const invalidContainer = document.createElement("div");
        const invalidText = document.createElement("p");

        invalidContainer.className = "invalid-container";
        invalidText.id = "invalid-text";

        invalidText.textContent = "Your move is invalid! Please try again.";

        invalidContainer.appendChild(invalidText);
        gameContainer.appendChild(invalidContainer);

        return invalidContainer;
    }

    // Render the initial game board
    const renderGameBoard = function () {
        const boardContainer = document.createElement("div");
        boardContainer.id = "board-container";

        const board = GameBoard.getBoard();
        let i;
        let j;

        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                const boardCell = document.createElement("button");
                boardCell.className = "cell";
                boardCell.dataset.cell = board[i][j];
                boardContainer.appendChild(boardCell);
            }
        }

        gameContainer.appendChild(boardContainer);

        return boardContainer;
    }

    // Create a function to attach an event listener to each cell on the board
    const handleCellBoard = function () {
        const cells = document.querySelectorAll('.cell');

        cells.forEach(cell => {
            cell.addEventListener('click', () => {
                const cellNum = cell.dataset.cell;
                gameController.handleTurn(cellNum);
            })
        })
    }

    // Render the updated cell
    const renderUpdateBoard = function (cellNum, playerMark) {
        const updatedCell = document.querySelector(`[data-cell="${cellNum}"]`);
        updatedCell.textContent = playerMark;
        
        return updatedCell;
    }

    // Render text when the game is end with draw
    const renderDrawText = function () {
        const drawText = document.createElement("h1");
        drawText.className = "text draw";
        drawText.textContent = "It's A Draw!";

        return drawText;
    }


    // Render text when the game is end with win
    const renderWinText = function () {
        const winText = document.createElement("h1");
        winText.className = "text win";
        winText.textContent = "The Winner Is " + gameController.getCurrentPlayer().name + "!";

        return winText;
    }

    // Render text when player ends the game
    const renderThanksText = function () {
        const thanksText = document.createElement("h1");
        thanksText.className = "text thanks";
        thanksText.textContent = "Thanks For Playing The Game!";

        return thanksText;
    }

    // Render end game screen (win/draw) 
    const renderEndGameScreen = function () {
        const endGameContainer = document.createElement("div");
        const questionText = document.createElement("h1");
        const buttonContainer = document.createElement("div");
        const restartBtn = document.createElement("button");
        const endBtn = document.createElement("button");

        endGameContainer.className = "endGame-container";
        questionText.className = "text question";
        buttonContainer.className = "button-container"
        restartBtn.className = "button restart";
        restartBtn.type = "button";
        endBtn.className = "button end";
        endBtn.type = "button"

        questionText.textContent = "Restart Game?";
        restartBtn.textContent = "Restart";
        endBtn.textContent = "End Game";

        buttonContainer.appendChild(restartBtn);
        buttonContainer.appendChild(endBtn);
        endGameContainer.appendChild(questionText);
        endGameContainer.appendChild(buttonContainer);
        gameContainer.appendChild(endGameContainer);        

        return endGameContainer;
    }

    // Create a function to attach an event listener to 'Restart Game' button
    const handleRestartGame = function () {
        const restartBtn = document.querySelector(".button.restart");

        restartBtn.addEventListener('click', () => {
            clearScreen();
            GameBoard.resetGame();
            renderGameBoard();
            handleCellBoard();
        })
    }

    // Create a function to attach an event listener to 'End Game' button
    const handleEndGame = function () {
        const endGameBtn = document.querySelector(".button.end");

        endGameBtn.addEventListener('click', () => {
            clearScreen();
            renderThanksScreen();
        })
    }

    // Render the win screen
    const renderWinScreen = function() {
        const winContainer = document.createElement("div");
        winContainer.className = "win-container";

        const winText = renderWinText();
        const endGameContainer = renderEndGameScreen();
        
        winContainer.appendChild(winText);
        winContainer.appendChild(endGameContainer);
        gameContainer.appendChild(winContainer);

        return winContainer;
    }

    // Render the draw screen
    const renderDrawScreen = function () {
        const drawContainer = document.createElement("div");
        drawContainer.className = "draw-container";

        const drawText = renderDrawText();
        const endGameContainer = renderEndGameScreen();

        drawContainer.appendChild(drawText);
        drawContainer.appendChild(endGameContainer);
        gameContainer.appendChild(drawContainer);

        return drawContainer;
    }

    // Render the thanks screen
    const renderThanksScreen = function () {
        const thanksContainer = document.createElement("div");
        thanksContainer.className = "thanks-container";

        const thanksText = renderThanksText();

        thanksContainer.appendChild(thanksText);
        gameContainer.appendChild(thanksContainer);

        return thanksContainer;
    }

    // Clear the screen
    const clearScreen = function () {
        gameContainer.innerHTML = "";
    }

    return {
        startGameSetup: startGameSetup,
        continueButtonSetup: continueButtonSetup
    }
})();