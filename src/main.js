import { initSnake, moveSnake, drawSnake } from "./snake.js";
import { generateFood, drawFood } from "./food.js";
import { handleDirectionChange } from "./controls.js";
import { checkCollision, checkWallCollision } from "./collision.js";
import { drawScore } from "./score.js";
import { checkFoodCollision } from "./collision.js";
import { drawTimer } from "./score.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ctx.fillStyle = "lightgrey";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

const box = 20;
const gameSpeed = 200;
let snake;
let food;
let direction = "RIGHT";
let score;
let gameInterval; // Variable pour stocker l'identifiant de l'intervalle
let startTime
let isPaused = false;
let pausedTime = 0;
let pauseStart = 0;


document.addEventListener("keydown", (event) => {
  direction = handleDirectionChange(event, direction);
});

function mainMenu() {
  ctx.fillStyle = "lightgrey";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Press Enter to Start", canvas.width / 2, canvas.height / 2);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      clearInterval(gameInterval);
      score = 0
      startGame();
    }
  });
}

function startGame() {
  snake = initSnake();
  food = generateFood(box, canvas);
  gameInterval = setInterval(draw, gameSpeed); // Stockage de l'identifiant de l'intervalle
  startTime = Date.now(); // Temps de début du jeu
}

function endGame() {
  ctx.fillStyle = "lightgrey";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Game Over !", canvas.width / 2, canvas.height / 2 - 50);
  ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 -10);
  ctx.fillText(`Time: ${Math.floor((Date.now() - startTime - pausedTime) / 1000)} seconds`, canvas.width / 2, canvas.height / 2 +30);
}

//---------------------------------------------------------------

function pauseGame() {
  if (gameInterval) {
    clearInterval(gameInterval);
    pauseStart = Date.now();
    isPaused = true;
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("PAUSE", canvas.width / 2 - 70, canvas.height / 2);
  }
}

function resumeGame() {
  if (isPaused) {
    pausedTime += Date.now() - pauseStart;
    gameInterval = setInterval(draw, gameSpeed);
    isPaused = false;
  }
}

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    if (!isPaused) {
      pauseGame();
    } else {
      resumeGame();
    }
  }
});


//--------------------------------------------------------------------

function draw() {
  // Efface le canvas avant de redessiner
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Met à jour la position du serpent
  snake = moveSnake(snake, direction, box);

  // Dessine le serpent
  drawSnake(ctx, snake, box);

  // Dessine la nourriture
  drawFood(ctx, food, box);

  if (checkCollision(snake[0], snake) || checkWallCollision(snake[0], canvas, box)) {
    clearInterval(gameInterval);
    endGame();
  }

  if (checkFoodCollision(snake[0], food)) {
    score += 1;
    food = generateFood(box, canvas);
    snake.push({}); // Ajoute un segment au serpent en ne supprimant pas le dernier segment
  }

  // Affiche le score
  drawScore(ctx, score);

  drawTimer(ctx, Math.floor((Date.now() - startTime - pausedTime) / 1000));
}

mainMenu();