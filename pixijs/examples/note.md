[link](https://pixijs.io/examples)

使用 `npx webpack-dev-server`

# DEMOS - BASIC

## Container

![container](assets/container.png)

## Transparent Background

![tbackground](assets/tbackground.png)

黄色背景为 HTML 的 `body`标签的背景色

```js
const sprite = PIXI.Sprite.from('A');
// 等同于以下的简写
const texture = PIXI.Texture.from('A');
const sprite = new PIXI.Sprite(texture);
```

## Tinting

![tinting](assets/tinting.jpg)



`sprite.tint`改变颜色

## CacheAsBitmap

![cacheasbitmap](assets/cacheasbitmap.jpg)

只有设置 `interactive = true`, 精灵才能触发鼠标事件.

## Particle Container

![particlec](assets/particlec.jpg)

## BlendModes

![blendmodes](assets/blendmodes.jpg)

## SimplePlane

![simpleplane](assets/simpleplane.jpg)

# DEMOS - ADVANCED

## Slots

![slots](assets/slots.jpg)

## Scratchcard

![scratchcard](assets/scratchcard.jpg)

## Mouse Trail

![mousetrail](assets/mousetrail.jpg)

## Star Warp

![starwarp](assets/starwarp.png)

## Screenshot

![screenshot](assets/screenshot.jpg)

## Collision

![collision](assets/collision.png)

## Spinners

![spinners](assets/spinners.jpg)

# SPRITE

## Basic

![basic](assets/basic.jpg)

## Texture Swap

![textureswap](assets/textureswap.jpg)

## Animated Sprite - Explosion

![asexplosion](assets/asexplosion.jpg)