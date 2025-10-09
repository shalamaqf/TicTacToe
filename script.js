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

        displayBoard();

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
        const cell = getPlayerInput();

        if (!validateInput(cell)) {
            return false;
        }
        
        if (isValid(cell)){
            GameBoard.updateBoard(currentPlayer.mark, cell);
            GameBoard.displayBoard();
            return true; 
        }
        else {
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
    const checkWinner = function () {
        if ((checkHorizontal()) || (checkVertical()) || (checkDiagonal())){
            return true;
        }

        return false;
    }

    // Create a function to declare the winner of the game
    const declareWinner = function () {
        if (checkWinner()) {
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

    return {
       
    }
})();   



// Create a function factory to create player object
function createPlayer(name, mark) {
    return {
        name: name,
        mark: mark,
        score: 0,
    };
}