import Stats from 'stats.js';

export default (function () {
  interface Square extends PIXI.Sprite {
    acceleration: PIXI.Point;
    mass: number;
  }

  const app = new PIXI.Application({
    backgroundColor: 0x111111,
  });
  document.body.appendChild(app.view);

  const stats = new Stats();
  document.body.appendChild(stats.dom);

  const movementSpeed = 0.05;
  const impulsePower = 5;

  function testForAABB(object1: PIXI.Sprite, object2: PIXI.Sprite): boolean {
    const bounds1 = object1.getBounds();
    const bounds2 = object2.getBounds();

    return (
      bounds1.x < bounds2.x + bounds2.width &&
      bounds1.x + bounds1.width > bounds2.x &&
      bounds1.y < bounds2.y + bounds2.height &&
      bounds1.y + bounds1.height > bounds2.y
    );
  }

  function collisionResponse(object1: Square, object2: Square): PIXI.Point {
    if (!object1 || !object2) {
      return new PIXI.Point(0, 0);
    }

    const vCollision = new PIXI.Point(
      object2.x - object1.x,
      object2.y - object1.y
    );
    const distance = Math.sqrt(
      (object2.x - object1.x) * (object2.x - object1.x) +
        (object2.y - object1.y) * (object2.y - object1.y)
    );
    const vCollisionNorm = new PIXI.Point(
      vCollision.x / distance,
      vCollision.y / distance
    );
    const vRelativeVelocity = new PIXI.Point(
      object1.acceleration.x - object2.acceleration.x,
      object1.acceleration.y - object2.acceleration.y
    );
    const speed =
      vRelativeVelocity.x * vCollisionNorm.x +
      vRelativeVelocity.y * vCollisionNorm.y;
    const impulse = (impulsePower * speed) / (object1.mass + object2.mass);

    return new PIXI.Point(
      impulse * vCollisionNorm.x,
      impulse * vCollisionNorm.y
    );
  }

  function distanceBetweenTwoPoints(p1: PIXI.Point, p2: PIXI.Point) {
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;
    return Math.hypot(a, b);
  }

  const greenSquare = new PIXI.Sprite(PIXI.Texture.WHITE) as Square;
  greenSquare.position.set(
    (app.screen.width - 100) / 2,
    (app.screen.height - 100) / 2
  );
  greenSquare.width = 100;
  greenSquare.height = 100;
  greenSquare.tint = 0x00ff00;
  greenSquare.acceleration = new PIXI.Point(0);
  greenSquare.mass = 3;

  const redSquare = new PIXI.Sprite(PIXI.Texture.WHITE) as Square;
  redSquare.position.set(0, 0);
  redSquare.width = redSquare.height = 100;
  redSquare.tint = 0xff0000;
  redSquare.acceleration = new PIXI.Point(0);
  redSquare.mass = 1;

  app.ticker.add((delta) => {
    stats.update();
    redSquare.acceleration.set(
      redSquare.acceleration.x * 0.99,
      redSquare.acceleration.y * 0.99
    );
    greenSquare.acceleration.set(
      greenSquare.acceleration.x * 0.99,
      greenSquare.acceleration.y * 0.99
    );

    const mouseCoords = app.renderer.plugins.interaction.mouse.global;

    if (greenSquare.x < 0 || greenSquare.x > app.screen.width - 100) {
      greenSquare.acceleration.x = -greenSquare.acceleration.x;
    }
    if (greenSquare.y < 0 || greenSquare.y > app.screen.height - 100) {
      greenSquare.acceleration.y = -greenSquare.acceleration.y;
    }

    if (
      app.screen.width > mouseCoords.x ||
      mouseCoords.x > 0 ||
      app.screen.height > mouseCoords.y ||
      mouseCoords.y > 0
    ) {
      const redSquareCenterPosition = new PIXI.Point(
        redSquare.x + redSquare.width * 0.5,
        redSquare.y + redSquare.height * 0.5
      );
      const toMouseDirection = new PIXI.Point(
        mouseCoords.x - redSquareCenterPosition.x,
        mouseCoords.y - redSquareCenterPosition.y
      );
      const angleToMouse = Math.atan2(toMouseDirection.y, toMouseDirection.x);

      const distMouseRedSquare = distanceBetweenTwoPoints(
        mouseCoords,
        redSquareCenterPosition
      );
      const redSpeed = distMouseRedSquare * movementSpeed;

      redSquare.acceleration.set(
        Math.cos(angleToMouse) * redSpeed,
        Math.sin(angleToMouse) * redSpeed
      );
      if (testForAABB(greenSquare, redSquare)) {
        const collisionPush = collisionResponse(greenSquare, redSquare);
        redSquare.acceleration.set(
          collisionPush.x * greenSquare.mass,
          collisionPush.y * greenSquare.mass
        );
        greenSquare.acceleration.set(
          -(collisionPush.x * redSquare.mass),
          -(collisionPush.y * redSquare.mass)
        );
      }
      greenSquare.x += greenSquare.acceleration.x * delta;
      greenSquare.y += greenSquare.acceleration.y * delta;

      redSquare.x += redSquare.acceleration.x * delta;
      redSquare.y += redSquare.acceleration.y * delta;
    }

    app.stage.addChild(redSquare, greenSquare);
  });
});
