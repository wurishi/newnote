export default function () {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  app.stage.interactive = true;

  const container = new PIXI.Container();
  app.stage.addChild(container);

  const flag = PIXI.Sprite.from('flag.png');
  container.addChild(flag);
  flag.position.set(100, 100);

  const displacementSprite = PIXI.Sprite.from('displacement_map_repeat.jpg');
  displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
  const displacementFilter = new PIXI.filters.DisplacementFilter(
    displacementSprite
  );
  displacementFilter.padding = 10;

  displacementSprite.position.copyFrom(flag.position);
  app.stage.addChild(displacementSprite);

  flag.filters = [displacementFilter];

  displacementFilter.scale.set(30, 60);

  app.ticker.add(() => {
    displacementSprite.x++;
    if (displacementSprite.x > displacementSprite.width) {
      displacementSprite.x = 0;
    }
  });
}
