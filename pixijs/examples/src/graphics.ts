export default function () {
  const app = new PIXI.Application({ antialias: true });
  document.body.appendChild(app.view);

  app.stage.interactive = true;

  const bg = PIXI.Sprite.from('./bg_rotate.jpg');

  bg.anchor.set(0.5);
  bg.position.set(app.screen.width / 2, app.screen.height / 2);

  app.stage.addChild(bg);

  const container = new PIXI.Container();
  container.position.set(app.screen.width / 2, app.screen.height / 2);

  const bgFront = PIXI.Sprite.from('./bg_scene_rotate.jpg');
  bgFront.anchor.set(0.5);

  const light2 = PIXI.Sprite.from('./light_rotate_2.png');
  light2.anchor.set(0.5);

  const light1 = PIXI.Sprite.from('./light_rotate_1.png');
  light1.anchor.set(0.5);

  const panda = PIXI.Sprite.from('./panda.png');
  panda.anchor.set(0.5);

  container.addChild(bgFront, light2, light1, panda);

  app.stage.addChild(container);

  const thing = new PIXI.Graphics();
  app.stage.addChild(thing);
  thing.position.set(app.screen.width / 2, app.screen.height / 2);
  thing.lineStyle(0);

  container.mask = thing;

  let count = 0;

  app.stage.on('pointertap', () => {
    if (!container.mask) {
      container.mask = thing;
    } else {
      container.mask = null;
    }
  });

  const help = new PIXI.Text('Click or tap to turn masking on / off.', {
    fontFamily: 'Arial',
    fontSize: 12,
    fontWeight: 'bold',
    fill: 'white',
  });
  help.position.set(10, app.screen.height - 26);
  app.stage.addChild(help);

  app.ticker.add(() => {
    bg.rotation += 0.01;
    bgFront.rotation -= 0.01;

    light1.rotation += 0.02;
    light2.rotation += 0.01;

    panda.scale.x = 1 + Math.sin(count) * 0.04;
    panda.scale.y = 1 + Math.cos(count) * 0.04;

    count += 0.1;

    thing.clear();

    thing.beginFill(0x8bc5ff, 0.4);
    thing.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);
    thing.lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20);
    thing.lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count) * 20);
    thing.lineTo(-120 + Math.cos(count) * 20, 100 + Math.sin(count) * 20);
    thing.rotation = count * 0.1;
  });
}
