export default (function () {
  const app = new PIXI.Application();
  document.body.appendChild(app.view);

  app.stop();

  app.loader.add('mc.json');
});
