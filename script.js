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

    return {
        displayBoard: displayBoard,
        resetBoard: resetBoard,
        isCellAvail: isCellAvail,
        updateBoard: updateBoard
    }
})();



// Create a module pattern to wrap the logic of game controller
var gameController = ( function () {
    // Create a function to get the player's input
    const getPlayerInput = function () {
        const playerInput = prompt("Choose a cell (1 - 9): ");
        return playerInput;
    }

    return {
        getPlayerInput: getPlayerInput
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