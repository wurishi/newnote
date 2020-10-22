import Stats from 'stats.js';

(function () {
  const app = new PIXI.Application({ transparent: true });
  document.body.appendChild(app.view);

  const bunny = PIXI.Sprite.from('../bunny.png');
  bunny.anchor.set(0.5);

})();
