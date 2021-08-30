import Stats from 'stats.js';

export default (function () {
  const stats = new Stats();
  document.body.appendChild(stats.dom);

  const app = new PIXI.Application({
    backgroundColor: 0x1099bb,
  });
  document.body.appendChild(app.view);

  function intersect(
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ) {
    if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
      return false;
    }

    const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (denominator === 0) {
      return false;
    }

    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;
    if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
      return false;
    }

    const x = x1 + ua * (x2 - x1);
    const y = y1 + ua * (y2 - y1);
    return { x, y };
  }

  const generateSpinner1 = (position: PIXI.Point) => {
    const container = new PIXI.Container();
    container.position = position;
    app.stage.addChild(container);

    const base = PIXI.Sprite.from('../bg_scene_rotate.jpg');
    const size = 100;
    base.width = base.height = size;

    const bottom = PIXI.Sprite.from('../bg_rotate.jpg');
    bottom.width = bottom.height = size;

    const mask = new PIXI.Graphics();
    mask.position.set(size / 2, size / 2);
    base.mask = mask;

    container.addChild(bottom);
    container.addChild(base);
    container.addChild(mask);

    let phase = 0;
    return (delta: number) => {
      phase += delta / 60;
      phase %= Math.PI * 2;

      const x = Math.cos(phase - Math.PI / 2) * size;
      const y = Math.sin(phase - Math.PI / 2) * size;

      const segments = [
        [-size / 2, -size / 2, size / 2, -size / 2],
        [size / 2, -size / 2, size / 2, size / 2],
        [-size / 2, size / 2, size / 2, size / 2],
        [-size / 2, -size / 2, -size / 2, size / 2],
      ];

      let intersection = null;
      let winding = 0;
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const hit = intersect(
          0,
          0,
          x,
          y,
          segment[0],
          segment[1],
          segment[2],
          segment[3]
        );
        if (hit) {
          intersection = hit;
          if (i === 0) winding = hit.x > 0 ? 0 : 4;
          else winding = i;
          break;
        }
      }
      const corners = [
        size / 2,
        -size / 2,
        size / 2,
        size / 2,
        -size / 2,
        size / 2,
        -size / 2,
        -size / 2,
        0,
        -size / 2,
      ];
      mask.clear();
      mask.lineStyle(2, 0xff0000, 1);
      mask.beginFill(0xff0000, 1);
      mask.moveTo(0, -size / 2);
      mask.lineTo(0, 0);
      mask.lineTo(intersection.x, intersection.y);

      for (let i = winding; i < corners.length / 2; i++) {
        mask.lineTo(corners[i * 2], corners[i * 2 + 1]);
      }
      mask.endFill();
    };
  };

  const generateSpinner2 = (position: PIXI.Point) => {
    const container = new PIXI.Container();
    container.position = position;
    app.stage.addChild(container);

    const size = 100;
    const ballAmount = 7;
    const balls: PIXI.Sprite[] = [];
    for (let i = 0; i < ballAmount; i++) {
      const ball = PIXI.Sprite.from('../circle.png');
      ball.anchor.set(0.5);
      container.addChild(ball);
      ball.position.set(
        size / 2 + (Math.cos((i / ballAmount) * Math.PI * 2) * size) / 3,
        size / 2 + (Math.sin((i / ballAmount) * Math.PI * 2) * size) / 3
      );
      balls.push(ball);
    }
    let phase = 0;
    return (delta: number) => {
      phase += delta / 60;
      phase %= Math.PI * 2;

      balls.forEach((b, i) => {
        const sin = Math.sin((i / ballAmount) * Math.PI - phase);
        b.scale.set(Math.abs(sin * sin * sin * 0.5));
      });
    };
  };

  const generateSpinner3 = (position: PIXI.Point) => {
    const container = new PIXI.Container();
    container.position = position;
    app.stage.addChild(container);

    const base = PIXI.Sprite.from('../bg_scene_rotate.jpg');
    const size = 100;
    base.width = base.height = size;

    const mask = new PIXI.Graphics();
    mask.position.set(size / 2, size / 2);
    base.mask = mask;

    container.addChild(base);
    container.addChild(mask);

    let phase = 0;
    return (delta: number) => {
      phase += delta / 60;
      phase %= Math.PI * 2;

      const angleStart = 0 - Math.PI / 2;
      const angle = phase + angleStart;
      const radius = 50;

      const x1 = Math.cos(angleStart) * radius;
      const y1 = Math.sin(angleStart) * radius;

      mask.clear();
      mask.lineStyle(2, 0xff0000, 1);
      mask.beginFill(0xff0000, 1);
      mask.moveTo(0, 0);
      mask.lineTo(x1, y1);
      mask.arc(0, 0, radius, angleStart, angle, false);
      mask.lineTo(0, 0);
      mask.endFill();
    };
  };

  const generateSpinner4 = (position: PIXI.Point) => {
    const container = new PIXI.Container();
    container.position = position;
    app.stage.addChild(container);

    const size = 100;
    const arcRadius = 15;
    const base = PIXI.Sprite.from('../bg_scene_rotate.jpg');
    base.width = base.height = size;

    const roundingMask = new PIXI.Graphics();
    roundingMask.beginFill(0, 1);
    roundingMask.lineStyle(1, 0xff0000, 1);
    roundingMask.moveTo(arcRadius, 0);
    roundingMask.lineTo(size - arcRadius, 0);
    roundingMask.arc(
      size - arcRadius,
      arcRadius,
      arcRadius,
      -Math.PI / 2,
      0,
      false
    );
    roundingMask.lineTo(size, size - arcRadius);
    roundingMask.arc(
      size - arcRadius,
      size - arcRadius,
      arcRadius,
      0,
      Math.PI / 2,
      false
    );
    roundingMask.lineTo(arcRadius, size);
    roundingMask.arc(
      arcRadius,
      size - arcRadius,
      arcRadius,
      Math.PI / 2,
      Math.PI,
      false
    );
    roundingMask.lineTo(0, arcRadius);
    roundingMask.arc(
      arcRadius,
      arcRadius,
      arcRadius,
      Math.PI,
      (Math.PI / 2) * 3,
      false
    );
    roundingMask.endFill();
    base.mask = roundingMask;

    const lineSize = 5;
    const edge = new PIXI.Graphics();
    edge.lineStyle(lineSize, 0xff0000, 1);
    edge.moveTo(arcRadius, 0);
    edge.lineTo(size - arcRadius, 0);
    edge.arc(size - arcRadius, arcRadius, arcRadius, -Math.PI / 2, 0, false);
    edge.lineTo(size, size - arcRadius);
    edge.arc(
      size - arcRadius,
      size - arcRadius,
      arcRadius,
      0,
      Math.PI / 2,
      false
    );
    edge.lineTo(arcRadius, size);
    edge.arc(
      arcRadius,
      size - arcRadius,
      arcRadius,
      Math.PI / 2,
      Math.PI,
      false
    );
    edge.lineTo(0, arcRadius);
    edge.arc(
      arcRadius,
      arcRadius,
      arcRadius,
      Math.PI,
      (Math.PI / 2) * 3,
      false
    );
    edge.endFill();

    const mask = new PIXI.Graphics();
    mask.position.set(size / 2, size / 2);
    edge.mask = mask;

    container.addChild(base);
    container.addChild(roundingMask);
    container.addChild(edge);
    container.addChild(mask);

    let phase = 0;

    return (delta: number) => {
      phase += delta / 160;
      phase %= Math.PI * 2;

      // Calculate target point.
      const x = Math.cos(phase - Math.PI / 2) * size;
      const y = Math.sin(phase - Math.PI / 2) * size;
      // Line segments
      const segments = [
        [
          -size / 2 + lineSize,
          -size / 2 + lineSize,
          size / 2 - lineSize,
          -size / 2 + lineSize,
        ], // top segment
        [
          size / 2 - lineSize,
          -size / 2 + lineSize,
          size / 2 - lineSize,
          size / 2 - lineSize,
        ], // right
        [
          -size / 2 + lineSize,
          size / 2 - lineSize,
          size / 2 - lineSize,
          size / 2 - lineSize,
        ], // bottom
        [
          -size / 2 + lineSize,
          -size / 2 + lineSize,
          -size / 2 + lineSize,
          size / 2 - lineSize,
        ], // left
      ];
      // To which dir should mask continue at each segment
      let outDir:any = [
        [0, -1],
        [1, 0],
        [0, 1],
        [-1, 0],
      ];

      // Find the intersecting segment.
      let intersection = null;
      let winding = 0;
      // What direction should the line continue after hit has been found before hitting the line size
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const hit = intersect(
          0,
          0,
          x,
          y,
          segment[0],
          segment[1],
          segment[2],
          segment[3]
        );
        if (hit) {
          intersection = hit;
          if (i === 0) winding = hit.x < 0 ? 0 : 4;
          else winding = 4 - i;
          outDir = outDir[i];
          break;
        }
      }

      const corners = [
        -size / 2 - lineSize,
        -size / 2 - lineSize, // Top left,
        -size / 2 - lineSize,
        size / 2 + lineSize, // Bottom left
        size / 2 + lineSize,
        size / 2 + lineSize, // Bottom right
        size / 2 + lineSize,
        -size / 2 - lineSize, // Top right
      ];

      // Redraw mask
      mask.clear();
      mask.lineStyle(2, 0x00ff00, 1);
      mask.beginFill(0xff0000, 1);

      mask.moveTo(0, 0);
      mask.moveTo(0, -size / 2 - lineSize);

      // fill the corners
      for (let i = 0; i < winding; i++) {
        mask.lineTo(corners[i * 2], corners[i * 2 + 1]);
      }

      mask.lineTo(
        intersection.x + outDir[0] * lineSize * 2,
        intersection.y + outDir[1] * lineSize * 2
      );
      mask.lineTo(intersection.x, intersection.y);
      mask.lineTo(0, 0);

      mask.endFill();
    };
  };

  const onTick = [
    generateSpinner1(new PIXI.Point(50, 50)), //
    generateSpinner2(new PIXI.Point(160, 50)),
    generateSpinner3(new PIXI.Point(270, 50)),
    generateSpinner4(new PIXI.Point(380, 50)),
  ];

  app.ticker.add((delta) => {
    stats.update();
    onTick.forEach((cb) => {
      cb(delta);
    });
  });
});
