export default function () {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  const background = PIXI.Sprite.from('./bg_button.jpg');
  background.width = app.screen.width;
  background.height = app.screen.height;

  app.stage.addChild(background);

  const textureButton = PIXI.Texture.from('./button.png');
  const textureButtonDown = PIXI.Texture.from('./button_down.png');
  const textureButtonOver = PIXI.Texture.from('./button_over.png');

  const buttons: PIXI.Sprite[] = [];

  const buttonPositions = [175, 75, 655, 75, 410, 325, 150, 465, 685, 445];

  for (let i = 0; i < 5; i++) {
    const button = new PIXI.Sprite(textureButton);

    button.anchor.set(0.5);
    button.x = buttonPositions[i * 2];
    button.y = buttonPositions[i * 2 + 1];

    button.interactive = true;
    button.buttonMode = true;

    button
      .on('pointerdown', onButtonDown)
      .on('pointerup', onButtonUp)
      .on('pointerupoutside', onButtonUp)
      .on('pointerover', onButtonOver)
      .on('pointerout', onButtonOut);

    app.stage.addChild(button);

    buttons.push(button);
  }

  buttons[0].scale.set(1.2);
  buttons[2].rotation = Math.PI / 10;
  buttons[3].scale.set(0.8);
  buttons[4].scale.set(0.8, 1.2);
  buttons[4].rotation = Math.PI;

  function onButtonDown() {
    this.isdown = true;
    this.texture = textureButtonDown;
    this.alpha = 1;
  }
  function onButtonUp() {
    this.isdown = false;
    if (this.isOver) {
      this.texture = textureButtonOver;
    } else {
      this.texture = textureButton;
    }
  }
  function onButtonOver() {
    this.isOver = true;
    if (this.isdown) {
      return;
    }
    this.texture = textureButtonOver;
  }
  function onButtonOut() {
    this.isOver = false;
    if (this.isdown) {
      return;
    }
    this.texture = textureButton;
  }
}
