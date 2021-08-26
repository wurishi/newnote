const Application = PIXI.Application,
  loader = PIXI.loader,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Rectangle = PIXI.Rectangle,
  resources = PIXI.loader.resources;

const app = new Application({
  width: 512,
  height: 512,
});

document.body.appendChild(app.view);

loader.add('./cat.png').load(setup);

let cat: any;
function setup() {
  cat = new Sprite(TextureCache['./cat.png']);
  cat.y = 96;
  cat.vx = 0;
  cat.vy = 0;
  app.stage.addChild(cat);

  app.ticker.add((delta) => gameLoop(delta));
}

function gameLoop(delta: number) {
  // 设置速度
  cat.vx = 1;
  cat.vy = 1;

  cat.x += cat.vx;
  cat.y += cat.vy;
}
