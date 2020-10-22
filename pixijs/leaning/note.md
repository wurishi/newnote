[link](https://github.com/Zainking/learningPixi)

# 1. 介绍

# 2. 安装

环境: pixi.js v4.5.5

# 3. 创建 Pixi 应用和舞台

`PIXI.Application`算出了应该使用 Canvas 还是 WebGL 去渲染图像, 它取决于你正在使用的浏览器支持哪一个.

```js
const app = PIXI.Application({
    width: 256,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1
});
```

