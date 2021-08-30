import Stats from 'stats.js';

export default (function () {
  interface STAR {
    sprite: PIXI.Sprite;
    x: number;
    y: number;
    z: number;
  }

  const stats = new Stats();
  document.body.appendChild(stats.dom);

  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  const starTexture = PIXI.Texture.from('../star.png');

  const starAmount = 1000;
  let cameraZ = 0;
  const fov = 20;
  const baseSpeed = 0.025;
  let speed = 0;
  let warpSpeed = 0;
  const starStretch = 5;
  const starBaseSize = 0.05;

  const stars: STAR[] = [];
  for (let i = 0; i < starAmount; i++) {
    const star: STAR = {
      sprite: new PIXI.Sprite(starTexture),
      x: 0,
      y: 0,
      z: 0,
    };
    star.sprite.anchor.x = 0.5;
    star.sprite.anchor.y = 0.7;
    randomizeStar(star, true);
    app.stage.addChild(star.sprite);
    stars.push(star);
  }

  function randomizeStar(star: STAR, initial: boolean = false) {
    star.z = initial
      ? Math.random() * 2000
      : cameraZ + Math.random() * 1000 + 2000;

    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 1;
    star.x = Math.cos(deg) * distance;
    star.y = Math.sin(deg) * distance;
  }

  setInterval(() => {
    warpSpeed = warpSpeed > 0 ? 0 : 1;
  }, 5000);

  app.ticker.add((delta) => {
    stats.update();
    speed += (warpSpeed - speed) / 20;
    cameraZ += delta * 10 * (speed + baseSpeed);
    const { width, height } = app.renderer.screen;
    for (let i = 0; i < starAmount; i++) {
      const star = stars[i];
      if (star.z < cameraZ) randomizeStar(star);
      const z = star.z - cameraZ;
      star.sprite.x = star.x * (fov / z) * width + width / 2;
      star.sprite.y = star.y * (fov / z) * width + height / 2;

      const dxCenter = star.sprite.x - width / 2;
      const dyCenter = star.sprite.y - height / 2;
      const distanceCenter = Math.sqrt(
        dxCenter * dxCenter + dyCenter * dyCenter
      );
      const distanceScale = Math.max(0, (2000 - z) / 2000);
      star.sprite.scale.x = distanceScale * starBaseSize;
      star.sprite.scale.y =
        distanceScale * starBaseSize +
        (distanceScale * speed * starStretch * distanceCenter) / width;
      star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
    }
  });
});
