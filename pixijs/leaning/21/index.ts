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

loader.add('./cat.png').load(setup);

type Cat = PIXI.Sprite & { vx: number; vy: number };

let cat: Cat, box: PIXI.Graphics, msg: PIXI.Text;
let state: any;
function setup() {
  cat = new Sprite(TextureCache['./cat.png']) as Cat;
  cat.vx = 0;
  cat.vy = 0;
  cat.position.set(100, 100);
  app.stage.addChild(cat);

  const left = keyboard(37),
    up = keyboard(38),
    right = keyboard(39),
    down = keyboard(40);

  left.press = () => {
    cat.vx = -5;
    cat.vy = 0;
  };
  left.release = () => {
    if (!right.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };

  up.press = () => {
    cat.vy = -5;
    cat.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };

  right.press = () => {
    cat.vx = 5;
    cat.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };

  down.press = () => {
    cat.vy = 5;
    cat.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };

  box = new Graphics();
  box.beginFill(0xccff99, 1);
  box.drawRect(0, 0, 64, 64);
  box.endFill();
  box.x = app.view.width / 2;
  box.y = app.view.height / 2;
  app.stage.addChild(box);

  msg = new PIXI.Text('No collision...', new PIXI.TextStyle({ fill: 'white' }));
  app.stage.addChild(msg);

  state = play;

  app.ticker.add((delta) => gameLoop(delta));
}

function gameLoop(delta: number) {
  state(delta);
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

function play(delta: number) {
  cat.x += cat.vx;
  cat.y += cat.vy;

  if (hitTestRectangle(cat, box)) {
    msg.text = 'hit!';
    box.tint = 0xff3300;
  } else {
    msg.text = 'No collision...';
    box.tint = 0xccff99;
  }
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
