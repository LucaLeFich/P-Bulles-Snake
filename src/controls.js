/**
 * Gère le changement de direction du serpent en fonction de l'entrée de l'utilisateur.
 *
 * Cette fonction est appelée chaque fois qu'une touche directionnelle est pressée.
 * Elle vérifie que la nouvelle direction n'est pas opposée à la direction actuelle
 * (pour éviter que le serpent se retourne sur lui-même) et retourne la nouvelle direction
 * si elle est valide.
 *
 * @param {KeyboardEvent} event - L'événement clavier qui contient les informations sur la touche pressée.
 * @param {string} currentDirection - La direction actuelle du serpent (peut être "UP", "DOWN", "LEFT", ou "RIGHT").
 * @returns {string} - La nouvelle direction du serpent après traitement, ou la direction actuelle si le changement n'est pas valide.
 */
function handleDirectionChange(event, currentDirection) {
  if (event.key === "ArrowLeft" || event.key === "a" && currentDirection !== "RIGHT") {
    return "LEFT";
  } else if (event.key === "ArrowUp" || event.key === "w" && currentDirection !== "DOWN") {
    return "UP";
  } else if (event.key === "ArrowRight" || event.key === "d" && currentDirection !== "LEFT") {
    return "RIGHT";
  } else if (event.key === "ArrowDown" || event.key === "s" && currentDirection !== "UP") {
    return "DOWN";
  }
  return currentDirection; // si la touche n'est pas valide, on garde la direction actuelle
}

export { handleDirectionChange };