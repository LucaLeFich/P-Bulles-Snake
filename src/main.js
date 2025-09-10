import { initSnake, moveSnake, drawSnake } from "./snake.js";
import { generateFood, drawFood } from "./food.js";
import { handleDirectionChange } from "./controls.js";
import { checkCollision, checkWallCollision } from "./collision.js";
import { drawScore } from "./score.js";
import { checkFoodCollision } from "./collision.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// ctx.fillStyle = "lightgrey";
// ctx.fillRect(0, 0, canvas.width, canvas.height);

const box = 20;
const gameSpeed = 200;
let snake;
let food;
let direction = "RIGHT";
let score = 0;
let gameInterval; // Variable pour stocker l'identifiant de l'intervalle

document.addEventListener("keydown", (event) => {
  direction = handleDirectionChange(event, direction);
});

function startGame() {
  snake = initSnake();
  food = generateFood(box, canvas);

  gameInterval = setInterval(draw, gameSpeed); // Stockage de l'identifiant de l'intervalle
}

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
    alert("Game Over! Score: " + score);
    return;
  }

  if (checkFoodCollision(snake[0], food)) {
    score += 1;
    food = generateFood(box, canvas);
  }

  // Affiche le score
  //drawScore(ctx, score);
}

startGame()