[link](https://cloud.tencent.com/developer/section/1423865)

# 1. 教程 (Tutorial)

## 1.1 Basic Shapes (基本形状)

```svg
<svg width="200" height="250" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"/>
  <rect x="60" y="10" rx="10" ry="10" width="30" height="30" stroke="black" fill="transparent" stroke-width="5"/>
  <circle cx="25" cy="75" r="20" stroke="red" fill="transparent" stroke-width="5"/>
  <ellipse cx="75" cy="75" rx="20" ry="5" stroke="red" fill="transparent" stroke-width="5"/>
  <line x1="10" x2="50" y1="110" y2="150" stroke="orange" stroke-width="5"/>
  <polyline points="60 110 65 120 70 115 75 130 80 125 85 140 90 135 95 150 100 145"
            stroke="orange" fill="transparent" stroke-width="5"/>
  <polygon points="50 160 55 180 70 180 60 190 65 205 50 195 35 205 40 190 30 180 45 180"
           stroke="green" fill="transparent" stroke-width="5"/>
  <path d="M20,230 Q40,205 50,230 T90,230" fill="none" stroke="blue" stroke-width="5"/>
</svg>
```

### 矩形 - Rectangles

`rect`元素会在屏幕上绘制一个矩形。只需要6个基本属性就可以控制它在屏幕上的位置和形状。其中 `rx ry`属性用来控制圆角。如果没有设置圆角，则默认为0 。所以最基本的属性是：`x y width height`。

```svg
<rect x="10" y="10" width="30" height="30"/>
<rect x="60" y="10" rx="10" ry="10" width="30" height="30"/>
```

| 属性名 | 描述                   |
| ------ | ---------------------- |
| x      | 矩形左上角的 x 位置    |
| y      | 矩形左上角的 y 位置    |
| width  | width 矩形的宽度       |
| height | height 矩形的高度      |
| rx     | rx 圆角的 x 方位的半径 |
| ry     | ry 圆角的 y 方位的半径 |

### 圆形 - Circle

`circle`元素会在屏幕上绘制一个圆形。它只需要3个属性来设置。

```svg
<circle cx="25" cy="75" r="20"/>
```

| 属性名 | 描述            |
| ------ | --------------- |
| r      | 圆的半径        |
| cx     | 圆心的 x 轴位置 |
| cy     | 圆心的 y 轴位置 |

### 椭圆 - Ellipse

`ellipse`是 `circle`元素更通用的形式，你可以分别缩放圆的 x 半径和 y 半径。（通常数学上称之为长轴半径和短轴半径）

```svg
<ellipse cx="75" cy="75" rx="20" ry="5"/>
```

| 属性 | 描述              |
| ---- | ----------------- |
| rx   | 椭圆的 x 半径     |
| ry   | 椭圆的 y 半径     |
| cx   | 椭圆中心的 x 位置 |
| cy   | 椭圆中心的 y 位置 |

### 线条 - Line

`line`绘制直线。它取两个点的位置作为属性，指定这条线的起点和终点位置。

```svg
<line x1="10" x2="50" y1="110" y2="150"/>
```

| 属性 | 描述          |
| ---- | ------------- |
| x1   | 起点的 x 位置 |
| y1   | 起点的 y 位置 |
| x2   | 终点的 x 位置 |
| y2   | 终点的 y 位置 |

### 折线 - Polyline

`polyline`是一组连接在一起的直线。因为它可以有很多的点，折线的所有点位置都放在一个 points 属性中：

```svg
<polyline points="60 110, 65 120, 70 115, 75 130, 80 125, 85 140, 90 135, 95 150, 100 145"/>
```

| 属性   | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| points | 点集数列。每个数字用空白，逗号，终止命令符或者换行符分隔开。每个点必须包含2个数字，一个是x坐标，一个是y坐标。所以点列表(0,0), (1,1), (2,2) 可以写成这样："0 0, 1 1, 2 2" |

### 路径 - Path

`path`可能是 SVG 中最常见的形状。你可以用 `path`元素绘制矩形（直角矩形或者圆角矩形），圆形，椭圆，折线，多边形，以及一些其他的形状，例如贝塞尔曲线，2次曲线等。后续章节会详细介绍，这里只介绍一下定义路径形状的属性。

```svg
<path d="M 20 230 Q 40 205, 50 230 T 90230"/>
```

| 属性 | 描述     |
| ---- | -------- |
| d    | 点集数列 |

## 1.2 Basic Transformations (基本转型)

### 元素集合 - Group

在对形状进行变形前，先介绍一下 `g`元素。利用它可以把属性赋给一整个元素集合。

```svg
<svg width="30" height="10">
  <g fill="red">
    <rect x="0" y="0" width="10" height="10" />
    <rect x="20" y="0" width="10" height="10" />
  </g>
</svg>
```

接下来所有的变形都会用一个元素的 `transform`属性。**变形可以连续，只需要把它们连接起来并用空格隔开即可。**

### 平移 - translate

`translate()`变形方法可以把元素移动一段距离，甚至可以根据相应的属性定位它。

```svg
<svg width="40" height="50" style="background-color:#bff;">
  <rect x="0" y="0" width="10" height="10" transform="translate(30,40)" />
</svg>
```

该示例将一个矩形移到点(30, 40)，而不是出现的点(0, 0)。

`translate(x, y = 0)`如果没有指定第二个值(y)，它默认被赋值为0

### 旋转 - rotate

`rotate()`	变形方法用来旋转一个元素。

```svg
<svg width="31" height="31">
  <rect x="12" y="-10" width="20" height="20" transform="rotate(45)" />
</svg>
```

该示例显示了一个方形，旋转了45度。

`rotate(angle)`使用的值单位是角度。

### 斜切 - skewX, skewY

可以用 `skewX()`和 `skewY()`变形将一个矩形制作成一个斜菱形。

```svg
<rect x="0" y="0" width="10" height="10" transform="skewX(45)" />
<rect x="0" y="10" width="10" height="10" transform="skewY(45)" />
```

### 缩放 - scale

`scale()`变形用来改变元素的尺寸。它需要两个数字，作为比率计算如何缩放。0.5 表示收缩到 50%。

```svg
<rect x="0" y="0" width="10" height="10" transform="scale(0.5,0.5)" />
<rect x="0" y="0" width="10" height="10" transform="scale(0.5)" />
```

`scale(sx, sy?)` 如果第二个数字被忽略，它默认等于第一个值。

### 用 `matrix()` 实现复杂变形

所有有上面的变形可以表达为一个 2x3 的变形矩阵。组合一些变形，可以直接用 `matrix(a, b, c, d, e, f)`变形设置结果矩阵。

本质上是利用矩阵把上一个坐标系的坐标映射到了新的坐标系统。

```svg
<rect x="10" y="10" width="30" height="20" fill="red"
      transform="matrix(3 1 -1 3 30 40)" />
<!--
[a c e]    [3 -1 30]
[b d f] => [1  3 40]
[0 0 1]    [0  0  1]
-->
```

|                          |                                                              |
| ------------------------ | ------------------------------------------------------------ |
| 左上角 (oldX=10 oldY=10) | newX = a * oldX + c * oldY + e = 3 * 10 - 1 * 10 + 30 = 50; newY = b * oldX + d * oldY + f = 1 * 10 + 3 * 10 + 40 = 80 |
| 右上角 (oldX=40 oldY=10) | newX = 3 * 40 - 1 * 10 + 30 = 140; newY = 1 * 40 + 3 * 10 + 40 = 110 |
| 左下角 (oldX=10 oldY=30) | newX = 3 * 10 - 1 * 30 + 30 = 30; newY = 1 * 10 + 3 * 30 + 40 = 140 |
| 右下角 (oldX=40 oldY=30) | newX = 3 * 40 - 1 * 30 + 30 = 120; newY = 1 * 40 + 3 * 30 + 40 = 170 |

### 坐标系统上的效果

如果使用了变形，你会在元素内部建立一个新的坐标系统，应用了这些变形，你为该元素和它的子元素指定的单位可能不是 1:1 像素映射。但是依然会根据这个变形进行歪曲，斜切，转换，缩放操作。

```svg
<svg width="100" height="100">
  <g transform="scale(2)">
    <rect width="50" height="50" />
  </g>
</svg>
```

该示例中矩形将是 100x100px，如果使用了比如说 `userSpaceOnUse`等属性，将出现更吸引人的效果。

### SVG 嵌在 SVG 内部

SVG 允许无缝嵌入别的 `svg`元素。因此可以利用内部的 `svg`元素的属性 `viewBox, width, height`简单创建一个新的坐标系统

```svg
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="100" height="100">
  <svg width="100" height="100" viewBox="0 0 50 50">
    <rect width="50" height="50" />
  </svg>
</svg> 
```

该示例也将显示一个 100x100px 的矩形。

## 1.3 Clipping and masking (剪切和掩蔽)

去掉已经创建的元素的部分内容，最初看起来有点矛盾。但是如果打算在 SVG 中创建一个半圆形，将发现下面的属性的作用。

**Clipping**用来移除在别处定义的元素的部分内容。在这里，任何半透明效果都是不行的。它只能要么显示要么不显示。

**Masking**允许使用透明度和灰度值遮罩计算得到的软边缘。

### 创建剪切

在一个圆形的基础上创建一个半圆形：

```svg
<svg>
  <defs>
    <clipPath id="cut-off-bottom">
      <rect x="0" y="0" width="200" height="100" />
    </clipPath>
  </defs>

  <circle cx="100" cy="100" r="100" clip-path="url(#cut-off-bottom)" />
</svg>
```

在(100,100)位置创建一个半径为100的圆形。它的属性 `clip-path`引用了一个带单个 `rect`元素的 `clipPath`元素，此时在它的内部将会使用这个矩形把画布的上半部分涂黑。(注意，`clipPath`元素经常放在一个 `defs`元素内。)

然而，这个矩形并不会被绘制，它的像素数据将被用来确定圆形的哪些像素需要最终呈现出来。因为矩形只覆盖了圆形的上半部分，所以圆形的下半部分将消失。

此时我们就有了一个半圆形，并且并不用处理弧形路径元素。对于剪切，`clipPath`内部的每个路径（在该示例中只有一个矩形）都会被检查到，与它的描边属性一起被估值，变形。它们的颜色，透明度并不会影响最终呈现的效果。

### 遮罩

遮罩的效果最令人印象深刻的是它表现为一个渐变的样子。如果想要让一个元素淡出，可以利用遮罩效果实现这一点。

```svg
<svg width="200" height="200">
  <defs>
    <linearGradient id="gradient">
      <stop offset="0" stop-color="white" stop-opacity="0" />
      <stop offset="1" stop-color="white" stop-opacity="1" />
    </linearGradient>
    <mask id="mask">
      <rect x="0" y="0" width="200" height="200" fill="url(#gradient)" />
    </mask>
  </defs>

  <rect x="0" y="0" width="200" height="200" fill="green" />
  <rect x="0" y="0" width="200" height="200" fill="red" mask="url(#mask)" />
</svg>
```

有一个绿色填充的矩形在底层，一个红色填充的矩形在上层。后者有一个 `mask`属性指向一个 `mask`元素。`mask`元素的内容是一个单一的 `rect`元素，它填充了一个从透明到白色的渐变。红色矩形将继承 `mask`内容（渐变）的 `alpha`值（透明度）的结果，最终将看到一个从绿色到红色渐变的输出。

### 用 `opacity`定义透明度

有一个简单的方法可以用来为整个元素设置透明度，`opacity`它的取值范围为0-1.

```svg
<rect x="0" y="0" width="100" height="100" opacity=".5" />
```

上面的矩形将绘制为半透明。还有两个分开的属性 `fill-opacity`和 `stroke-opacity`，分别用来控制填充和描边的不透明度。注意，描边将绘制在填充的上面。因此，如果在元素上设置了一个描边透明度的同时它还有填充色，则填充将会从描边的背景处透出来显示（描边宽度一半是盖在元素图形上的）。

```svg
<svg width="200" height="200">
  <rect x="0" y="0" width="200" height="200" fill="blue" />
  <circle cx="100" cy="100" r="50" stroke="yellow" stroke-width="40" stroke-opacity=".5" fill="red" />
</svg>
```

该示例中，红色的圆形在蓝色的背景上，黄色描边设置为 50% 透明度，便得有了双色描边的效果。

### 使用广为人知的 CSS 技术

Web 开发中有一个很有用的工具：`display:none`。在 SVG 上依然可以使用该 CSS 属性，连同 CSS2 定义的 `visibility`和 `clip`属性。

所有 SVG 元素的初始 `display`值都是 `inline`。

## 1.4 Fills and Strokes (填充和描边)

现在你可以用你掌握的知识来绘制任何图形了，下一个目标是给它们着色，包括指定对象的属性，使用内联 CSS 样式，或者内嵌的 CSS 样式，或者使用外部的 CSS 样式文件。大多数的 web 网站的 SVG 使用的是内联样式 CSS，对于这些方法都有优缺点。

### Fill 和 Stroke 属性

#### 上色

大多数基本的涂色可以通过在元素上设置两个属性来搞定：`fill`和 `stroke`属性。`fill`属性设置对象内部的颜色，`stroke`属性设置绘制对象的线条的颜色。你可以使用在 HTML 中的 CSS 颜色命名方案定义它们的颜色，比如说颜色名（像red这种），rgb值（像rgb(255,0,0)这样），十六进制值（#FF0000），rgba值（rgba(255,0,0,1)），等等。

```svg
<rect x="10" y="10" width="100" height="100" stroke="blue" fill="purple" fill-opacity="0.5" stroke-opacity="0.8" />
```

此外，在 SVG 中你可以分别定义填充色和边框色的不透明度，属性 `fill-opacity`控制填充色的不透明度，属性 `stroke-opacity`控制描边的不透明度。

> 注意：FireFox 3+ 支持 rgba 值，并且能够提供同样的效果。但是为了在其他浏览器中保持兼容，最好将它和填充/描边的不透明度分开使用。如果同时指定了rgba值和填充/描边不透明度，它们将都被调用。(即，`<rect fill="rgba(255,0,0,0.5)" fill-opacity="0.3" />`表示填充色透明度为0.5 * 0.3 = 0.15)

#### 描边

除了颜色属性，还有其他一些属性来控制绘制描边的方式。

```svg
<svg width="160" height="140" xmlns="http://www.w3.org/2000/svg" version="1.1">
  <line x1="40" x2="120" y1="20" y2="20" stroke="black" stroke-width="20" stroke-linecap="butt"/>
  <line x1="40" x2="120" y1="60" y2="60" stroke="black" stroke-width="20" stroke-linecap="square"/>
  <line x1="40" x2="120" y1="100" y2="100" stroke="black" stroke-width="20" stroke-linecap="round"/>
</svg>
```

`stroke-width`属性定义了描边的宽度。注意，描边是以路径为中心线绘制的，路径的每一侧都有均匀分布的描边。

第二个影响描边的属性是 `stroke-linecap`属性，它控制边框终点的形状。

`stroke-linecap`属性的值有三种可能值：

- `butt`：用直边结束线段，它是常规做法，线段边界90度垂直于描边的方向，贯穿它的终点。
- `square`：效果差不多，但是会稍微超出实际路径的范围，超出的大小由 `stroke-width`控制。
- `round`：表示边框的终点是圆角，圆色的半径也是由 `stroke-width`控制的。

还有一个 `stroke-linejoin`属性，用来控制两条描边线段之间，用什么方式连接。

```svg
<polyline points="40 60 80 20 120 60" stroke="black" stroke-width="20"
          stroke-linecap="butt" fill="none" stroke-linejoin="miter"/>
<polyline points="40 140 80 100 120 140" stroke="black" stroke-width="20"
          stroke-linecap="round" fill="none" stroke-linejoin="round"/>
<polyline points="40 220 80 180 120 220" stroke="black" stroke-width="20"
          stroke-linecap="square" fill="none" stroke-linejoin="bevel"/>
```

每条折线都是由两个线段连接起来的，连接处的样式由 `stroke-linejoin`属性控制，它有三个可用的值，`miter`是默认值，表示用方形画笔在连接处形成尖角，`round`表示用圆角连接，实现平滑效果。最后还有一个值 `bevel`，连接处会形成一个斜接。

最后，你可以通过指定 `stroke-dasharray`属性，将虚线类型应用在描边上。

```svg
<path d="M 10 75 Q 50 10 100 75 T 190 75" stroke="black"
      stroke-linecap="round" stroke-dasharray="5,10,5" fill="none"/>
<path d="M 10 75 L 190 75" stroke="red"
      stroke-linecap="round" stroke-width="1" stroke-dasharray="5,5" fill="none"/>
```

## 1.5 Filter effects (过滤器)

原链接缺少内容，故这里使用[chokcoco 关于 SVG 滤镜](https://github.com/chokcoco/cnblogsArticle)的内容。

### 有意思！强大的 SVG 滤镜

#### SVG 滤镜的种类

SVG 滤镜包括了：

- feBlend - 混合模式滤镜
- feColorMatrix - 颜色转换矩阵滤镜
- feComponentTransfer
- feComposite - 一个原始的过滤器，定义像素图像交互方式
- feConvolveMatrix
- feDiffuseLighting - 光照滤镜（散射光源）
- feDisplacementMap - 映射置换滤镜
- feFlood
- feGaussianBlur - 模糊滤镜
- feImage
- feMerge - 多滤镜叠加
- feMorphology - 形态滤镜
- feOffset - 位移滤镜
- feSpecularLighting - 光照滤镜（镜面反射光）
- feTile
- feTurbulence - 湍流滤镜（噪声）
- feDistantLight
- fePointLight
- feSpotLight

#### SVG 滤镜的语法

我们需要使用 `<defs>`和 `<filter>`标签来定义一个 SVG 滤镜。

通常所有的 SVG 滤镜元素都需要定义在 `<defs>`标记内。

> 基本上现代浏览器，即使不使用 `<defs>`包裹 `<filter>`，也能够定义一个 SVG 滤镜。

这个 `<defs>`标记是 definitions 这个单词的缩写，可以包含很多种其它标签，包括各种滤镜。

其次，使用 `<filter>`标记用来定义 SVG 滤镜。·`<filter>`标签需要一个 id 属性，它是这个滤镜的标志。SVG 图形使用这个 id 来引用滤镜。

看一个简单的 DEMO 1.5.1:

```html
<div class="cssFilter"></div>
<div class="svgFilter"></div>
<svg>
  <defs>
    <filter id="blur">
      <feGaussianBlur in="SourceGraphic" stdDeviation="5" />
    </filter>
  </defs>
</svg>
```

```css
div {
  width: 100px;
  height: 100px;
  background: #000;
}
.cssFilter {
  filter: blur(5px);
}
.svgFilter {
  filter: url(#blur);
}
```

我们在 `defs`的 `filter`标签内，使用了 SVG 的 `feGaussianBlur`滤镜，也就是模糊滤镜，它有两个属性 `in`和 `stdDeviation`。其中 `in="SourceGraphic"`属性指明了模糊效果要应用于整个图片，`stdDeviation`属性定义了模糊的程度。最后，在 CSS 中，使用 `filter: url(#blur)`去调用在 HTML 中定义的 id 为 `blur`的滤镜。

为了方便理解，也使用了 CSS 滤镜 `filter: blur(5px)`实现了一个类似的滤镜。

#### CSS filter 的 url 模式

上面的例子中使用了 `filter: url(#blur)`这种模式引入了一个 SVG 滤镜效果，url 是 CSS 滤镜属性的关键字之一，`url`模式是 CSS 滤镜提供的能力之一，允许我们引入特定的 SVG 过滤器，这极大的增强了 CSS 中滤镜的能力。

相当于所有通过 SVG 实现的滤镜效果，都可以快速的通过 CSS 滤镜 URL 模式引入。

#### 多个滤镜搭配工作

和 CSS 滤镜一样，SVG 滤镜也支持多个滤镜搭配混合使用。

先来看一个例子 1.5.2:

```html
<div></div>
<svg>
  <defs>
    <!-- Filter declaration -->
    <filter id="MyFilter">
      <!-- offsetBlur -->
      <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
      <feOffset in="blur" dx="10" dy="10" result="offsetBlur" />
      <!-- merge SourceGraphic + offsetBlur -->
      <feMerge>
        <feMergeNode in="offsetBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
</svg>
```

```css
div {
  width: 200px;
  height: 200px;
  background: url(img);
  filter: url(#MyFilter);
}
```

CSS 往往一行就能实现的事情，SVG 看上去使用了很多代码。但是这个效果其实并不是简单的 CSS 中的阴影，因为它的效果是类似 PNG 图片的轮廓阴影。

##### 分解步骤

首先看这一段：

```html
<!-- offsetBlur -->
<feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
<feOffset in="blur" dx="10" dy="10" result="offsetBlur" />
```

这一段会生成一个模糊效果，但有一个区别 `in="SourceAlpha"`表示利用的是原始输入中的非透明部分（alpha）。另外这里多了一个新的属性 `result='blur'`，它表明将滤镜作用的效果通过 `result`产生一个指定名称的中间结果（也称为 primitives 图元），其他滤镜可以使用 `in`属性导入不同滤镜产出的 `result`并继续操作。

紧接着，`<feOffset>`滤镜则使用 `in`拿到了上一步的结果 `result='blur'`，然后做了一个简单的位移。

合并起来就是一个非常重要的知识点：**在不同滤镜中利用 `result`和 `in`属性，可以实现在前一个基本变换操作上进行另一个操作。**比如上面例子中的先添加模糊然后进行位移效果。

这一步做完其实就获得了一个偏移了(10,10)的，黑色边缘模糊的阴影。

在实际效果中还出现了原图，所以这里接下使用 `<feMerge>`标签进行了合并：

```html
<!-- merge SourceGraphic + offsetBlur -->
<feMerge>
  <feMergeNode in="offsetBlur" />
  <feMergeNode in="SourceGraphic" />
</feMerge>
```

至此，基本上就掌握了 SVG 滤镜的工作原理，及多个滤镜如何搭配使用。接下来，只需要搞懂不同的滤镜能产生什么样的效果，有什么不同的属性，就能大致对 SVG 滤镜有个基本的掌握了！

#### 关于 SVG 滤镜还需要知道的

##### 滤镜标签通用属性

有一些属性是每一个滤镜标签都有的：

| 属性          | 作用                                                         |
| ------------- | ------------------------------------------------------------ |
| x, y          | 提供左上角的坐标来定义在哪里渲染滤镜效果。（默认值：0）      |
| width, height | 绘制滤镜容器框的高宽（默认都为 100%）                        |
| result        | 用于定义一个滤镜效果的输出名字，以便将其用作另一个滤镜效果的输入。 |
| in            | 指定滤镜效果的输入源，可以是某个滤镜导出的 `result`，也可以是下面 6 个值。 |

##### in 属性的 6 个取值

| `in` 取值       | 作用                                                         |
| --------------- | ------------------------------------------------------------ |
| SourceGraphic   | 图形元素自身将作用 `<filter>`的原始输入。                    |
| SourceAlpha     | `SourceAlpha`与 `SourceGraphic`具有相同的规则除了 `SourceAlpha`只使用元素的非透明部分。 |
| BackgroundImage | 与 `SourceGraphic`类似，但可在背景上使用。需要显式设置。     |
| BackgroundAlpha | 与 `SourceAlpha`类似，但可在背景上使用。需要显式设置。       |
| FillPaint       | 将其放置在无限平面上一样使用填充油漆。                       |
| StrokePaint     | 将其放在无限平面上一样使用描边绘画。                         |

#### feBlend 滤镜

`<feBlend>`为混合模式滤镜，与 CSS 中的混合模式相类似。

在 CSS 中，有混合模式 `mix-blend-mode`和 `background-blend-mode`。参考链接：

- [不可思议的混合模式 mix-blend-mode](https://github.com/chokcoco/iCSS/issues/16)
- [不可思议的混合模式 background-blend-mode](https://github.com/chokcoco/iCSS/issues/31)
- [CSS 奇思妙想 -- 使用 background 创造各种美妙的背景](https://github.com/chokcoco/iCSS/issues/84)

SVG 中的混合模式各类比 CSS 中的要少一些，只有 5 个，其作用与 CSS 混合模式完全一致：

- normal - 正常
- multiply - 正片叠底
- screen - 滤色
- darken - 变暗
- lighten - 变亮

简单的一个 DEMO 1.5.3，使用两张图片，利用不同的混合模式，可以得到不一样的混合结果：

```html
<div class="lighten"></div>

<svg>
  <defs>
    <filter id="lighten" x="0" y="0" width="200" height="200">
      <feImage width="200" height="200" xlink:href="/image1.jpg" result="img1" />
      <feImage width="200" height="200" xlink:href="/image2.jpg" result="img2" />
      <feBlend mode="lighten" in="img1" in2="img2" />
    </filter>
  </defs>
</svg>
```

```css
.lighten {
  width: 200px;
  height: 200px;
  filter: url(#lighten);
}
```

#### feColorMatrix 滤镜

`<feColorMatrix>`滤镜也是 SVG 滤镜中非常有意思的一个滤镜，顾名思义，它的名字中包含了矩阵这个单词，表示该滤镜基于转换矩阵对颜色进行变换。每个像素的颜色值（一个表示为(红，绿，蓝，透明度)的矢量）都经过矩阵乘法（matrix multiplated）计算出新的颜色。

`<feColorMatrix>`滤镜有 2 个私有属性 `type`和 `values`，type 它支持 4 种不同的类型，其中部分与 CSS Filter 中的一些滤镜效果类似。

| `type`类型       | 作用                     | `values`的取值范围                 |
| ---------------- | ------------------------ | ---------------------------------- |
| saturate         | 转换图像饱和度           | 0.0 - 1.0                          |
| hueRotate        | 转换图像色相             | 0.0 - 360.0                        |
| luminanceToAlpha | 阿尔法通道亮度           | 只有一个效果，无需改变 values 的值 |
| matrix           | 使用矩阵函数进行色彩变换 | 需要应用一个 4 x 5 的矩阵          |

前三个属性 saturate | hueRotate | luminanceToAlpha 的效果示意 Demo 1.5.4

saturate, hueRotate 滤镜和 CSS 中的 filter 的 saturate, hue-rotate 的作用是一模一样的。

#### feColorMatrix 中的 type=matrix

`feColorMatrix`中的 `type=matrix`理解起来要稍微更复杂点，它的 `values`需要传入一个 4X5 的矩阵。

像这样：

```html
<filter id="colorMatrix">
	<feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 1 0" />
</filter>
```

要理解如何运用矩阵，就不得不直面另外一个问题 - 图像的表示。

数字图像的本质是一个多维矩阵。在图像显示时，我们把图像的 R 分量放进红色通道里，B 分量放进蓝色通道里，G 分量放进绿色通道里。经过一系列处理，显示在屏幕上的就是我们所看到的彩色图像了。

而 `feColorMatrix`中的 matrix 矩阵，就是用来表示不同通道的每一个分量的值，最终通过计算得到我们熟知的 `rgba()`值。

计算逻辑为：

```js
/* R G B A 1 */
   1 0 0 0 0 // R = 1*R + 0*G + 0*B + 0*A + 0
   0 1 0 0 0 // G = 0*R + 1*G + 0*B + 0*A + 0
   0 0 1 0 0 // B = 0*R + 0*G + 1*B + 0*A + 0
   0 0 0 1 0 // A = 0*R + 0*G + 0*B + 1*A + 0
```

Demo 1.5.5

到目前为止，大部分 SVG 滤镜的展示讲解都是 CSS 现有能力能够实现的，那 SVG 滤镜的独特与魅力到底在哪呢？有什么是 CSS 能力无法做到的么？下面来看看另外几个有意思的 SVG 滤镜。

#### feSpecularLighting/feDiffuseLighting 光照滤镜

- feDiffuseLighting: 来自外部光源，适合模拟太阳光或者灯光照明
- feSpecularLighting: 指定从反射面反射的二次光

Demo 1.5.6

#### feMorphology 滤镜

`feMorphology`为形态滤镜，它的输入源通常是图形的 alpha 通道，它有两个操作可以使源图形腐蚀（变薄）或扩张（加粗）。

它有二个主要属性：

- operator: `erode`腐蚀模式，`dilate`为扩张模式，默认为 `erode`。
- radius: 笔触的大小，接受一个数字，表示该模式下的效果程度，默认为 0.

先将这个滤镜简单的应用到文字上看看效果1.5.7：

```html
<div class="g-text">
  <p>Normal Text</p>
  <p class="dilate">Normal Text</p>
  <p class="erode">Normal Text</p>
</div>

<svg>
  <defs>
    <filter id="dilate">
      <feMorphology in="SourceAlpha" result="DILATED" operator="dilate" radius="3" />
    </filter>
    <filter id="erode">
      <feMorphology in="SourceAlpha" result="ERODE" operator="erode" radius="1" />
    </filter>
  </defs>
</svg>
```

```css
p {
  font-size: 64px;
}
.dilate {
  filter: url(#dilate);
}
.erode {
  filter: url(#erode);
}
```

当然，该滤镜也可以应用在图片上，此时就并非是简单的让图像的笔触变精或者变细了。

- 对于 `erode`模式，会将图片的每一个像素向更暗更透明的方向变化。
- 对于 `dilate`模式，则是将每个像素向周围附近更亮更不透明的方向变化。

动画 DEMO 1.5.8

#### feTurbulence 滤镜

turbulence 意为湍流，不稳定气流，而 `<feTurbulence>`滤镜能够实现半透明的烟熏或波状图像。通常用于实现一些特殊的纹理。滤镜利用 Perlin 噪声函数创建了一个图像。噪声在模拟云雾效果时非常有用，能产生非常复杂的质感，利用它可以实现人造纹理比如说云纹，大理石纹的合成。

有了 `<feTurbulence>`就可以使用 SVG 创建纹理图形作为置换图，而不需要借助外部图形的纹理效果就可以创建复杂的图形效果。

它有三个属性需要特别注意：

- type: 实现的滤镜的类型，可选 `fractalNoise`分形噪声，或者是 `turbulence`湍流噪声。
  - fractalNoise: 分形噪声更加的平滑，它产生的噪声质感更接近云雾。
  - turbulence: 湍流噪声。
- baseFrequency: 表示噪声函数的基本频率的参数，频率越小，产生的图形越大。频率越大，产生的噪声越复杂其图形也越小越精细，通常的取值范围在 0.02 - 0.2
- numOctaves: 表示噪声函数的精细度，数值越高，产生的噪声越详细。默认值为 1.

两种噪声的代码基本一致，只是 `type`类型不同：Demo 1.5.9

另外 `baseFrequency`允许传入两个值，让我们可以只改变某一方向上的频率。

`<feTurbulence>`滤镜一般是作为纹理或者输入，和其他滤镜一起搭配使用以实现一些效果。

#### 使用 feTurbulence 滤镜实现文字流动的效果

首先，尝试与文字相结合。Demo 1.5.10

```html
<filter id="fractal">
  <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="1" result="turbu" />
  <feDisplacementMap in="SourceGraphic" scale="50" />
</filter>
```

#### feDisplacementMap 映射置换滤镜

上面的 Demo 中还使用了 `feDisplacementMap`滤镜。

它是用于改变元素和图形的像素位置的。该滤镜通过遍历原图形的所有像素点，并重新映射到一个新的位置，产生一个新的图形。

在上面的 Demo 中，我们通过 `feTurbulence`噪声得到了噪声图形，然后通过 `feDisplacementMap`滤镜根据 `feTurbulence`所产生的噪声图形进行形变，扭曲，液化，得到最终的效果。（注：`feDisplacementMap`默认会将上一个图形作为自己的 `in2`值，所以其实效果等于是 `<feDisplacementMap in="sourceGraphic" in2="turbu" scale="50" />`）

该滤镜的转化公式为：

```
P'(x,y) ← P(x + scale * (XC(x, y) - 0.5), y + scale * (YC(x, y) - 0.5))
```

#### 使用 feTurbulence 滤镜实现褶皱纸张的纹理

接下来继续使用 feTurbulence 滤镜，使用这个滤镜我们可以生成各种不同的纹理，可以尝试使用 feTurbulence 滤镜搭配光照滤镜实现褶皱的纸张纹理效果

Demo 1.5.11

#### 使用 feTurbulence 滤镜实现按钮 hover 效果

Demo 1.5.12

#### 使用 feTurbulence 滤镜实现云彩效果

最后，使用 `feTurbulence`滤镜模拟出真实的云彩效果。

首先，通过随机生成的多重 `box-shadow`实现一个图形。（也可以由 JavaScript, SASS 等有循环能力的语言去生成）

紧接着，通过 `feTurbulence`产生分形噪声图形，使用 `feDisplacementMap`进行映射置换，最后给图形叠加上这个滤镜效果。







