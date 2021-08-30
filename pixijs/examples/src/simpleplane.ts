import Stats from 'stats.js';

export default (function () {
  const app = new PIXI.Application({
    backgroundColor: 0x1099bb,
  });
  document.body.appendChild(app.view);

  const stats = new Stats();
  document.body.appendChild(stats.dom);

  app.loader.add('bg_grass', '../bg_grass.jpg').load(() => {
    const texture = app.loader.resources.bg_grass.texture;

    const verticesX = 10;
    const verticesY = 10;
    const plane = new PIXI.SimplePlane(texture, verticesX, verticesY);
    plane.x = 100;
    plane.y = 100;
    app.stage.addChild(plane);

    const buffer = plane.geometry.getBuffer('aVertexPosition');
    // console.log(buffer.data.byteLength);
    app.ticker.add((delta) => {
      stats.update();
      // console.log(buffer.data);
      const data = buffer.data as Float32Array;
      for (let i = data.length - 1; i >= 0; i--) {
        data[i] += Math.random() - 0.5;
      }
      buffer.update();
    });
  });
});
