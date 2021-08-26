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

# 6. 显示精灵 (sprite)

在加载一个图像之后, 可以用它来创建一个精灵, 你需要用 `stage.addChild`方法把它放到 Pixi 的舞台上去, 像这样:

```js
app.stage.addChild(cat);
```

记住, 舞台是用来包裹你所有精灵的主要容器.

**重点: 你不应该看见任何没被加入舞台的精灵**

这里是显示一个图像, 创建一个精灵, 显示在 Pixi 舞台上所需要的所有代码:

```tsx
const app = new PIXI.Application({
  width: 256,
  height: 256,
  antialias: true,
  transparent: false,
  resolution: 1,
});

document.body.appendChild(app.view);

PIXI.loader.add('./cat.png').load(setup);

function setup() {
  const cat = new PIXI.Sprite(PIXI.loader.resources['./cat.png'].texture);

  app.stage.addChild(cat);
}
```

如果你想把一个精灵从舞台上挪走, 就可以使用 `removeChild`方法:

```js
app.stage.removeChild(anySprite);
```

但是通常, 我们都把精灵的 `visible`属性设置成 `false`来让精灵简单的隐藏.

```js
anySprite.visible = false;
```

## 6.1 使用别名

你可以对你使用频繁的 Pixi 对象和方法设置一些简略的可读性更加的别名. 举个例子, 你想给所有的 Pixi 对象增加 `PIXI` 前缀么?

```js
const TextureCache = PIXI.utils.TextureCache;

// 现在就可以像这样使用别名了:
const texture = TextureCache['images/cat.png'];
```

使用别名给写出简洁的代码提供了额外的好处: 它帮助你缓存了 Pixi 的常用 API. 如果 Pixi 的 API 在将来的版本里改变了(没准真的会变). 你将只需要在一个地方更新这些对象和方法, 而不是所有的实例里.

来看看怎么将所有的 Pixi 对象和方法改成别名之后, 来重写加载和显示图像的代码.

```js
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
```

## 6.2 一些关于加载的其他知识

### a. 使用普通的 javaScript Img 对象或 canvas 创建一个精灵

为了优化效率我们常常选择从预加载的纹理缓存中创建精灵. 但是如果因为某些原因你需要从 JavaScript 的 `Image`对象中创建, 你可以使用 Pixi 的 `BaseTexture`和 `Texture`类:

```js
const base = new PIXI.BaseTexture(anyImageObject),
      texture = new PIXI.Texture(base),
      sprite = new PIXI.Sprite(texture);
```

你可以使用 `BaseTexture.fromCanvas`从任何已经存在的 canvas 标签中创建纹理:

```js
const base = new PIXI.BaseTexture.fromCanvas(anyCanvasElement);
```

如果你想改变已经显示的精灵的纹理, 使用 `texture`属性, 可以设置任何 `Texture`对象:

```js
anySprite.texture = PIXI.utils.TextureCache['anyTexture.png'];
```

### b. 给已经加载的文件设定一个名字

你可以给任何你加载的源文件分配一个独一无二的别名. 你只需要在 `add`方法中第一个参数位置传进去这个别名就行了.

```js
PIXI.loader
	.add('catImage', 'images/cat.png') // 重命名为 catImage
	.load(setup);
// 这个操作将在 loader.resource 中创建一个叫做 catImage 对象, 意味着你可以创建一个引用了 catImage 对象的精灵
const cat = new PIXI.Sprite(PIXI.loader.resources.catImage.texture);
```

然而, 建议永远别用这个操作! 因为你不得不记住你所有加载文件的别名, 而且必须确信你只用了它们一次. 使用路径命名, 将事情变的更简单和更少错误.

### c. 监视加载进程

Pixi 的加载器有一个特殊的 `progress`事件, 它将会调用一个可以定制的函数, 这个函数将在每次文件加载时调用. `progress`事件将会被  `loader`的 `on`方法调用, 像是这样:

```js
PIXI.loader.on('progress', loadProgressHandler);
```

这里展示了怎么将 `on`方法注入加载链中, 并且每当文件加载时调用一个用户自定义的名叫 `loadProgressHandler`函数.

```js
PIXI.loader
	.add([
    'images/one.png',
    'images/two.png',
    'images/three.png'
])
	.on('progress', loadProgressHandler)
	.load(setup);

function loadProgressHandler() {
    console.log('loading');
}

function setup() {
    console.log('setup');
}
```

每一个文件加载, progress 事件调用 `loadProgressHandler`函数在控制台输出 'loading'. 当三个文件都加载完毕, `setup`方法将会运行, 下面是控制台的输出:

```
loading
loading
loading
setup
```

这就不错了, 不过还能变的更好. 你可以知道哪个文件被加载了以及有百分之多少的文件被加载了. 你可以在 `loadProgressHandler`增加 `loader`参数和 `resource`参数实现这个功能, 像这样:

```js
function loadProgressHandler(loader, resource) {
    // 你可以使用 resource.url 变量来找到现在已经被加载的文件.(如果你想找到你定义的别名, 使用 resource.name 参数)
    console.log('loading: ' + resource.url);
    // 你可以使用 loader.progress 来找到现在有百分之多少的文件被加载了.
    console.log('progress: ' + loader.progress + '%');
}
// 还有一些额外的 resource 对象属性
// resource.error 会告诉你有哪些加载时候的错误
// resource.data 将会给你文件的原始二进制数据
```

### d. 一些关于 Pixi 的加载器的其他知识

Pixi 的加载器有很多可以设置的功能:

`add`方法有四个基础参数:

```js
add(name, url, optionObject, callbackFunction);
```

| 名称                | 类型                         | 描述                                                         |
| ------------------- | ---------------------------- | ------------------------------------------------------------ |
| name                | string                       | 加载源文件的别名, 如果没有设置, `url`就会放在这.             |
| url                 | string                       | 源文件的地址, 是加载器 `baseUrl`的相对地址.                  |
| options             | object                       | 加载设置.                                                    |
| options.crossOrigin | boolean                      | 源文件请求跨域不? 默认是自动设定的.                          |
| options.loadType    | `Resource.LOAD_TYPE`         | 源文件是怎么加载进来的? 默认是 `Resource.LOAD_TYPE.XHR`      |
| options.xhrType     | `Resource.XHR_RESPONSE_TYPE` | 用 XHR 的时候怎么处理数据? 默认是 `Resource.XHR_RESPONSE_TYPE.DEFAULT` |
| callbackFunction    | function                     | 当这个特定的资源加载完后, 这个函数将会被执行                 |

只有 `url`必填.

```js
// 正常语法
.add('key', 'http://...', function() {});
.add('http://...', function() {});
.add('http://...');
// 对象语法
.add({
    name: 'key',
    url: 'http://...'
}, function() {});
.add({
    url: 'http://...'
}, function() {});
.add({
    name: 'key2',
    url: 'http://...',
    onComplete: function() {}
});
.add({
    url: 'https://...',
    onComplete: function() {},
    crossOrigin: true
});
// 传一个数组, 即可以使用对象, 也可以使用链式加载
.add([
    {name: 'key', url: 'http://...', onComplete: function() {}},
    {url: 'http://...', onComplete: function() {}},
    'http://...'
]);
```

**注意: 如果你需要重新加载一批文件, 调用加载器的 `reset`方法: `PIXI.loader.reset();`**

Pixi 的加载器还有许多其他的高级特性, 包括可以让你加载和解析所有类型的二进制文件的选项.

# 7. 精灵的位置

现在你知道了怎么创建和显示一个精灵, 让我们学习如何定位他们的位置和改变他们的大小. 在最早的示例里, 精灵被放在了舞台的左上角. 它的 `x y`坐标都是 0. 你可以通过改变它的 `x,y`坐标的值来改变他们的位置.

```js
function setup() {
    const cat = new Sprite(resources['./cat.png'].texture);
    
    cat.x = 96;
    cat.y = 96;
    // 你也可以一句话设置精灵的 x y
    // sprite.position.set(x, y);
    
    app.stage.addChild(cat);
}
```

# 8. 大小和比例

能够通过精灵的 `width`和 `height`属性来改变它的大小.

```js
cat.width = 80;
cat.height = 120;
```

精灵都有 `scale.x`和 `scale.y`属性, 它们可以成比例的改变精灵的宽高.

```js
// 大小变成一半
cat.scale.x = 0.5;
cat.scale.y = 0.5;
```

scale 的值是从 0 到 1 之间的数字, 代表了它对于原来精灵大小的百分比. 1 意味着 100% (原来的大小), 所以 0.5 意味着 50% (一半大小).

```js
// 增大1倍
cat.scale.x = 2;
cat.scale.y = 2;
```

Pixi 可以用一行代码缩放你的精灵.

```js
cat.scale.set(0.5, 0.5);
```

# 9. 角度

你可以通过对一个精灵的 `rotation`设定一个角度来旋转它.

```js
cat.rotation = 0.5;
```

但是旋转是针对于哪一个点发生的呢? 之前已经了解了, 精灵的左上角代表它的位置, 这个点被称之为锚点. 所以默认情况下是根据精灵的左上角作为旋转中心进行旋转的.

如何改变锚点呢? 通过改变精灵的 `anchor`属性的 `x,y` 值来实现.

```js
cat.anchor.x = 0.5;
cat.anchor.y = 0.5;
```

`anchor.x`和 `anchor.y`的值都是从 0 到1, 代表了整个纹理的高度或宽度的百分比. 设置它们都为 0.5, 锚点就处在了图像中心.

和 position 和 scale 属性一样, 锚点也可以在一行内设置.

```js
cat.anchor.set(x, y);
```

精灵也提供了和 `anchor`差不多的 `pivot`属性来设置精灵的原点. 如果你改变了它的值之后旋转精灵, 它将会围绕着你设置的原点来旋转.

```js
cat.pivot.set(32, 32);
// 假设精灵图是64x64像素, 这样设置它将绕着它的中心点旋转
```

所以 `anchor`和 `pivot`的不同之处在哪里呢? `anchor`改变精灵纹理的图像原点, 用 0 到 1 的数据来填充. `pivot`则改变精灵的原点, 用像素的值来填充.

# 10. 从雪碧图中创建精灵

你现在已经知道了怎么从一个单文件内加载图像. 但实际应用中更经常使用的是雪碧图(也被称为精灵图). Pixi 封装了一些方便的方式来处理这种情况. 所谓雪碧图就是用一个单文件包含了多个图片的文件, 类似下面这样:

![sprite](sprite.png)

整个雪碧图是 192x192 像素宽高, 但每一个单图像只占有一个 32x32 的网格. 把所有图像存储在一个雪碧图上是一个非常有效率和工程化的手段, Pixi 为此做出了优化. 可以从一个雪碧图中用一个矩形区域捕获一个子图像. 这个矩形拥有和你想提取的子图像一样的大小和位置.

下面是一个从精灵图中获取"火箭"这个子图像的例子:

```js
function setup() {
  const texture = TextureCache['./tileset.png'];

  const rectangle = new Rectangle(32 * 3, 32 * 2, 32, 32);

  texture.frame = rectangle;

  const rocket = new Sprite(texture);

  rocket.position.set(32, 32);

  app.stage.addChild(rocket);
}
```

它是如何工作的呢?

Pixi 内置了一个通用的 `Rectangle`对象 (`Pixi.Rectangle`), 它是一个用于定义矩形形状的通用对象. 它需要一些参数, 前两个参数定义了 `x,y`轴坐标位置, 后两个参数定义了矩形的 `width`和 `height`.

```js
const rectangle = new PIXI.Rectangle(x, y, width, height);
```

这个矩形对象仅仅是一个数据对象, 如何使用它完全取决于你. 在我们的例子中它用来定义子图像在雪碧图中的位置和大小. Pixi 的 `Texture`有一个叫做 `frame`的属性, 它可以被设置为 `Rectangle`对象. `frame`将纹理映射到 `Rectangle`指定的维度.

因为从一个雪碧图中创建精灵的纹理是一个很频繁的操作, 后面会介绍在 Pixi 中更加合适的方式来处理这件事情.

# 11. 使用纹理贴图集

如果你正在处理一个很大的, 很复杂的游戏, 想要找到一种快速有效的方式来从雪碧图创建精灵. 纹理贴图集就会显得很有用处, 一个纹理贴图集就是一个 JSON 数据文件, 它包含了匹配的 png 雪碧图的子图像的大小和位置. 如果你使用了纹理贴图集, 那么想要显示一个子图像就只需要知道它的名字就行了. 你可以任意的排序你的排版, JSON 文件会保持他们的大小和位置不变. 这非常方便, 因为这意味着图片的位置和大小不必写在你的代码里. 如果你想要改变纹理贴图集的排版, 类似增加图片, 修改图片大小或删除图片这些操作, 只需要修改那个 JSON 数据文件就行了, 你的游戏会自动给程序内的所有数据应用新的纹理贴图集.

Pixi 兼容著名软件 [Texture Packer](https://www.codeandweb.com/texturepacker) 输出的标准纹理贴图集格式. Texture Packer 的基本功能是免费的 (还有一些类似的工具输出的纹理贴图集 Pixi 也是兼容的, 例如 [Shoebox](http://renderhjs.net/shoebox/) 和 [spritesheet.js](https://github.com/krzysztof-o/spritesheet.js/)).

`treasureHunter.json`里面包含了 `dungeon.png, door.png, exit.png 和 explorer.png`的数据信息, 这些子图像每一个都被叫做**帧**, 有了些这些数据你就不用去记每一个图片的大小和位置了, 你唯一要做的就只是确定精灵的**帧ID**即可. 帧ID 就是那些图片的原始名称, 类似 "blob.png" 或者 "explorer.png"这样.

使用纹理贴图集的巨大优势之一就是你可以很轻易的给每一个图像增加两个像素的内边距. Texture Packer 默认就是这么做的. 这对于保护图像的**出血**(出血是排版和图片处理方面的专有名词, 指在主要内容周围留空以便印刷或裁切)来说很重要. 出血对于防止两个图片相邻而不相互影响来说很重要. 这种情况往往发生于你的 GPU 渲染某些图片的时候, 把边上的一两个像素加上去还是不加? 这对于每一个 GPU 来说都有不同的做法. 所以对每一个图像空出一两个像素对于显示来说是最好的兼容.

注意: 如果你在每个图像的周围留了两个像素的出血, 你必须时时刻刻注意 Pixi 显示时"丢了一个像素"的情况. 尝试着去改变纹理的缩放模式来重新计算它(`texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;`). 这往往发生于你的 GPU 浮点运算凑整失败的时候.

# 12. 加载纹理贴图集

可以使用 Pixi 的 `loader`来加载纹理贴图集. 如果是用 Texture Packer 生成的 JSON, `loader`会自动读取数据, 并对每一个帧创建纹理. 

```js
loader.add('./treasureHunter.json').load(setup);
```

当纹理贴图集加载成功后, `setup`将会执行. 并且现在每一个图像的帧都被加载进 Pixi 的纹理缓存之中了. 你可以使用 Texture Packer 中定义的它们的名字来取用每一个纹理.

# 13. 从已经加载的纹理贴图集中创建精灵

通常 Pixi 有三种方式从已经加载的纹理贴图集中创建精灵:

1. 使用 `TextureCache`:

   ```js
   const texture = TextureCache['frameId.png'],
         sprite = new Sprite(texture);
   ```

2. 使用 `loader.resources`:

   ```js
   const sprite = new Sprite(resources['treasureHunter.json'].textures['frameId.png']);
   ```

3. 创建一个 `id`别名:

   ```js
   const id = PIXI.loader.resources['treasureHunter.json'].textures;
   const sprite = new Sprite(id['frameId.png']);
   ```

```js
let dungeon, explorer, treasure, id;
function setup() {
    // 1. 使用 TextureCache
    const dungeonTexture = TextureCache['dungeon.png'];
    dungeon = new Sprite(dungeonTexture);
    app.stage.addChild(dungeon);

    // 2. 使用 loader.resources
    explorer = new Sprite(
        resources['./treasureHunter.json'].textures['explorer.png']
    );
    explorer.x = 68;
    explorer.y = app.stage.height / 2 - explorer.height / 2;
    app.stage.addChild(explorer);

    // 3. 使用 id 别名
    id = resources['./treasureHunter.json'].textures;
    treasure = new Sprite(id['treasure.png']);

    treasure.x = app.stage.width - treasure.width - 48;
    treasure.y = app.stage.height / 2 - treasure.height / 2;
    app.stage.addChild(treasure);
}
```

# 14. 移动精灵

现在你知道了如何展示精灵, 但是让它们移动呢? 很简单: 使用 Pixi 的 `ticker`. 这被称为**游戏循环**. 任何在游戏循环里的代码都会1秒更新60次. 

```js
function setup() {
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    // 每次x坐标移动1像素
    cat.x += 1;
}
```

`delta`的值代表帧的部分延迟. 你可以把它添加到设置位置的逻辑中, 让速度和帧率无关:

```js
cat.x += 1 + delta;
```

是否加进这个 `delta`的值其实是一种审美的选择. 它往往只在你的动画没法跟上 60 帧的速率时出现.

你也没必要非得用 Pixi 的 `ticker`来创建游戏循环. 你也可以用 `requestAnimationFrame`:

```js
function gameLoop() {
    requestAnimationFrame(gameLoop);
    
    cat.x += 1;
}
gameLoop();
```

# 15. 使用速度属性

为了给你更多的灵活性, 这里有两个速度属性: `vx, vy`去控制精灵的运动速度. `vx`被用来设置精灵在 x轴(水平)的速度和方向. `vy`被用来设置精灵在 y轴(垂直)的速度和方向. 它们可以直接更新速度变量并且给精灵设定这些速度值. 这是一个用来让你更方便的更新交互式动画的额外模块.

第一步是给你的精灵创建 `vx, vy`属性, 然后给他们初始值.

```js
cat.vx = 0;
cat.vy = 0;
```

接下来, 在游戏循环中, 更新 `vx, vy`为你想让精灵移动的速度值. 然后把这些值赋给精灵的 `x, y`属性.

```js
let cat;
function setup() {
  cat = new Sprite(TextureCache['./cat.png']);
  cat.y = 96;
  cat.vx = 0;
  cat.vy = 0;
  app.stage.addChild(cat);

  app.ticker.add((delta) => gameLoop(delta));
}

function gameLoop(delta) {
  // 设置速度
  cat.vx = 1;
  cat.vy = 1;

  cat.x += cat.vx;
  cat.y += cat.vy;
}
```

# 16. 游戏状态

一种代码风格:

```js
let cat, state;

function setup() {
    cat = new Sprite(resources['./cat.png'].texture);
    cat.y = 96;
    cat.vx = 0;
    cat.vy = 0;
    app.stage.addChild(cat);
    
    state = play;
    
    app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta) {
    state(delta);
}

function play(delta) {
    cat.vx = 1;
    cat.x += cat.vx;
}
```

# 17. 键盘响应

只需要再做一点微小的工作, 你就可以建立一个通过键盘控制精灵移动的简单系统.

```js
function keyboard(keyCode) {
  const key = {
    code: keyCode,
    isDown: false,
    isUp: true,
    press: () => {},
    release: () => {},
    downHandler: (event) => {
      if (event.keyCode === key.code) {
        if (key.isUp && key.press) key.press();
        key.isDown = true;
        key.isUp = false;
      }
      event.preventDefault();
    },
    upHandler: (event) => {
      if (event.keyCode === key.code) {
        if (key.isDown && key.release) key.release();
        key.isDown = false;
        key.isUp = true;
      }
      event.preventDefault();
    },
  };

  window.addEventListener('keydown', key.downHandler, false);
  window.addEventListener('keyup', key.upHandler, false);
  return key;
}
```

# 18. 给精灵分组

分组让你能够在场景中像一个单一单元一样管理相似的多个精灵图. Pixi 有一个对象叫 `Container`, 它可以帮你做这些工作.

```js
// 假设有三个精灵已经创建好了分别为 cat, hedgehog, tiger
// 创建一个 animals 容器
const animals = new Container();
// 用 addChild 把精灵图添加到分组中
animals.addChild(cat);
animals.addChild(hedgehog);
animals.addChild(tiger);
// 最后把分组添加到舞台中
app.stage.addChild(animals);
// stage 也是一个 Container, 它是Pixi的根容器
```

现在你可以像对待单一单元一样对待 `animals`分组. 你可以把 `Container`当作是一个特殊类型的但不包含任何纹理的精灵.

如果你需要获取 `animals`包含的所有子精灵, 你可以用它的 `children`数组获取.

```js
console.log(animals.children);
// Array [Object, Object, Object]
```

因为 `animals`分组跟其他精灵一样, 你可以改变它的 `x, y`的值, `alpha, scale`和其他精灵的属性. 所有你改变的父容器的属性值, 都会改变它的子精灵的相应属性. 所以如果你设置分组的 `x, y`的位置. 所有的子精灵都会相对于分组的左上角重新定位.

分组也有它自己的尺寸, 它是以包含的精灵所占的区域计算出来的.

如果你喜欢, 你可以在一个 `Container`里嵌套许多其他的 `Container`, 如果你需要, 完全可以创建一个更深的层次. 然而, 一个 `DisplayObject`(像 `Sprite`或 `Container`)只能一次属于一个父级. 如果你用 `addChild`让一个精灵成为其他精灵的孩子. Pixi 会自动先移除它当前的父级.

## 18.1 局部位置和全局位置

当你往一个 `Container`添加一个精灵时, 它的 `x, y`的位置是相对于分组的左上角的. 这是精灵的局部位置.

精灵图还有全局位置, 全局位置是舞台左上角到精灵锚点(通常是精灵的左上角)的距离. 你可以通过 `toGlobal`方法找到精灵图的全局位置.

```js
parentSprite.toGlobal(childSprite.position);
```

```js
// 假设 cat 的局部位置为 {x: 16, y: 16}
console.log(animals.toGlobal(cat.position));
// 假设 animals 的位置为 {x: 64, y: 64}
// 那么输出结果为: {x: 80, y: 80, ....}
```

如果你想知道一个精灵的全局位置, 但是不知道精灵的父容器怎么办? 每个精灵图都有一个属性 `parent`能告诉你精灵的父级是什么.

```js
// 即使不知道 cat 的当前父级是谁, 也能正确获取全局位置
cat.parent.toGlobal(cat.position);
```

还有一种方式能够计算出全局位置, 而且它实际上是最好的方式, `getGlobalPosition`:

```js
tiger.getGlobalPosition().x;
tiger.getGlobalPosition().y;
```

`getGlobalPosition`是高精度的, 当精灵的局部位置改变的同时, 它会返回给你精确的全局位置, 这便于开发精确的碰撞检测游戏.

如果你想转换全局位置为局部位置怎么办? 你可以用 `toLocal`方法.

```js
sprite.toLocal(sprite.position, anyOtherSprite);
```

用 `toLocal`找到一个精灵和其他任何一个精灵之间的距离.

```js
tiger.toLocal(tiger.position, hedgehog).x;
```

## 18.2 使用 ParticleContainer 分组精灵

Pixi 有一个额外的, 高性能的方式去分组精灵的方法称作: `ParticleContainer (PIXI.particles.ParticleContainer)`. 任何在 `ParticleContainer`里的精灵都会比在一个普通的 `Container`的渲染速度快 2 到 5 倍. 这是用于提升游戏性能的一个很棒的方法.

```js
const superFastSprites = new PIXI.particles.ParticleContainer();
```

然后用 `addChild`去往里面添加精灵, 就像往普通的 `Container`添加一样.

如果你决定用 `ParticleContainer`你必须做出一些妥协. 

- 在 `ParticleContainer`里的精灵图只有一小部分基本属性: `x, y, width, height, scale, pivot, alpha, visible`.
- 包含的精灵不能再继续嵌套自己的孩子精灵.
- 不能用 Pixi 的先进的视觉效果像过滤器和混合模式.
- 每个 `ParticleContainer`只能用一个纹理 (如果想让精灵有不同的表现方式将不得不更换雪碧图)

为什么在 `ParticleContainer`的精灵图这么快呢? 因为精灵的位置是直接在 GPU 上计算的. Pixi 开发团队正在努力让尽可能多的雪碧图在 GPU 上处理.

当你创建一个 `ParticleContainer`, 有四个参数可以传递, `size, properties, batchSize, autoResize`.

```js
const superFastSprites = new ParticleContainer(maxSize, properties, batchSize, autoResize);
```

参数:

- `maxSize`: 默认为 1500. 如果你需要包裹更多的精灵, 就需要设置最高的数字.

- `properties`: 是一个拥有五个布尔值的对象. 默认只有 `position`为 `true`, 其他 `scale, rotation, uvs, alpha` 都为 `false`.

  ```js
  // 如果想要改变子精灵的其他四个属性, 你需要这样
  new ParticleContainer(size, {
      rotation: true,
      alphaAndtint: true,
      scale: true,
      uvs: true
  });
  // 如果不需要这些属性, 保持它们为 false 以实现更好的性能.
  ```

  `uvs`是什么呢? 只有当它们在动画时需要改变它们纹理子图像的时候你需要设置它为 `true`(改变的纹理仍然需要在同一张雪碧图上).

注意: **UV mapping** 是一个 3D 图表展示术语, 它指纹理(图片)准备映射到三维表面的 `x, y`坐标. `U`是 `x轴`, `V`是 `y轴`. WebGL 使用 `x, y, z`来进行三维空间定位. 所以 `U, V`被选为表示 2D 图片纹理的 `x, y`.

