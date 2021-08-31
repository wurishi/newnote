export default (function () {
  const app = new PIXI.Application({ transparent: true });
  document.body.appendChild(app.view);

  const button = new PIXI.Graphics()
    .beginFill(0x0, 0.5)
    .drawRoundedRect(0, 0, 100, 100, 10)
    .endFill()
    .beginFill(0xffffff)
    .moveTo(36, 30)
    .lineTo(36, 70)
    .lineTo(70, 50);

  button.x = (app.screen.width - button.width) / 2;
  button.y = (app.screen.height - button.height) / 2;

  button.interactive = true;
  button.buttonMode = true;

  app.stage.addChild(button);

  button.on('pointertap', () => {
    button.destroy();

    const texture = PIXI.Texture.from('./video.mp4');

    const videoSprite = new PIXI.Sprite(texture);

    videoSprite.width = app.screen.width;
    videoSprite.height = app.screen.height;

    app.stage.addChild(videoSprite);
  });
});
