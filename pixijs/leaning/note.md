[link](https://github.com/Zainking/learningPixi)

# 1. 介绍

# 2. 安装

环境: pixi.js v4.5.5

# 3. 创建 Pixi 应用

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

| 属性        | 作用                                                         |
| ----------- | ------------------------------------------------------------ |
| antialias   | 使得字体的边界和几何图形更加圆滑 (WebGl 的 anti-aliasing 在所有平台都不可用, 所以需要在运行的平台上自己去测试) |
| transparent | 整个 canvas 标签的透明度                                     |
| resolution  | 像素密度                                                     |
| forceCanvas | 是否强制使用 Canvas 引擎绘制(放弃 WebGL)                     |

# 4. Pixi 舞台和精灵

现在你就有了一个画布, 可以往上面放图像了. 所有想在画布上显示的东西必须被加进一个被称作 `舞台`的 Pixi 对象中. 你能够这样使用舞台对象:

```js
app.stage
```

这个`舞台`是一个 Pixi 的 `容器`对象. 它是场景中所有可见对象的根容器. 所有放进去的内容都会被渲染到 canvas中.

那可以放些什么到舞台上呢? 那就是被称作**精灵**的特殊图像对象. 精灵是你能用代码控制的图像的基础. 你能够控制他们的位置, 大小, 和许多其他有用的属性来产生交互和动画.

Pixi 中的精灵, 主要由三种方法来创建它:

- 用一个单图像文件创建
- 用一个**雪碧图**来创建. 雪碧图是一个放入了许多图像的大图.
- 从一个纹理贴图集中创建. (纹理贴图集就是用 JSON 定义了图像大小和位置的雪碧图)

# 5. 将图片加载到纹理缓存中

因为 pixi 用 WebGL 和 GPU 去渲染图像, 所以图像需要转化成 GPU 可以处理的版本. 可以被 GPU 处理的图像被称作 **纹理**.在让精灵显示图片之前, 需要将普通的图片转化成 WebGL 纹理. 为了让所有工作执行的快速有效率, pixi 使用**纹理缓存**来存储和引用所有精灵需要的纹理. 纹理名称字符串就是图像的地址. 这意味着如果有从 `"images/cat.png"`加载的图像, 可以在纹理缓存中这样找到它:

```js
PIXI.utils.TextureCache["image/cat.png"];
```

纹理被以 WebGL 兼容的格式存储起来, 它可以使 Pixi 的渲染有效率的进行.

```js
const texture = PIXI.utils.TextureCache['images/anySpriteImage.png'];
const sprite = new PIXI.Sprite(texture);
```

但是如何加载图像并将它转化成纹理?

答案是使用 Pixi 已经构建好的 `loader`对象.

```js
PIXI.loader
	.add("images/anyImage.png")
	.load(setup);

function setup() {
    const sprite = new PIXI.Sprite(
    	PIXI.loader.resource['images/anyImage.png'].texture
    );
}
```

如果要加载一系列图像, 可以链式调用 `add`方法:

```js
PIXI.loader
	.add('img1.png')
	.add('img2.png')
	.add('img3.png')
	.load(setup);
```

更好的方式则是使用数组:

```js
PIXI.loader
	.add(['img1.png', 'img2.png', 'img3.png'])
	.load(setup);
```

另外 `loader`也允许使用 JSON 文件.