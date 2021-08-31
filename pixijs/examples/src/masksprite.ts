export default function () {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  app.stage.interactive = true;

  const bg = PIXI.Sprite.from('bg_plane.jpg');
  app.stage.addChild(bg);

  const cells = PIXI.Sprite.from('cells.png');
  cells.scale.set(1.5);

  const mask = PIXI.Sprite.from('flowerTop.png');
  mask.anchor.set(0.5);
  mask.position.set(310, 190);

  cells.mask = mask;

  app.stage.addChild(mask, cells);

  const target = new PIXI.Point();

  reset();

  function reset() {
    target.set(
      Math.floor(Math.random() * 550),
      Math.floor(Math.random() * 300)
    );
  }

  app.ticker.add(() => {
    mask.x += (target.x - mask.x) * 0.1;
    mask.y += (target.y - mask.y) * 0.1;

    if (Math.abs(mask.x - target.x) < 1) {
      reset();
    }
  });
}
