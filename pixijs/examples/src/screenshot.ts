export default (function () {
  const app = new PIXI.Application({
    backgroundColor: 0x111111,
  });
  document.body.appendChild(app.view);

  let wait = false;
  let waiting = false;

  function takeScreenshot() {
    wait = true;
    app.renderer.extract.canvas(app.stage).toBlob((b) => {
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.download = 'screenshot';
      a.href = URL.createObjectURL(b);
      a.click();
      a.remove;
    }, 'image/png');
  }

  app.renderer.plugins.interaction.on('pointerdown', takeScreenshot);

  const texture = PIXI.Texture.from('../bunny.png');
  const bunnyContainer = new PIXI.Container();
  bunnyContainer.pivot.set(0.5, 0.5);

  for (let i = 0; i < 25; i++) {
    const bunny = new PIXI.Sprite(texture);
    bunny.anchor.set(0.5);
    bunny.x = (i % 5) * 40;
    bunny.y = Math.floor(i / 5) * 40;
    bunnyContainer.addChild(bunny);
  }

  bunnyContainer.x = 400;
  bunnyContainer.y = 300;
  bunnyContainer.pivot.x = bunnyContainer.width / 2;
  bunnyContainer.pivot.y = bunnyContainer.height / 2;

  app.ticker.add((delta) => {
    if (wait) {
      waiting = true;
      wait = false;
      setTimeout(() => {
        waiting = false;
      }, 500);
    }
    if (!waiting) {
      bunnyContainer.rotation += 0.05 * delta;
    }
  });

  const style = new PIXI.TextStyle({
    fontSize: 36,
    fill: '#ffffff',
  });
  const screenshotText = new PIXI.Text('点击截屏', style);
  screenshotText.x = Math.round((app.screen.width - screenshotText.width) / 2);
  screenshotText.y = Math.round(screenshotText.height / 2);

  app.stage.addChild(screenshotText, bunnyContainer);
});
