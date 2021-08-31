export default function () {
  const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
  });
  document.body.appendChild(app.view);

  const yellowStar = PIXI.Texture.from('./yellowstar.png');

  const starButton1 = new PIXI.Sprite(yellowStar);

  starButton1.position.set(50, 200);

  starButton1.buttonMode = true;
  starButton1.interactive = true;

  regEvents(starButton1);

  const starButton2 = new PIXI.Sprite(yellowStar);
  starButton2.position.set(250, 200);

  starButton2.hitArea = new PIXI.Polygon([
    80, 0, 100, 50, 160, 55, 115, 95, 130, 150, 80, 120, 30, 150, 45, 95, 0, 55,
    60, 50,
  ]);
  starButton2.buttonMode = true;
  starButton2.interactive = true;

  regEvents(starButton2);

  const starButton3 = new PIXI.Sprite(yellowStar);
  starButton3.position.set(450, 200);
  starButton3.buttonMode = true;
  starButton3.interactive = true;

  const squareMask = new PIXI.Graphics()
    .beginFill(0xffffff)
    .drawRect(starButton3.x, starButton3.y, 75, 200)
    .endFill();
  starButton3.mask = squareMask;

  regEvents(starButton3);

  const starButton4 = new PIXI.Sprite(yellowStar);
  starButton4.position.set(600, 200);

  const squareMask2 = new PIXI.Graphics()
    .beginFill(0xffffff)
    .drawRect(starButton4.x, starButton4.y, 75, 200)
    .endFill();

  starButton4.mask = squareMask2;
  starButton4.hitArea = new PIXI.Polygon([
    80, 0, 100, 50, 160, 55, 115, 95, 130, 150, 80, 120, 30, 150, 45, 95, 0, 55,
    60, 50,
  ]);
  starButton4.buttonMode = true;
  starButton4.interactive = true;

  regEvents(starButton4);

  //

  const style = new PIXI.TextStyle({ fill: '#ffffff' });
  const text1 = new PIXI.Text('Standard', style);
  text1.position.set(starButton1.x + 25, starButton1.y + 170);

  const text2 = new PIXI.Text('Hit Area', style);
  text2.position.set(starButton2.x + 35, starButton2.y + 170);

  const text3 = new PIXI.Text('Mask', style);
  text3.position.set(starButton3.x + 10, starButton3.y + 170);

  const text4 = new PIXI.Text('Mask + Hit Area', style);
  text4.position.set(starButton4.x - 10, starButton4.y + 170);

  app.stage.addChild(
    starButton2,
    starButton1,
    starButton3, //
    starButton4,
    squareMask,
    squareMask2,
    text1,
    text2,
    text3,
    text4
  );

  function regEvents(object: PIXI.Sprite) {
    object.on('pointerdown', () => onClick(object));
    object.on('pointerover', () => onPointerOver(object));
    object.on('pointerout', () => onPointerOut(object));
  }

  function onClick(object: PIXI.Sprite) {
    object.tint = 0x333333;
  }
  function onPointerOver(object: PIXI.Sprite) {
    object.tint = 0x666666;
  }
  function onPointerOut(object: PIXI.Sprite) {
    object.tint = 0xffffff;
  }
}
