[link](https://pixijs.io/examples)

使用 `npx webpack-dev-server`

# 1. Container

![container](assets/container.png)

# 2. Transparent Background

![tbackground](assets/tbackground.png)

黄色背景为 HTML 的 `body`标签的背景色

```js
const sprite = PIXI.Sprite.from('A');
// 等同于以下的简写
const texture = PIXI.Texture.from('A');
const sprite = new PIXI.Sprite(texture);
```

# 3. Tinting

![tinting](assets/tinting.jpg)



`sprite.tint`改变颜色

# 4. CacheAsBitmap

![cacheasbitmap](assets/cacheasbitmap.jpg)

# 5. Particle Container

![particlec](assets/particlec.jpg)

# 6. BlendModes

![blendmodes](assets/blendmodes.jpg)

# 7. SimplePlane

![simpleplane](assets/simpleplane.jpg)