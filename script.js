const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 900;

let snake;
let dx;
let dy;
let food;
let score;
let game;

startGame();

// Keyboard control
document.addEventListener("keydown", changeDirection);

function startGame() {

  snake = [
    { x: 200, y: 200 }
  ];

  dx = box;
  dy = 0;

  score = 0;

  document.getElementById("score").innerText =
    "Score: " + score;

  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };

  clearInterval(game);

  game = setInterval(drawGame, 120);
}

function changeDirection(event) {

  if (event.key === "ArrowLeft" && dx === 0) {
    dx = -box;
    dy = 0;
  }

  else if (event.key === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -box;
  }

  else if (event.key === "ArrowRight" && dx === 0) {
    dx = box;
    dy = 0;
  }

  else if (event.key === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = box;
  }
}

function drawGame() {

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {

    ctx.fillStyle = (i === 0) ? "lime" : "green";

    ctx.fillRect(
      snake[i].x,
      snake[i].y,
      box,
      box
    );

    ctx.strokeStyle = "#111";

    ctx.strokeRect(
      snake[i].x,
      snake[i].y,
      box,
      box
    );
  }

  // New head
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };

  // Wall collision
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x >= canvasSize ||
    head.y >= canvasSize
  ) {
    gameOver();
    return;
  }

  // Self collision
  for (let i = 0; i < snake.length; i++) {

    if (
      head.x === snake[i].x &&
      head.y === snake[i].y
    ) {
      gameOver();
      return;
    }
  }

  // Add new head
  snake.unshift(head);

  // Eat food
  if (
    head.x === food.x &&
    head.y === food.y
  ) {

    score++;

    document.getElementById("score").innerText =
      "Score: " + score;

    food = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };

  } else {

    snake.pop();
  }
}

function gameOver() {

  clearInterval(game);

  const playAgain = confirm(
    "Game Over!\n\nScore: " + score +
    "\n\nPlay Again?"
  );

  if (playAgain) {
    startGame();
  }
}