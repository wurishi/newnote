const Application = PIXI.Application,
  loader = PIXI.loader,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Rectangle = PIXI.Rectangle;

const app = new Application({
  width: 256,
  height: 256,
});

document.body.appendChild(app.view);

loader.add('./tileset.png').load(setup);

function setup() {
  const texture = TextureCache['./tileset.png'];

  const rectangle = new Rectangle(32 * 3, 32 * 2, 32, 32);

  texture.frame = rectangle;

  const rocket = new Sprite(texture);

  rocket.position.set(32, 32);

  app.stage.addChild(rocket);
}
