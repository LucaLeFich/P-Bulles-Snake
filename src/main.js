import { initSnake, moveSnake, drawSnake } from "./snake.js";
import { generateFood, drawFood } from "./food.js";
import { handleDirectionChange } from "./controls.js";
import { checkCollision, checkWallCollision } from "./collision.js";
import { drawScore } from "./score.js";
import { checkFoodCollision } from "./collision.js";
import { drawTimer } from "./score.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let config;
let box;
let gameSpeed;
let snake;
let food;
let direction
let score;
let gameInterval; // Variable pour stocker l'identifiant de l'intervalle
let startTime
let isPaused = false;
let pausedTime = 0;
let pauseStart = 0;
let isGameOver = false;

/**
 * Gère les événements de changement de direction du serpent.
 * @event KeyDown
 * @param {KeyboardEvent} event - L'événement de clavier déclenché lors de l'appui sur une touche.
 * @param {string} direction - La direction actuelle du serpent.
 */
document.addEventListener("keydown", (event) => {
  direction = handleDirectionChange(event, direction);
});

/**
 * Affiche le menu principal du jeu.
 * 
 * Cette fonction dessine l'écran du menu principal sur le canvas, invitant le joueur à appuyer sur la touche "Entrée" pour commencer le jeu.
 * Elle écoute également les événements de clavier pour détecter l'appui sur la touche "Entrée"
 * et démarre le jeu en appelant la fonction `startGame`.
 */
function mainMenu() {
  ctx.fillStyle = config.colors.background;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Press Enter to Start", canvas.width / 2, canvas.height / 2);
  document.addEventListener("keydown", (event) => {
    if (event.code === config.keys.start && !isPaused) {
      clearInterval(gameInterval);
      score = 0
      startGame();
    }
  });
}

/**
 * Démarre une nouvelle partie du jeu.
 * 
 * Cette fonction initialise le serpent, génère la nourriture, et lance la boucle de jeu
 * en utilisant `setInterval` pour appeler la fonction `draw` à intervalles réguliers
 * définis par `gameSpeed`. Elle enregistre également le temps de début du jeu pour le suivi du temps.
 */
function startGame() {
  snake = initSnake();
  food = generateFood(box, canvas);
  gameInterval = setInterval(draw, gameSpeed); // Stockage de l'identifiant de l'intervalle
  startTime = Date.now(); // Temps de début du jeu
  isGameOver = false;
}

/**
 * Affiche l'écran de fin de jeu.
 * 
 * Cette fonction dessine l'écran de fin de jeu sur le canvas, affichant le message "Game Over !",
 * le score final du joueur, et le temps écoulé pendant la partie.
 */
function gameOver() {
  ctx.fillStyle = "lightgrey";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.textAlign = "center";
  ctx.fillText("Game Over !", canvas.width / 2, canvas.height / 2 - 50);
  ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 -10);
  ctx.fillText(`Time: ${Math.floor((Date.now() - startTime - pausedTime) / 1000)} seconds`, canvas.width / 2, canvas.height / 2 +30);
  isGameOver = true;
}

/**
 * Met en pause le jeu.
 * 
 * Cette fonction arrête l'intervalle de jeu, enregistre le temps de début de la pause,
 * et affiche un écran de pause sur le canvas.
 */
function pauseGame() {
  if (gameInterval) {
    clearInterval(gameInterval);
    pauseStart = Date.now();
    isPaused = true;
    ctx.fillStyle = config.colors.pauseOverlay;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.fillText("PAUSE", canvas.width / 2 - 70, canvas.height / 2);
  }
}

/**
 * Reprend le jeu après une pause.
 * 
 * Cette fonction redémarre la boucle de jeu et ajuste le temps de pause pour un calcul correct du timer.
 */
function resumeGame() {
  if (isPaused) {
    pausedTime += Date.now() - pauseStart;
    gameInterval = setInterval(draw, gameSpeed);
    isPaused = false;
  }
}

/**
 * Gère les événements de pause et de reprise du jeu.
 * @event KeyDown
 * @param {KeyboardEvent} event - L'événement de clavier déclenché lors de l'appui sur une touche.
 */
document.addEventListener("keydown", (event) => {
  if (event.code === config.keys.pause && !isGameOver) {
    if (!isPaused) {
      setTimeout(() => {
        pauseGame();
      }, 100);
    } else {
      resumeGame();
    }
  }
});

/**
 * Boucle principale du jeu : met à jour et redessine tous les éléments à chaque frame.
 */
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake = moveSnake(snake, direction, box);
  drawSnake(ctx, snake, box);
  drawFood(ctx, food, box);

  if (checkCollision(snake[0], snake) || checkWallCollision(snake[0], canvas, box)) {
    clearInterval(gameInterval);
    gameOver();
  }

  if (checkFoodCollision(snake[0], food)) {
    score += 1;
    food = generateFood(box, canvas);
    snake.push({}); // Ajoute un segment au serpent en ne supprimant pas le dernier segment
  }

  drawScore(ctx, score);
  drawTimer(ctx, Math.floor((Date.now() - startTime - pausedTime) / 1000));
}

/**
 * Charge la configuration du jeu à partir d'un fichier JSON et initialise les paramètres du jeu.
 * 
 * @async
 * @returns {Promise<void>} - Une promesse qui se résout lorsque la configuration est chargée et le menu principal affiché.
 */
async function loadConfig() {
  try {
    const response = await fetch("./config.json");
    config = await response.json();

    box = config.box;
    gameSpeed = config.gameSpeed;
    direction = config.initialDirection;
    score = config.startingScore;

    // Taille du canvas
    canvas.width = config.canvasWidth;
    canvas.height = config.canvasHeight;

    console.log("Configuration chargée :", config);
    mainMenu();
  } catch (error) {
    console.error("Erreur lors du chargement de la configuration :", error);
  }
}

loadConfig();