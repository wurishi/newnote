const app = new PIXI.Application({
  width: 256,
  height: 256,
  antialias: true,
  transparent: false,
  resolution: 1,
  forceCanvas: true,
  backgroundColor: 0xff0000, // 背景颜色
});

// (app.renderer as PIXI.CanvasRenderer)._backGroundColor = 0x061639;

app.renderer.autoResize = true;
app.renderer.resize(512, 512);

// 整个窗口
const { style } = app.renderer.view;
style.position = 'absolute';
style.display = 'block';
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

document.body.appendChild(app.view);
