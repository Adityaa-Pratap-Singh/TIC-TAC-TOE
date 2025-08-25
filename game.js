const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset");
const message = document.querySelector("#message");
const xScoreEl = document.querySelector("#x-score");
const oScoreEl = document.querySelector("#o-score");

let turnX = true;
let gameOver = false;
let xScore = 0;
let oScore = 0;
let moveCount = 0;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const showMessage = (text) => {
  message.innerText = text;
  message.style.display = "block";
};

const updateScore = () => {
  xScoreEl.innerText = xScore;
  oScoreEl.innerText = oScore;
};

const disableAllBoxes = () => {
  boxes.forEach((box) => box.disabled = true);
};

const enableAllBoxes = () => {
  boxes.forEach((box) => {
    box.innerText = "";
    box.disabled = false;
  });
  message.style.display = "none";
  moveCount = 0;
  gameOver = false;
  turnX = true;
};

const checkWinner = () => {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    const valueA = boxes[a].innerText;
    const valueB = boxes[b].innerText;
    const valueC = boxes[c].innerText;

    if (valueA !== "" && valueA === valueB && valueB === valueC) {
      gameOver = true;
      showMessage(`🎉 Player ${valueA} wins!`);
      valueA === "X" ? xScore++ : oScore++;
      updateScore();
      disableAllBoxes();
      return;
    }
  }

  if (moveCount === 9 && !gameOver) {
    showMessage("🤝 It's a Draw!");
    gameOver = true;
  }
};

// Event Listeners
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (box.innerText !== "" || gameOver) return;

    box.innerText = turnX ? "X" : "O";
    box.disabled = true;
    turnX = !turnX;
    moveCount++;
    checkWinner();
  });
});

resetBtn.addEventListener("click", () => {
  enableAllBoxes();
});
