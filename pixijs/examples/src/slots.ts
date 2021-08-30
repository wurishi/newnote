import Stats from 'stats.js';

export default (function () {
  class Reel {
    container: PIXI.Container;
    symbols: PIXI.Sprite[];
    position: number;
    previousPosition: number;
    blur: PIXI.filters.BlurFilter;
  }

  const app = new PIXI.Application({
    backgroundColor: 0x1099bb,
  });
  document.body.appendChild(app.view);

  const stats = new Stats();
  document.body.appendChild(stats.dom);

  const REEL_WIDTH = 160;
  const SYMBOL_SIZE = 150;

  app.loader
    .add('../eggHead.png')
    .add('../flowerTop.png')
    .add('../helmlok.png')
    .add('../skully.png')
    .load(() => {
      const slotTextures = [
        PIXI.Texture.from('../eggHead.png'),
        PIXI.Texture.from('../flowerTop.png'),
        PIXI.Texture.from('../helmlok.png'),
        PIXI.Texture.from('../skully.png'),
      ];

      const reels: Reel[] = [];
      const reelContainer = new PIXI.Container();
      for (let i = 0; i < 5; i++) {
        const rc = new PIXI.Container();
        rc.x = i * REEL_WIDTH;
        reelContainer.addChild(rc);

        const reel: Reel = {
          container: rc,
          symbols: [],
          position: 0,
          previousPosition: 0,
          blur: new PIXI.filters.BlurFilter(),
        };
        reel.blur.blurX = 0;
        reel.blur.blurY = 0;
        rc.filters = [reel.blur];

        for (let j = 0; j < 4; j++) {
          const symbol = new PIXI.Sprite(
            slotTextures[Math.floor(Math.random() * slotTextures.length)]
          );
          symbol.y = j * SYMBOL_SIZE;
          symbol.scale.x = symbol.scale.y = Math.min(
            SYMBOL_SIZE / symbol.width,
            SYMBOL_SIZE / symbol.height
          );
          symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
          reel.symbols.push(symbol);
          rc.addChild(symbol);
        }
        reels.push(reel);
      }
      app.stage.addChild(reelContainer);

      const margin = (app.screen.height - SYMBOL_SIZE * 3) / 2;
      reelContainer.y = margin;
      reelContainer.x = Math.round(app.screen.width - REEL_WIDTH * 5);
      const top = new PIXI.Graphics();
      top.beginFill(0, 1);
      top.drawRect(0, 0, app.screen.width, margin);
      const bottom = new PIXI.Graphics();
      bottom.beginFill(0, 1);
      bottom.drawRect(0, SYMBOL_SIZE * 3 + margin, app.screen.width, margin);

      const style = new PIXI.TextStyle({
        fontFamily: 'Arial',
        fontSize: 36,
        fontStyle: 'italic',
        fontWeight: 'bold',
        fill: ['#ffffff', '#00ff99'],
        stroke: '#4a1850',
        strokeThickness: 5,
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI / 6,
        dropShadowDistance: 6,
        wordWrap: true,
        wordWrapWidth: 440,
      });

      const playText = new PIXI.Text('点击 !!!', style);
      playText.x = Math.round((bottom.width - playText.width) / 2);
      playText.y =
        app.screen.height - margin + Math.round((margin - playText.height) / 2);
      bottom.addChild(playText);

      const headerText = new PIXI.Text('PIXI MONSTER SLOTS!', style);
      headerText.x = Math.round((top.width - headerText.width) / 2);
      headerText.y = Math.round((margin - headerText.height) / 2);
      top.addChild(headerText);

      app.stage.addChild(top);
      app.stage.addChild(bottom);

      bottom.interactive = true;
      bottom.buttonMode = true;
      bottom.addListener('pointerdown', () => startPlay());

      let running = false;
      function startPlay() {
        if (running) return;
        running = true;

        reels.forEach((r, i) => {
          const extra = Math.floor(Math.random() * 3);
          const target = r.position + 10 + i * 5 + extra;
          const time = 2500 + i * 600 + extra * 600;
          tweenTo(
            r,
            'position',
            target,
            time,
            backout(0.5),
            null,
            i === reels.length - 1 ? reelsComplete : null
          );
        });
      }

      function reelsComplete() {
        running = false;
      }

      app.ticker.add((delta) => {
        reels.forEach((r, i) => {
          r.blur.blurY = (r.position - r.previousPosition) * 8;
          r.previousPosition = r.position;
          r.symbols.forEach((s, j) => {
            const prevy = s.y;
            s.y =
              ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
            if (s.y < 0 && prevy > SYMBOL_SIZE) {
              s.texture =
                slotTextures[Math.floor(Math.random() * slotTextures.length)];
              s.scale.x = s.scale.y = Math.min(
                SYMBOL_SIZE / s.texture.width,
                SYMBOL_SIZE / s.texture.height
              );
              s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
            }
          });
        });
      });
    });

  app.ticker.add((delta) => {
    stats.update();
    const now = Date.now();
    const remove: TWEEN[] = [];
    tweening.forEach((t) => {
      const phase = Math.min(1, (now - t.start) / t.time);
      t.object[t.property] = lerp(
        t.propertyBeginValue,
        t.target,
        t.easing(phase)
      );
      if (t.change) t.change(t);
      if (phase === 1) {
        t.object[t.property] = t.target;
        if (t.complete) t.complete(t);
        remove.push(t);
      }
    });
    remove.forEach((r) => {
      tweening.splice(tweening.indexOf(r), 1);
    });
  });
});

interface TWEEN {
  object: any;
  property: string;
  propertyBeginValue: number;
  target: number;
  easing: any;
  time: number;
  change: (t: TWEEN) => void;
  complete: (t: TWEEN) => void;
  start: number;
}
const tweening: TWEEN[] = [];
function tweenTo(
  object: any,
  property: string,
  target: number,
  time: number,
  easing: any,
  onchange: () => void,
  oncomplete: () => void
) {
  const tween: TWEEN = {
    object,
    property,
    propertyBeginValue: object[property],
    target,
    easing,
    time,
    change: onchange,
    complete: oncomplete,
    start: Date.now(),
  };
  tweening.push(tween);
  return tween;
}

function backout(amount: number) {
  return (t: number) => --t * t * ((amount + 1) * t + amount) + 1;
}

function lerp(a1: number, a2: number, t: number): number {
  return a1 * (1 - t) + a2 * t;
}
