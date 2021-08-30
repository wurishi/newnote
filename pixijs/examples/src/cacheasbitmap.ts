import Stats from 'stats.js';

export default (function () {
  const app = new PIXI.Application({ transparent: true });
  document.body.appendChild(app.view);

  app.stop();

  const aliens: PIXI.Sprite[] = [];
  const alienFrames = [
    'eggHead.png',
    'flowerTop.png',
    'helmlok.png',
    'skully.png',
  ];

  let count = 0;
  const alienContainer = new PIXI.Container();
  // const alienContainer = new PIXI.ParticleContainer(10000, {
  //   rotation: true,
  //   tint: true,
  // });
  alienContainer.x = 400;
  alienContainer.y = 300;

  app.stage.interactive = true;
  app.stage.addChild(alienContainer);

  app.loader.add('../monsters.json').load(() => {
    // console.log(PIXI.utils.TextureCache)
    for (let i = 0; i < 100; i++) {
      const frameName = alienFrames[i % 4];

      const sprite = PIXI.Sprite.from(frameName);
      sprite.tint = Math.random() * 0xffffff;

      sprite.x = Math.random() * 800 - 400;
      sprite.y = Math.random() * 600 - 300;
      sprite.anchor.x = 0.5;
      sprite.anchor.y = 0.5;
      aliens.push(sprite);
      alienContainer.addChild(sprite);
    }
    app.start();
  });

  app.stage.on('pointertap', () => {
    alienContainer.cacheAsBitmap = !alienContainer.cacheAsBitmap;
  });

  const stats = new Stats();
  document.body.appendChild(stats.dom);

  app.ticker.add(() => {
    stats.update();
    aliens.forEach((alien) => (alien.rotation += 0.1));

    count += 0.01;

    alienContainer.scale.x = Math.sin(count);
    alienContainer.scale.y = Math.sin(count);
    alienContainer.rotation += 0.01;
  });
});
