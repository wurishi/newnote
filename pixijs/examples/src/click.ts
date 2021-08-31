export default function () {
  const app = new PIXI.Application({ backgroundColor: 0x1099bb });
  document.body.appendChild(app.view);

  PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

  const sprite = PIXI.Sprite.from('./bunny.png');

  sprite.anchor.set(0.5);
  sprite.x = app.screen.width / 2;
  sprite.y = app.screen.height / 2;

  sprite.interactive = true;

  sprite.buttonMode = true;

  app.stage.addChild(sprite);

  sprite.on('pointerdown', () => {
    sprite.scale.x *= 1.25;
    sprite.scale.y *= 1.25;
  });
}
