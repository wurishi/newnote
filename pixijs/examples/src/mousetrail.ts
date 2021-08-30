import Stats from 'stats.js';

export default (function () {
  const stats = new Stats();
  document.body.appendChild(stats.dom);

  const app = new PIXI.Application({
    backgroundColor: 0x1099bb,
  });
  document.body.appendChild(app.view);

  const trailTexture = PIXI.Texture.from('../trail.png');
  const historyX: number[] = [];
  const historyY: number[] = [];
  const historySize = 20;
  const ropeSize = 100;
  const points: PIXI.Point[] = [];

  for (let i = 0; i < historySize; i++) {
    historyX.push(0);
    historyY.push(0);
  }
  for (let i = 0; i < ropeSize; i++) {
    points.push(new PIXI.Point(0, 0));
  }

  const rope = new PIXI.SimpleRope(trailTexture, points);
  rope.blendMode = PIXI.BLEND_MODES.ADD;
  app.stage.addChild(rope);

  app.ticker.add((delta) => {
    stats.update();
    const mouseposition = app.renderer.plugins.interaction.mouse.global;

    historyX.pop();
    historyX.unshift(mouseposition.x);
    historyY.pop();
    historyY.unshift(mouseposition.y);

    for (let i = 0; i < ropeSize; i++) {
      const p = points[i];
      const ix = cubicInterpolation(historyX, (i / ropeSize) * historySize);
      const iy = cubicInterpolation(historyY, (i / ropeSize) * historySize);

      p.x = ix;
      p.y = iy;
    }
  });
});

function cubicInterpolation(array: number[], t: number, tangentFactor = 1) {
  const k = Math.floor(t);
  const m: number[] = [
    getTangent(k, tangentFactor, array),
    getTangent(k + 1, tangentFactor, array),
  ];
  const p = [clipInput(k, array), clipInput(k + 1, array)];
  t -= k;
  const t2 = t * t;
  const t3 = t * t2;
  return (
    (2 * t3 - 3 * t2 + 1) * p[0] +
    (t3 - 2 * t2 + t) * m[0] +
    (-2 * t3 + 3 * t2) * p[1] +
    (t3 - t2) * m[1]
  );
}

function getTangent(k: number, factor: number, array: number[]) {
  return (factor * (clipInput(k + 1, array) - clipInput(k - 1, array))) / 2;
}

function clipInput(k: number, arr: number[]) {
  if (k < 0) k = 0;
  if (k > arr.length - 1) k = arr.length - 1;
  return arr[k];
}
