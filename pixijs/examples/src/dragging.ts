export default function () {
  const app = new PIXI.Application({ backgroundColor: 0x1099bb });
  document.body.appendChild(app.view);

  const texture = PIXI.Texture.from('./bunny.png');

  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  for (let i = 0; i < 10; i++) {
    createBunny(
      Math.floor(Math.random() * app.screen.width),
      Math.floor(Math.random() * app.screen.height)
    );
  }

  function createBunny(x: number, y: number) {
    const bunny = new PIXI.Sprite(texture);

    bunny.interactive = true;
    bunny.buttonMode = true;
    bunny.anchor.set(0.5);
    bunny.scale.set(3);

    bunny
      .on('pointerdown', onDragStart)
      .on('pointerup', onDragEnd)
      .on('pointerupoutside', onDragEnd)
      .on('pointermove', onDragMove);

    bunny.x = x;
    bunny.y = y;

    app.stage.addChild(bunny);
  }

  function onDragStart(event: PIXI.InteractionEvent) {
    this.data = event.data;
    this.alpha = 0.5;
    this.dragging = true;
  }

  function onDragEnd() {
    this.alpha = 1;
    this.dragging = false;
    this.data = null;
  }

  function onDragMove() {
    if (this.dragging) {
      const newPosition = this.data.getLocalPosition(this.parent);
      this.x = newPosition.x;
      this.y = newPosition.y;
    }
  }
}
