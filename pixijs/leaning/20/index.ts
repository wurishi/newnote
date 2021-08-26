const Application = PIXI.Application,
  loader = PIXI.loader,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Rectangle = PIXI.Rectangle,
  resources = PIXI.loader.resources,
  Graphics = PIXI.Graphics,
  TextStyle = PIXI.TextStyle;

const app = new Application({
  width: 512,
  height: 512,
});

document.body.appendChild(app.view);

(function () {
  const style = new TextStyle({
    fontFamily: 'Arial',
    fontSize: 36,
    fill: 'white',
    stroke: '#ff3300',
    strokeThickness: 4,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 4,
    dropShadowAngle: Math.PI / 6,
    dropShadowDistance: 6,
  });

  const message = new PIXI.Text('Hello Pixi!', style);
  app.stage.addChild(message);
})();
