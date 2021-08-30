export default (function () {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  app.loader.add('fighter.json').load(() => {
    const frames: PIXI.Texture[] = [];
    for (let i = 0; i < 30; i++) {
      const val = i < 10 ? `0${i}` : i;
      frames.push(PIXI.Texture.from(`rollSequence00${val}.png`));
    }

    const anim = new PIXI.AnimatedSprite(frames);

    anim.x = app.screen.width / 2;
    anim.y = app.screen.height / 2;
    anim.anchor.set(0.5);
    anim.animationSpeed = 0.5;
    anim.play();

    app.stage.addChild(anim);

    app.ticker.add(() => {
      anim.rotation += 0.01;
    });
  });
});
