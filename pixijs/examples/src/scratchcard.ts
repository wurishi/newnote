import Stats from 'stats.js';

export default (function () {
  const stats = new Stats();
  document.body.appendChild(stats.dom);

  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  const { stage } = app;

  const brush = new PIXI.Graphics();
  brush.beginFill(0xffffff);
  brush.drawCircle(0, 0, 50);
  brush.endFill();

  app.loader.add('t1', '../bg_grass.jpg');
  app.loader.add('t2', '../bg_rotate.jpg');
  app.loader.load((loader, resources) => {
    const background = new PIXI.Sprite(resources.t1.texture);
    stage.addChild(background);
    background.width = app.screen.width;
    background.height = app.screen.height;

    const imageToReveal = new PIXI.Sprite(resources.t2.texture);
    stage.addChild(imageToReveal);
    imageToReveal.width = app.screen.width;
    imageToReveal.height = app.screen.height;

    const renderTexture = PIXI.RenderTexture.create({
      width: app.screen.width,
      height: app.screen.height,
    });
    const renderTextureSprite = new PIXI.Sprite(renderTexture);
    stage.addChild(renderTextureSprite);
    imageToReveal.mask = renderTextureSprite;

    stage.interactive = true;
    let dragging = false;
    stage.on('pointerdown', (event: PIXI.interaction.InteractionEvent) => {
      dragging = true;
      pointerMove(event);
    });
    stage.on('pointerup', () => (dragging = false));
    stage.on('pointermove', pointerMove);

    function pointerMove(event: PIXI.interaction.InteractionEvent) {
      if (dragging) {
        brush.position.copyFrom(event.data.global);
        app.renderer.render(brush, renderTexture, false, null, false);
      }
    }
  });

  app.ticker.add(() => stats.update());
});
