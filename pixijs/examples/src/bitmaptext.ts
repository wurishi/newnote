export default function () {
  const app = new PIXI.Application({ backgroundColor: 0x1099bb });
  document.body.appendChild(app.view);

  app.loader.add('desyrel', './desyrel.xml').load(() => {
    const bitmapFontText = new PIXI.BitmapText(
      'bitmap fonts are supported!\nWoo yay!',
      {
        fontName: 'Desyrel',
        fontSize: 55,
        align: 'left',
      }
    );
    bitmapFontText.position.set(50, 200);

    app.stage.addChild(bitmapFontText);
  });
}
