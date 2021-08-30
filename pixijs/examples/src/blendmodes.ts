import Stats from 'stats.js';

export default (function () {
  class Dude extends PIXI.Sprite {
    direction: number;
    turningSpeed: number;
    speed: number;
  }

  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  const stats = new Stats();
  document.body.appendChild(stats.dom);

  const background = PIXI.Sprite.from('../bg_rotate.jpg');
  background.width = app.screen.width;
  background.height = app.screen.height;
  app.stage.addChild(background);

  const dudeArray: Dude[] = [];
  const totalDudes = 20;

  for (let i = 0; i < totalDudes; i++) {
    const dude = PIXI.Sprite.from('../flowerTop.png') as Dude;
    dude.anchor.set(0.5);
    dude.scale.set(0.8 + Math.random() * 0.3);
    dude.x = Math.floor(Math.random() * app.screen.width);
    dude.y = Math.floor(Math.random() * app.screen.height);

    dude.blendMode = PIXI.BLEND_MODES.ADD;

    dude.direction = Math.random() * Math.PI * 2;
    dude.turningSpeed = Math.random() - 0.8;
    dude.speed = 2 + Math.random() * 2;

    dudeArray.push(dude);
    app.stage.addChild(dude);
  }

  const padding = 100;
  const bounds = new PIXI.Rectangle(
    -padding,
    -padding,
    app.screen.width + padding * 2,
    app.screen.height + padding * 2
  );

  app.ticker.add(() => {
    stats.update();
    dudeArray.forEach((dude) => {
      dude.direction += dude.turningSpeed * 0.01;
      dude.x += Math.sin(dude.direction) * dude.speed;
      dude.y += Math.cos(dude.direction) * dude.speed;
      dude.rotation = -dude.direction - Math.PI / 2;

      if (dude.x < bounds.x) {
        dude.x += bounds.width;
      } else if (dude.x > bounds.x + bounds.width) {
        dude.x -= bounds.width;
      }

      if (dude.y < bounds.y) {
        dude.y += bounds.height;
      } else if (dude.y > bounds.y + bounds.height) {
        dude.y -= bounds.height;
      }
    });
  });
});
