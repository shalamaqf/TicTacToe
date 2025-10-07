var GameBoard = ( function () {
    let board = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
    ];

    const displayBoard = function () {
        let i;
        for (i = 0; i < 3; i++) {
            console.log(board[i].join(' | '));
        }
    }

    return {
        displayBoard: displayBoard
    }
})();