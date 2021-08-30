export default (function () {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  let bol = false;

  const texture = PIXI.Texture.from('../flowerTop.png');
  const secondTexture = PIXI.Texture.from('../eggHead.png');

  const dude = new PIXI.Sprite(texture);

  dude.anchor.set(0.5);
  dude.x = app.screen.width / 2;
  dude.y = app.screen.height / 2;

  app.stage.addChild(dude);

  dude.interactive = true;
  dude.buttonMode = true;

  dude.on('pointertap', () => {
    bol = !bol;
    if (bol) {
      dude.texture = secondTexture;
    } else {
      dude.texture = texture;
    }
  });

  app.ticker.add(() => {
    dude.rotation += 0.1;
  });
});
