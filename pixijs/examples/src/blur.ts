export default function () {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  const bg = PIXI.Sprite.from('bg_depth_blur.jpg');
  bg.width = app.screen.width;
  bg.height = app.screen.height;
  app.stage.addChild(bg);

  const litterDudes = new PIXI.Container();
  const egghead = PIXI.Sprite.from('egghead.png');
  litterDudes.addChild(egghead);
  const flowerTop = PIXI.Sprite.from('flowerTop.png');
  flowerTop.x = 150;
  litterDudes.addChild(flowerTop);
  const helmlok = PIXI.Sprite.from('helmlok.png');
  helmlok.x = 450;
  litterDudes.addChild(helmlok);
  const skully = PIXI.Sprite.from('skully.png');
  skully.x = 600;
  litterDudes.addChild(skully);

  litterDudes.y = 200;
  app.stage.addChild(litterDudes);

  const litterRobot = PIXI.Sprite.from('depth_blur_moby.jpg');
  litterRobot.x = app.screen.width / 2 - 200;
  litterRobot.y = 100;
  app.stage.addChild(litterRobot);

  const blurFilter1 = new PIXI.filters.BlurFilter();
  const blurFilter2 = new PIXI.filters.BlurFilter();

  litterDudes.filters = [blurFilter1];
  litterRobot.filters = [blurFilter2];

  let count = 0;

  app.ticker.add(() => {
    count += 0.005;

    const blurAmount = Math.cos(count);
    const blurAmount2 = Math.sin(count);

    blurFilter1.blur = 20 * blurAmount;
    blurFilter2.blur = 20 * blurAmount2;
  });
}
