export default (function () {
  const app = new PIXI.Application({
    transparent: true,
  });

  document.body.appendChild(app.view);
  document.body.style.backgroundColor = 'yellow';

  const bunny = PIXI.Sprite.from('../bunny.png');
  bunny.anchor.set(0.5);

  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;
  app.stage.addChild(bunny);

  app.ticker.add(() => (bunny.rotation += 0.1));
});
