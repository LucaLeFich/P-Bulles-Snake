/**
 * Dessine le score sur le canvas.
 *
 * Cette fonction affiche le score actuel du jeu dans le coin supérieur gauche du canvas.
 * Le score est affiché en noir avec une police Arial de 20px.
 *
 * @param {CanvasRenderingContext2D} ctx - Le contexte de rendu 2D du canvas utilisé pour dessiner.
 * @param {number} score - Le score à afficher, qui est un entier.
 * @param {number} time - Le temps écoulé en secondes.
 */
function drawScore(ctx, score) {
  const x = 0;
  const y = 0;
  const width = 100;
  const height = 40;

  // Dessine le score en blanc, centré dans le carré
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(`Score: ${score}`, x + 10, y + height / 2);
}
export { drawScore };

/**
 * Dessine le minuteur sur le canvas.
 *
 * Cette fonction affiche le temps écoulé depuis le début de la partie dans le coin supérieur droit du canvas.
 * Le temps est affiché en noir avec une police Arial de 20px.
 *
 * @param {CanvasRenderingContext2D} ctx - Le contexte de rendu 2D du canvas utilisé pour dessiner.
 * @param {number} time - Le temps écoulé en secondes.
 */
function drawTimer(ctx, time) {
  const x = 300;
  const y = 0;
  const width = 100;
  const height = 40;

  // Dessine le temps en noir, centré dans le carré
  ctx.fillStyle = 'black';
  ctx.font = '20px Arial';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(`Time: ${time}s`, x, y + height / 2);
}

export { drawTimer };