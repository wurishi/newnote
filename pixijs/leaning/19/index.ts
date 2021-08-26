const Application = PIXI.Application,
  loader = PIXI.loader,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Rectangle = PIXI.Rectangle,
  resources = PIXI.loader.resources,
  Graphics = PIXI.Graphics;

const app = new Application({
  width: 512,
  height: 512,
});

document.body.appendChild(app.view);

(function () {
  const rectangle = new Graphics();
  rectangle.lineStyle(4, 0xff3300, 1);
  rectangle.beginFill(0x66ccff);
  rectangle.drawRect(0, 0, 64, 64);
  rectangle.endFill();

  rectangle.x = 170;
  rectangle.y = 170;

  app.stage.addChild(rectangle);
})();

(function () {
  const circle = new Graphics();
  circle.beginFill(0x9966ff);
  circle.drawCircle(0, 0, 32);
  circle.endFill();
  circle.x = 170;
  circle.y = 170;
  app.stage.addChild(circle);
})();

(function () {
  const ellipse = new Graphics();
  ellipse.beginFill(0xffff00);
  ellipse.drawEllipse(0, 0, 50, 20);
  ellipse.endFill();
  ellipse.x = 180;
  ellipse.y = 130;
  app.stage.addChild(ellipse);
})();

(function () {
  const roundBox = new Graphics();
  roundBox.lineStyle(4, 0x99ccff, 1);
  roundBox.beginFill(0xff9933);
  roundBox.drawRoundedRect(0, 0, 84, 36, 10);
  roundBox.endFill();
  roundBox.x = 48;
  roundBox.y = 190;
  app.stage.addChild(roundBox);
})();

(function () {
  const line = new Graphics();
  line.lineStyle(4, 0xffffff, 1);
  line.moveTo(0, 0);
  line.lineTo(80, 50);
  line.x = 32;
  line.y = 32;
  app.stage.addChild(line);
})();

(function () {
  const triangle = new Graphics();
  triangle.beginFill(0x66ff33);
  triangle.drawPolygon([
    -32,
    64, //
    32,
    64, //
    0,
    0,
  ]);
  triangle.endFill();
  triangle.x = 180;
  triangle.y = 22;
  app.stage.addChild(triangle);
})();
