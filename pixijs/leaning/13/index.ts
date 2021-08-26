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

loader.add('./treasureHunter.json').load(setup);

let dungeon, explorer, treasure, id, door;
function setup() {
  // 1. 使用 TextureCache
  const dungeonTexture = TextureCache['dungeon.png'];
  dungeon = new Sprite(dungeonTexture);
  app.stage.addChild(dungeon);

  // 2. 使用 loader.resources
  explorer = new Sprite(
    resources['./treasureHunter.json'].textures['explorer.png']
  );
  explorer.x = 68;
  explorer.y = app.stage.height / 2 - explorer.height / 2;
  app.stage.addChild(explorer);

  // 3. 使用 id 别名
  id = resources['./treasureHunter.json'].textures;
  treasure = new Sprite(id['treasure.png']);

  treasure.x = app.stage.width - treasure.width - 48;
  treasure.y = app.stage.height / 2 - treasure.height / 2;
  app.stage.addChild(treasure);

  // 额外追加
  door = new Sprite(id['door.png']);
  door.position.set(32, 0);
  app.stage.addChild(door);

  const numberOfBlobs = 6,
    spacing = 48,
    xOffset = 150;

  for (let i = 0; i < numberOfBlobs; i++) {
    const blob = new Sprite(id['blob.png']);
    const x = spacing * i + xOffset;
    const y = randomInt(0, app.stage.height - blob.height);
    blob.position.set(x, y);
    app.stage.addChild(blob);
  }
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
