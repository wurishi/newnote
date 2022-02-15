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



