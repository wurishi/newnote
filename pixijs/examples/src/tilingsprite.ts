export default (function () {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  const texture = PIXI.Texture.from('./p2.jpeg');

  const tilingSprite = new PIXI.TilingSprite(
    texture,
    app.screen.width,
    app.screen.height
  );
  app.stage.addChild(tilingSprite);

  let count = 0;

  app.ticker.add(() => {
    count += 0.005;

    tilingSprite.tileScale.x = 2 + Math.sin(count);
    tilingSprite.tileScale.y = 2 + Math.cos(count);

    tilingSprite.tilePosition.x += 1;
    tilingSprite.tilePosition.y += 1;
  });
});
