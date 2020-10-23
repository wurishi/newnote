const app = new PIXI.Application();

document.body.appendChild(app.view);

PIXI.loader.add('./cat.png').load(setup);

function setup() {
  const sprite = new PIXI.Sprite(PIXI.loader.resources['./cat.png'].texture);

  app.stage.addChild(sprite);
}
