const app = new PIXI.Application({
  width: 256,
  height: 256,
});

document.body.appendChild(app.view);

PIXI.loader.add('cat', './cat.png').load(() => {
  const cat1 = new PIXI.Sprite(PIXI.loader.resources.cat.texture);
  app.stage.addChild(cat1);
  cat1.anchor.set(0.5, 0.5);
  cat1.rotation = 0.5;
  cat1.position.set(32, 32);

  const cat2 = new PIXI.Sprite(PIXI.loader.resources.cat.texture);
  app.stage.addChild(cat2);
  cat2.pivot.set(32, 32);
  cat2.position.set(32, 96);
  cat2.rotation = -0.5;
});
