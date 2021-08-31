export default function () {
  const app = new PIXI.Application({ backgroundColor: 0x1099bb });
  document.body.appendChild(app.view);

  const defaultIcon = 'url("./bunny.png"),auto';
  const hoverIcon = 'url("./bunny_saturated.png"),auto';

  app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;
  app.renderer.plugins.interaction.cursorStyles.hover = hoverIcon;

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
    button.cursor = 'hover';

    button.anchor.set(0.5);
    button.position.set(buttonPositions[i * 2], buttonPositions[i * 2 + 1]);

    button.interactive = true;

    app.stage.addChild(button);

    buttons.push(button);
  }

  buttons[0].scale.set(1.2);
  buttons[2].rotation = Math.PI / 10;
  buttons[3].scale.set(0.8);
  buttons[4].scale.set(0.8, 1.2);
  buttons[4].rotation = Math.PI;
}
