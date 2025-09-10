/**
 * Vérifie si la tête du serpent entre en collision avec son propre corps.
 *
 * Cette fonction détermine si la tête du serpent occupe la même position que
 * n'importe quel autre segment de son corps. Si la tête du serpent se trouve
 * aux mêmes coordonnées `x` et `y` qu'un autre segment, la fonction retourne `true`,
 * indiquant une collision avec le corps du serpent (c'est-à-dire que le serpent se mord la queue).
 *
 * @param {{x: number, y: number}} head - Un objet représentant les coordonnées `x` et `y` de la tête du serpent.
 * @param {Array<{x: number, y: number}>} snakeArray - Un tableau d'objets représentant les segments du serpent, où chaque objet contient des coordonnées `x` et `y`.
 * @returns {boolean} - Retourne `true` si la tête du serpent entre en collision avec un segment de son corps, sinon `false`.
 * @param {{Food}} food
 */
function checkCollision(head, snakeArray) {
  if (!snakeArray || snakeArray.length < 2) {
    return false; // Pas assez de segments pour une collision
  }

  for (let i = 1; i < snakeArray.length; i++) {
    if (head.x === snakeArray[i].x && head.y === snakeArray[i].y) {
      return true; // Collision détectée
    }
  }
  return false; // Pas de collision détectée
}

/**
 * Vérifie si la tête du serpent entre en collision avec les murs du canvas.
 *
 * Cette fonction détermine si la tête du serpent a dépassé les limites du canvas,
 * ce qui signifierait une collision avec un mur. Si la tête du serpent sort du canvas
 * (c'est-à-dire si ses coordonnées `x` ou `y` sont en dehors des limites définies par
 * la largeur et la hauteur du canvas), la fonction retourne `true`, indiquant une collision.
 *
 * @param {{x: number, y: number}} head - Un objet représentant les coordonnées `x` et `y` de la tête du serpent.
 * @param {HTMLCanvasElement} canvas - L'élément canvas représentant la surface de jeu.
 * @param {number} box - La taille d'une case de la grille en pixels, utilisée pour déterminer les limites du déplacement du serpent.
 * @returns {boolean} - Retourne `true` si la tête du serpent entre en collision avec un mur, sinon `false`.
 */

function checkWallCollision(head, canvas, box) {
  if (
    head.x < box || // Collision avec le mur gauche
    head.x > canvas.width - box || // Collision avec le mur droit
    head.y < box || // Collision avec le mur supérieur
    head.y > canvas.height - box // Collision avec le mur inférieur
  ) {
    return true; // Collision détectée
  }
  return false; // Pas de collision détectée
}

function checkFoodCollision(head, food) {
  if (head.x === food.x && head.y === food.y){
    return true; // Collision avec la nourriture détectée
  }
}

export { checkCollision, checkWallCollision, checkFoodCollision };