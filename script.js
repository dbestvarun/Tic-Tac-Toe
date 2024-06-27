const board = document.querySelector('.js-board');
const resultElement = document.querySelector('.js-result');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let xMoves = [];
let oMoves = [];

// Create the tic-tac-toe board dynamically
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.setAttribute('data-index', i);
    cell.setAttribute('id', i);
    cell.addEventListener('click', () => handleCellClick(i));
    board.appendChild(cell);
}

function handleCellClick(index) {
    if (!gameBoard[index] && gameActive) {
        gameBoard[index] = currentPlayer;
        if (currentPlayer === 'X') {
            if (xMoves.length === 2) {
                let change = document.getElementById(xMoves[0]);
                change.style.backgroundColor = '#ffcccc';

            }
            if (xMoves.length === 3) {
                let change = document.getElementById(xMoves[0]);
                change.style.backgroundColor = 'aliceblue';
                gameBoard[xMoves[0]] = '';
                xMoves.shift();
            }
            xMoves.push(index);
        }
        else {
            if (oMoves.length === 2) {
                let change = document.getElementById(oMoves[0]);
                change.style.backgroundColor = '#cceeff';

            }
            if (oMoves.length === 3) {
                let change = document.getElementById(oMoves[0]);
                change.style.backgroundColor = 'aliceblue';
                gameBoard[oMoves[0]] = '';
                oMoves.shift();
            }
            oMoves.push(index);
        }
        renderBoard();
        checkWinner();
        togglePlayer();
    }
}

function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            resultElement.textContent = `Player ${currentPlayer} wins!`;
            return;
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        resultElement.textContent = 'It\'s a tie!';
    }
}

function renderBoard() {
    gameBoard.forEach((value, index) => {
        const cell = board.children[index];
        cell.textContent = value;
    });
}

function resetGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    resultElement.textContent = '';
    xMoves = [];
    oMoves = [];
    let bgclr = document.getElementsByClassName('cell');
    for(i=0; i<bgclr.length; i++){
        bgclr[i].style.backgroundColor = 'aliceblue';
    }
    renderBoard();
}
