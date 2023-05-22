let headTxt = document.getElementById("headTxt");
let restartBtn = document.getElementById("restart");
let boxes = Array.from(document.getElementsByClassName("box"));
let winnerHighlight = getComputedStyle(document.body).getPropertyValue('--winning-blocks')

const X_TEXT = "X";
const O_TEXT = "O";
let currentPlayer = X_TEXT;
let boardVal = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener("click", boxClick));
}

function boxClick(e) {
    let id = e.target.id;
    if (!boardVal[id]) {
        boardVal[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (playerWon() !== false) {
            headTxt.innerText = `${currentPlayer} has won!`;
            let winning_blocks = playerWon()

            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerHighlight)
            return;
        }

        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
        if (boardVal.every(box => box !== null)) {
            headTxt.innerText = "It's a tie!";
            return;
        }
    }
}

restartBtn.addEventListener("click", restartGame);

function restartGame() {
    boardVal.fill(null);
    boxes.forEach(box => {
        box.innerText = "";
        box.style.backgroundColor = "";
    });

    headTxt.innerText = "Tic Tac Toe";
    currentPlayer = X_TEXT;
    startGame();
}

const winningConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [2,4,6],
    [0,4,8],
    [0,3,6],
    [1,4,7],
    [2,5,8]
];

function playerWon() {
    for (const condition of winningConditions) {
        let [a,b,c] = condition;
        if (boardVal[a] && boardVal[a] === boardVal[b] && boardVal[a] === boardVal[c]) {
            boxes.forEach(box => box.removeEventListener("click", boxClick));
            return [a,b,c];
        }
    }
    return false;
}

startGame();