(() => {
  // 别名
  const Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

  // 创建 Pixi App
  const app = new Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1,
  });

  // 添加到场景
  document.body.appendChild(app.view);

  // 加载 cat.png
  loader.add('./cat.png').load(setup);

  // 加载成功
  function setup() {
    // 创建 cat 精灵
    const cat = new Sprite(resources['./cat.png'].texture);

    // 将 cat 添加到场景
    app.stage.addChild(cat);
  }
})();
