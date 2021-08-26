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

let cat: any, state: any;
function setup() {
  cat = new Sprite(TextureCache['./cat.png']);
  cat.y = 96;
  cat.vx = 0;
  cat.vy = 0;
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

  state = play;

  app.ticker.add((delta) => gameLoop(delta));
}

function gameLoop(delta: number) {
  state(delta);
}

function play(delta: number) {
  cat.x += cat.vx;
  cat.y += cat.vy;
}
