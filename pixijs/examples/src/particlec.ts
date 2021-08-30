/// <reference path="../../node_modules/pixi.js/pixi.js.d.ts"/>

import Stats from 'stats.js';

export default (function () {
  class Dude extends PIXI.Sprite {
    direction: number;
    turningSpeed: number;
    speed: number;
    offset: number;
  }

  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  const stats = new Stats();
  document.body.appendChild(stats.dom);

  const sprites = new PIXI.ParticleContainer(10000, {
    // scale: true,
    position: true,
    rotation: true,
    uvs: true,
    // alpha: true,
  });

  app.stage.addChild(sprites);

  const maggots: Dude[] = [];

  const totalSprites = app.renderer instanceof PIXI.Renderer ? 10000 : 100;
  for (let i = 0; i < totalSprites; i++) {
    const dude = PIXI.Sprite.from('../maggot_tiny.png') as Dude;
    // dude.tint = Math.random() * 0xe8d4cd;
    dude.anchor.set(0.5);
    dude.scale.set(0.8 + Math.random() * 0.3);
    dude.x = Math.random() * app.screen.width;
    dude.y = Math.random() * app.screen.height;
    dude.tint = Math.random() * 0x808080;

    dude.direction = Math.random() * Math.PI * 2;
    dude.turningSpeed = Math.random() - 0.8;
    dude.speed = (2 + Math.random() * 2) * 0.2;
    dude.offset = Math.random() * 100;

    maggots.push(dude);
    sprites.addChild(dude);
  }

  const padding = 100;
  const bounds = new PIXI.Rectangle(
    -padding,
    -padding,
    app.screen.width + padding * 2,
    app.screen.height + padding * 2
  );

  let tick = 0;
  app.ticker.add(() => {
    stats.update();
    maggots.forEach((dude) => {
      dude.scale.y = 0.95 + Math.sin(tick * dude.offset) * 0.05;
      dude.direction += dude.turningSpeed * 0.001;
      dude.x += Math.sin(dude.direction) * (dude.speed * dude.scale.y);
      dude.y += Math.cos(dude.direction) * (dude.speed * dude.scale.y);
      dude.rotation = -dude.direction + Math.PI;

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
    tick += 0.1;
  });
});
