const app = new PIXI.Application({
  width: 256,
  height: 256,
  antialias: true,
  transparent: false,
  resolution: 1,
});

document.body.appendChild(app.view);

PIXI.loader.add('./cat.png').load(setup);

function setup() {
  const cat = new PIXI.Sprite(PIXI.loader.resources['./cat.png'].texture);

  app.stage.addChild(cat);
}
