(function () {
  const app = new PIXI.Application({ transparent: true });
  document.body.appendChild(app.view);

  const bunny = PIXI.Sprite.from('../bunny.png');
  console.log(PIXI.utils.TextureCache);
  bunny.anchor.set(0.5);

  bunny.x = app.screen.width / 2;
  bunny.y = app.screen.height / 2;

  app.stage.addChild(bunny);

  app.ticker.add(() => (bunny.rotation += 0.1));
})();
