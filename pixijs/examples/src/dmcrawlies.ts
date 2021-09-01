export default function () {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  app.stage.interactive = true;

  const container = new PIXI.Container();
  app.stage.addChild(container);

  const padding = 100;
  const bounds = new PIXI.Rectangle(
    -padding,
    -padding,
    app.screen.width + padding * 2,
    app.screen.height + padding * 2
  );
  type mType = PIXI.Sprite & {
    direction: number;
    speed: number;
    turnSpeed: number;
    original: PIXI.Point;
  };
  const maggots: mType[] = [];

  for (let i = 0; i < 20; i++) {
    const maggot = PIXI.Sprite.from('maggot.png') as mType;
    maggot.anchor.set(0.5);
    container.addChild(maggot);

    maggot.direction = Math.random() * Math.PI * 2;
    maggot.speed = 1;
    maggot.turnSpeed = Math.random() - 0.8;

    maggot.x = Math.random() * bounds.width;
    maggot.y = Math.random() * bounds.height;

    maggot.scale.set(1 + Math.random() * 0.3);
    maggot.original = new PIXI.Point();
    maggot.original.copyFrom(maggot.scale);
    maggots.push(maggot);
  }

  const displacementSprite = PIXI.Sprite.from('displace.png');
  const displacementFilter = new PIXI.filters.DisplacementFilter(
    displacementSprite
  );

  app.stage.addChild(displacementSprite);

  container.filters = [displacementFilter];

  displacementFilter.scale.set(110, 110);
  displacementSprite.anchor.set(0.5);

  const ring = PIXI.Sprite.from('ring.png');
  ring.anchor.set(0.5);
  ring.visible = false;

  app.stage.addChild(ring);

  const bg = PIXI.Sprite.from('bg_grass.jpg');
  bg.width = app.screen.width;
  bg.height = app.screen.height;
  bg.alpha = 0.4;

  container.addChild(bg);

  app.stage
    .on('mousemove', onPointerMove) //
    .on('touchmove', onPointerMove);

  function onPointerMove(event: PIXI.InteractionEvent) {
    ring.visible = true;

    displacementSprite.position.set(
      event.data.global.x - 25,
      event.data.global.y
    );
    ring.position.copyFrom(displacementSprite.position);
  }

  let count = 0;

  app.ticker.add(() => {
    count += 0.05;

    for (let i = 0; i < maggots.length; i++) {
      const maggot = maggots[i];

      maggot.direction += maggot.turnSpeed * 0.01;
      maggot.x += Math.sin(maggot.direction) * maggot.speed;
      maggot.y += Math.cos(maggot.direction) * maggot.speed;

      maggot.rotation = -maggot.direction - Math.PI / 2;
      maggot.scale.x = maggot.original.x + Math.sin(count) * 0.2;

      if (maggot.x < bounds.x) {
        maggot.x += bounds.width;
      } else if (maggot.x > bounds.x + bounds.width) {
        maggot.x -= bounds.width;
      }

      if (maggot.y < bounds.y) {
        maggot.y += bounds.height;
      } else if (maggot.y > bounds.y + bounds.height) {
        maggot.y -= bounds.height;
      }
    }
  });
}
