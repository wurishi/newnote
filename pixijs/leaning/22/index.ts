const Application = PIXI.Application,
  loader = PIXI.loader,
  TextureCache = PIXI.utils.TextureCache,
  Sprite = PIXI.Sprite,
  Rectangle = PIXI.Rectangle,
  resources = PIXI.loader.resources,
  Graphics = PIXI.Graphics,
  TextStyle = PIXI.TextStyle,
  Container = PIXI.Container;

const app = new Application({
  width: 512,
  height: 512,
});

document.body.appendChild(app.view);

loader.add('./treasureHunter.json').load(setup);

let state: any;
let gameScene: PIXI.Container, gameOverScene: PIXI.Container;
let id;
let dungeon: PIXI.Sprite,
  door: PIXI.Sprite,
  explorer: PIXI.Sprite & { vx: number; vy: number },
  treasure: PIXI.Sprite;
let blobs: (PIXI.Sprite & { vy: number })[];
let healthBar: PIXI.Container & { outer: PIXI.Graphics };
let message: PIXI.Text;
function setup() {
  // 创建 gameScene
  gameScene = new Container();
  app.stage.addChild(gameScene);

  id = resources['./treasureHunter.json'].textures;

  dungeon = new Sprite(id['dungeon.png']);
  gameScene.addChild(dungeon);
  // 创建 door
  door = new Sprite(id['door.png']);
  door.position.set(32, 0);
  gameScene.addChild(door);
  // 创建 player
  explorer = new Sprite(id['explorer.png']) as any;
  explorer.x = 68;
  explorer.y = gameScene.height / 2 - explorer.height / 2;
  explorer.vx = 0;
  explorer.vy = 0;
  gameScene.addChild(explorer);
  // 创建 treasure
  treasure = new Sprite(id['treasure.png']);
  treasure.x = gameScene.width - treasure.width - 48;
  treasure.y = gameScene.height / 2 - treasure.height / 2;
  gameScene.addChild(treasure);
  // 创建 enemies
  let numberOfBlobs = 6,
    spacing = 48,
    xOffset = 150,
    speed = 2,
    direction = 1;
  blobs = [];

  for (let i = 0; i < numberOfBlobs; i++) {
    const blob = new Sprite(id['blob.png']);
    const x = spacing * i + xOffset;
    const y = randomInt(0, app.stage.height - blob.height);
    blob.x = x;
    blob.y = y;
    (blob as any).vy = speed * direction;
    direction *= -1;
    blobs.push(blob as any);
    gameScene.addChild(blob);
  }

  // 创建 health bar
  healthBar = new PIXI.Container() as any;
  healthBar.position.set(app.stage.width - 170, 4);
  gameScene.addChild(healthBar);

  const innerBar = new Graphics();
  innerBar.beginFill(0x000000);
  innerBar.drawRect(0, 0, 128, 8);
  innerBar.endFill();
  healthBar.addChild(innerBar);

  const outerBar = new Graphics();
  outerBar.beginFill(0xff3300);
  outerBar.drawRect(0, 0, 128, 8);
  outerBar.endFill();
  healthBar.addChild(outerBar);

  healthBar.outer = outerBar;

  // 创建 gameOverScene
  gameOverScene = new Container();
  app.stage.addChild(gameOverScene);
  gameOverScene.visible = false;

  // 当游戏结束时显示文本信息
  const style = new TextStyle({
    fontFamily: 'Futura',
    fontSize: 64,
    fill: 'white',
  });
  message = new PIXI.Text('The End!', style);
  message.x = 120;
  message.y = app.stage.height / 2 - 32;
  gameOverScene.addChild(message);

  // 用键盘控制 player
  const left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

  left.press = () => {
    explorer.vx = -5;
    explorer.vy = 0;
  };
  left.release = () => {
    if (!right.isDown && explorer.vy === 0) {
      explorer.vx = 0;
    }
  };

  up.press = () => {
    explorer.vy = -5;
    explorer.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && explorer.vx === 0) {
      explorer.vy = 0;
    }
  };

  right.press = () => {
    explorer.vx = 5;
    explorer.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && explorer.vy === 0) {
      explorer.vx = 0;
    }
  };

  down.press = () => {
    explorer.vy = 5;
    explorer.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && explorer.vx === 0) {
      explorer.vy = 0;
    }
  };

  state = play;

  app.ticker.add((delta) => gameLoop(delta));
}

function gameLoop(delta: number) {
  state(delta);
}

function play(delta: number) {
  let explorerHit = false;
  // 移动猎人
  explorer.x += explorer.vx;
  explorer.y += explorer.vy;

  // 移动泡泡怪们
  // 碰撞检测泡泡怪和猎人
  blobs.forEach((blob) => {
    blob.y += blob.vy;

    const blobHitsWall = contain(blob, {
      x: 28,
      y: 10,
      width: 488,
      height: 480,
    });
    if (blobHitsWall === 'top' || blobHitsWall === 'bottom') {
      blob.vy *= -1;
    }
    if (hitTestRectangle(explorer, blob)) {
      explorerHit = true;
    }
  });
  if (explorerHit) {
    explorer.alpha = 0.5;
    healthBar.outer.width -= 1;
  } else {
    explorer.alpha = 1;
  }
  // 碰撞检测猎人和宝箱
  if (hitTestRectangle(explorer, treasure)) {
    treasure.x = explorer.x + 8;
    treasure.y = explorer.y + 8;
  }
  // 碰撞检测宝箱和门
  if (hitTestRectangle(treasure, door)) {
    state = end;
    message.text = 'You won!';
  }
  // 判断游戏是否成功或失败
  if (healthBar.outer.width < 0) {
    state = end;
    message.text = 'You lost!';
  }

  // 当游戏结果时将 state 设置为 end
}

function end() {
  gameScene.visible = false;
  gameOverScene.visible = true;
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function contain(
  sprite: PIXI.Sprite,
  container: { x: number; y: number; width: number; height: number }
): string {
  let collision: string = undefined;

  // left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = 'left';
  }

  // top
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = 'top';
  }

  // right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision = 'right';
  }

  // bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision = 'bottom';
  }

  return collision;
}

function hitTestRectangle(r1: PIXI.Container, r2: PIXI.Container) {
  let hit: boolean,
    combinedHalfWidths: number,
    combinedHalfHeights: number,
    vx: number,
    vy: number;

  hit = false;

  const centerX_1 = r1.x + r1.width / 2;
  const centerY_1 = r1.y + r1.height / 2;
  const centerX_2 = r2.x + r2.width / 2;
  const centerY_2 = r2.y + r2.height / 2;

  const halfWidth_1 = r1.width / 2;
  const halfHeight_1 = r1.height / 2;
  const halfWidth_2 = r2.width / 2;
  const halfHeight_2 = r2.height / 2;

  vx = centerX_1 - centerX_2;
  vy = centerY_1 - centerY_2;

  combinedHalfWidths = halfWidth_1 + halfWidth_2;
  combinedHalfHeights = halfHeight_1 + halfHeight_2;

  if (Math.abs(vx) < combinedHalfWidths) {
    if (Math.abs(vy) < combinedHalfHeights) {
      hit = true;
    } else {
      hit = false;
    }
  } else {
    hit = false;
  }

  return hit;
}

function keyboard(keyCode: number) {
  const key = {
    code: keyCode,
    isDown: false,
    isUp: true,
    press: () => {},
    release: () => {},
    downHandler: (event: KeyboardEvent) => {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    },
    upHandler: (event: KeyboardEvent) => {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    },
  };

  window.addEventListener('keydown', key.downHandler, false);
  window.addEventListener('keyup', key.upHandler, false);
  return key;
}
