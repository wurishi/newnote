[参考资料](https://github.com/chokcoco/iCSS)

# 1. 左边框的多种实现方式

假设有一个单标签 `div`：

```html
<div></div>
```

通用 CSS ：

```css
div {
  position: relative;
  width: 200px;
  height: 60px;
  background: #ddd;
}
```

## 1.1 `border`

```css
.border {
  border-left: 5px solid deeppink;
}
```

## 1.2 使用伪元素

一个标签，算上 `::before`和 `::after`伪元素，其实总共有三个标签。

```css
.cls-2::before {
  content: "";
  width: 5px;
  height: 60px;
  position: absolute;
  top: 0;
  left: 0;
  background: deeppink;
}
```

## 1.3 外 `box-shadow`

```css
.box-shadow {
  box-shadow: -5px 0px 0 0 deeppink;
}
```

## 1.4 内 `box-shadow`

```css
.inset-box-shadow {
  box-shadow: inset 5px 0 0 0 deeppink;
}
```

## 1.5 `drop-shadow`

```css
.drop-shadow {
  filter: drop-shadow(-5px 0 0 deeppink);
}
```

## 1.6 渐变 `linearGradient`

```css
.linear-gradient {
  background-image: linear-gradient(90deg, deeppink 0px, deeppink 5px, transparent 5px);
}
```

## 1.7 轮廓 `outline`

`outline`轮廓是绘制于元素周围的一条线，位于边框边缘的外围，可起到突出元素的作用。内容需要定义到伪元素的 `content`中。

```css
.outline {
  margin-left: 25px;
  height: 50px;
  outline: 5px solid deeppink;
}
.outline::after {
  position: absolute;
  content: "";
  top: -5px;
  bottom: -5px;
  left: 0;
  right: -5px;
  background: #ddd;
}
```

## 1.8 滚动条

```css
.scrollbar {
  width: 205px;
  background: deeppink;
  overflow-y: scroll;
}
.scrollbar::-webkit-scrollbar {
  width: 200px;
  background-color: #ddd;
}
```

## 1.9 使用下划线

```css
.text-decoration {
  overflow: hidden;
}
.text-decoration::before {
  position: absolute;
  content: "____";
  font-size: 40px;
  color: #000;
  bottom: 0;
  text-decoration: underline;
  color: deeppink;
  line-height: 60px;
  transform: rotate(90deg);
  right: 142px;
}
```

## 1.10 使用 `::first-letter`伪元素

与 `::before`，`::after`伪元素类似，还可以使用 `::first-letter`伪元素。当然这要求标签内存在内容，然后利用定位即可。

```css
.first-letter {
  position: relative;
  overflow: hidden;
}
.first-letter::first-letter {
  background: deeppink;
  color: transparent;
  width: 5px;
  position: absolute;
  left: 0;
  top: 0;
  padding: 34px 0;
  margin-left: -196px;
}
```

## 1.11 使用 `list-style`实现

这个属于脑洞大开的想法。通过 `list-style`设置列表的装饰符号，并通过 `font-size`和 `color`控制 `list-style-type`的大小和颜色，然后无限放大这个 `list-style-type`，再给容器设置一个 `padding-left`即可。

```css
.list-style {
  display: list-item;
  list-style-type: square;
  list-style-position: inside;
  font-size: 600px;
  padding-left: 5px;
  background: deeppink;
  color: #ddd;
  line-height: 0;
  overflow: hidden;
}
```

# 2. 条纹边框的多种实现方式

假设有一个单标签 `<div>`，通用 CSS ：

```css
div {
  position: relative;
  width: 180px;
  height: 180px;
}
```

## 2.1 使用 `background`和 `border`配合

给 `div`添加样式：

```css
.background-border {
  background: #9c27b0;
  border: 20px dashed #2196f3;
}
```

有一点需要注意，`background-color`是从元素的边框左上角起到右下角止的。而 `background-image`却不一样，它是从 `padding`边缘的左上角起然后到 `border`的右下角边缘为止。

`background-image`由两个因素决定了其绘图的区域：

1. background positioning area: `background-origin`属性决定了其相对定位位置，默认为 `padding-box`。所以默认的背景图片绘制是从 padding box 的左上角顶点开始的。
2. background painting area: `background-clip`属性决定了绘制区间，默认为 `border-box`，所以当 `background-repeat: repeat`的情况下，背景图片会绘制到 border box 的右下角位置。

通过改变 `background-clip`属性的值就能可以自由决定背景图片右下角绘制点的位置：

```css
background-clip: border-box; /* 背景延伸到边框外沿（但在边框之下） */
background-clip: padding-box; /* 背景延伸到内边距外沿，即边框下没有背景 */
background-clip: content-box; /* 背景裁剪到内容区外沿 */
```

接下来只需要用伪元素将中间部分填充回白色即可。

```css
.background-border::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: white;
}
```

## 2.2 反过来

```css
.background-border-2 {
  background: #fff;
  background-clip: padding-box;
  border: 20px dashed #cccc99;
}
.background-border-2::before {
  content: "";
  position: absolute;
  top: -20px;
  left: -20px;
  bottom: -20px;
  right: -20px;
  background: #996699;
  z-index: -1;
}
```

# 3. 层叠顺序与堆栈上下文

根据 `z-index`的高低可以用来决定层叠的优先级。

定义两个 `div`标签，HTML 结构如下：

```html
<div class="container">
  <div class="inline-block">#divA display: inline-block</div>
  <div class="float">#divB float: left</div>
</div>
```

CSS 定义如下：

```css
.container {
  position: relative;
  background: #ddd;
}
.container > div {
  width: 200px;
  height: 200px;
}

.float {
  float: left;
  background-color: deeppink;
}

.inline-block {
  display: inline-block;
  background-color: yellowgreen;
  margin-left: -100px;
}
```

会发现如何怎样调整 `divA`和 `divB`的先后顺序，始终是 `inline-block`的 `div`叠在上方。

这里其实涉及了层叠水平（stacking level）：

![3](assets/3.png)

根据上图可以看到，`inline-block`的 `stacking level`比 `float`高，所以无论 DOM 的先后顺序，`inline-block`总是堆叠在上面。

上图表示的可能还不是非常准确，根据 W3C 官方说法准确的 7层为：

1. 形成堆叠上下文环境的元素的背景与边框。
2. 拥有负 `z-index`的子堆叠上下文元素。
3. 正常流式布局，非 `inline-block`，无 `position`定位（static 除外）的子元素。
4. 无 `position`定位（static 除外）的 `float`浮动元素。
5. 正常流式布局，`inline-block`元素，无 `position`定位（static 除外）的子元素（包括 `display: table` 和 `display:inline`）。
6. 拥有 `z-index: 0`的子堆叠上下文元素。
7. 拥有正 `z-index`的子堆叠上下文元素。

不过！重点来了，上面的比较是基于两个 `div`都没有形成**堆叠上下文**为基础的。

假设给这二个 `div`增加一个 `opacity`属性：

```css
opacity: 0.9;
```

然后就会看到，`inline-block`的 `div`不再一定叠在 `float`的 `div`之上，而是和 HTML 中 DOM 的放置顺序有关。后添加的会叠在先添加的 `div`之上。

这里的关键点就在于，添加了 `opacity: 0.9`后让两个 `div`都生成了 `stacking context（堆叠上下文）`。此时，要对两者进行层叠排列，就需要 `z-index`。

根据 MDN 资料有如下几种方法触发一个元素形成堆叠上下文：

- 根元素（`HTML`）。
- `z-index`值不为 "auto" 的绝对/相对定位。
- 一个 `z-index`值不为 "auto" 的 flex item。即父元素 `display: flex / inline-flex`。
- `opacity`属性小于 1 的元素。
- `transform`属性不为 "none" 的元素。
- `mix-blend-mode`属性值不为 "normal" 的元素。
- `perspective`值不为 "none" 的元素。
- `isolation` 属性被设置为 "isolate" 的元素。
- `position: fixed`
- 元素的 `will-change`指定了任意属性。（即使后续没有使用任何变形或动画，但因为浏览器已经默认该元素是硬件加速的，即使用 GPU 处理的）
- `webkit-overflow-scrolling`属性被设置为 "touch"。

# 4. 从倒影说起，谈谈 CSS 继承 `inherit`

给定一张有背景图的 `div` 生成倒影。

## 4.1 `-webkit-box-reflect`

> -webkit- 内核的浏览器才支持

```css
.reflect {
  -webkit-box-reflect: below;
}
```

共有四个方向可以选择，`below | above | left | right`代表上下左右。

## 4.2 `inherit`使用继承

`inherit`表示每个 CSS 属性定义的概述都指出了这个属性是默认继承的(“Inherited:Yes”)还是默认不继承的(“Inherited:no")。这决定了当没有为元素的属性指定值时该如何计算值。

可以对图片容器添加一个伪元素，使用 `background-image: inherit`继承父值的背景图，最后旋转 180 度实现倒影。

```css
.inherit {
  position: relative;
}
.inherit::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  bottom: -100%;
  background-image: inherit;
  transform: rotateX(180deg);
}
```

说到底，CSS 属性的取值就是由默认值(initial)，继承(inherit)与加权系统构成的（还包括：未设置(unset)，还原(revert)）。

# 5. 文本单行居中，多行居左，超过两行用省略号结尾

## 5.1 `text-align`

首先单行居中，多行居左

可以将 HTML 定义为：

```html
<h2>
  <p>单行居中，标题居中</p>
</h2>
```

此时，外层 `h2` 设置为居中。并让内层的 `p`居左，并且设置 `display: inline-block`，利用 `inline-block`元素可以被父级 `text-align: center`居中的特性，实现单行居中，多行居左。CSS 如下：

```css
.demo1 h2 {
  text-align: center;
}
.demo1 p {
  display: inline-block;
  text-align: left;
}
```

完成第一步，接下来实现超过两行显示省略号。

多行省略是有专门的新 CSS 属性可以实现的：

- `display: -webkit-box` 设置 display，将对象作为弹性伸缩盒子模型显示。
- `-webkit-line-clamp: 2` 限制在一个块元素显示的文本的行数。
- `-webkit-box-orient: vertical`: 规定框的子元素应该被水平或垂直排列 

利用上述三条配合 `overflow: hidden`和 `text-overflow: ellipsis`即可实现 webkit 内核下的多行省略。

CSS 如下：

```css
text-align: left;
overflow: hidden;
text-overflow: ellipsis;
display: -webkit-box;
-webkit-line-clamp: 2;
-webkit-box-orient: vertical;
```

# 6. 全兼容的多列均匀布局问题

## 6.1 `display: flex`

```css
.demo1 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
```

## 6.2 `text-align: justify`

`text-align: justify`可以用来实现两端对齐文本效果：

> `text-align` CSS 属性定义行内内容（如文字）如何相对于它的块父元素对齐。它并不控制块元素自己的对齐，只控制它的行内内容的对齐。
>
> `text-align: justify`表示文字向两侧对齐。

但使用它并没有效果，W3C 上有一段解释：

> 最后一个水平对齐属性是 `justify`，会带来自己的一些问题。CSS 中没有说明如何处理连字符，因为不同的语言有不同的连字规则。
>
> 虽然 `text-align: justify`属性是全兼容的，但是要使用它实现两端对齐，需要注意在模块之间添加 **【空格/换行符/制表符】**才能起作用。

尝试给在 HTML 中添加换行符，但仍无效。

还需要修改 `text-align-last`属性，该属性规定如何对齐文本的最后一行，并且仅在 `text-align: justify`时才起作用。

```css
.justify {
  text-align: justify;
  text-align-last: justify;
}
```

## 6.3 `text-align: justify`和伪元素

`text-align-last`兼容性不佳，另外一种就是使用 `text-align: justify`和伪元素配合。因为 `justify`只有在存在第二行的情况下，第一行才两端对齐。

```css
.justify2 {
  text-align: justify;
}
.justify2::after {
  content: "";
  display: inline-block;
  position: relative;
  width: 100%;
}
```

# 7. 消失的边界线

导航栏中经常出现，要求每行中最后一列的右边框消失。

## 7.1 `nth-child`

如果不需要兼容 `IE8-`，使用 CSS3 新增的选择器无疑是一种好方法。

```css
.demo1 li {
  border-right: 1px solid #999;
}
.demo1 li:nth-child(3n) {
  border-right: 0;
}
```

这个方案需要明确知晓一行有几列。

## 7.2 反向 `margin`

通过设置 `li`的左边框，并将 `ul`整体向左移一个像素（`li`左边框几个像素，就往左移几个像素），最后设置整个容器的 `overflow: hidden`将最左边的左边框隐藏。

```css
.demo2.container {
  overflow: hidden;
}
.demo2 li {
  border-left: 1px solid #999;
}
.demo2 ul {
  margin-left: -1px;
}
```

这个方案可以适应不同的 `li`个数。

# 8. 纯 CSS 的导航栏 Tab 切换方案

使用纯 CSS 实现的难点在于：

- 如何接收点击事件
- 如何操作相关 DOM

## 8.1 `:target`伪类选择器

> `:target`是 CSS3 新增的一个伪类，可用于选取当前活动的目标元素。就是 URL 末尾带有锚点名称 #，就可以指向文档内某个具体元素。这个被链接的元素就是目标元素，它需要有一个 id 去匹配文档中的锚点。

用 `:target`接收到点击事件：

```css
.demo1 #content1,
.demo1 #content2 {
  display: none;
}

.demo1 #content1:target,
.demo1 #content2:target {
  display: block;
}
```

然后利用 `~`兄弟选择符：

```css
.demo1 #content1:target ~ .nav li:first-child {
  background: #ff7300;
  color: #fff;
}
.demo1 #content2:target ~ .nav li:last-child {
  background: #ff7300;
  color: #fff;
}
```

注意，由于兄弟选择符只能选择元素之后的元素，所以在 DOM 树中，`content`必须在 `nav`之前才能根据 `:target`选择到对应的导航元素。

## 8.2 `input`与 `label`

除了 `<a>`标签外，还有一种方式可以接收到点击事件，就是拥有 `checked`属性的表单元素：

- `<input type="radio" />`
- `<input type="checkbox" />`

对于上面二种元素，使用 `:checked`也可以接收到点击事件。

```css
.demo2 .nav1:checked ~ .nav li:first-child {
  background: #ff7300;
  color: #fff;
}
.demo2 .nav2:checked ~ .nav li:last-child {
  background: #ff7300;
  color: #fff;
}
.demo2 .nav1:checked ~ .content > div {
  display: none;
}
.demo2 .nav1:checked ~ .content > div:first-child {
  display: block;
}
.demo2 .nav2:checked ~ .content > div {
  display: none;
}
.demo2 .nav2:checked ~ .content > div:last-child {
  display: block;
}
.demo2 .content > div {
  display: none;
}
```

## 8.3 利用锚点和 `overflow: hidden`

通过设置 `container`的 `overflow: hidden`，然后利用锚点通过 `container`内部滚动达到 tab 内容切换的效果。

```html
<div class="container">
  <div id="content31">列表1内容：123456</div>
  <div id="content32">列表2内容：abcdefghijkl</div>
</div>
```

# 9. 多列等高布局

规定下面的布局，实现多列等高布局。

```html
<div class="container">
  <div class="left">多列等高布局左</div>
  <div class="right">多列等高布局右</div>
</div>
```

通常只是要求多列的背景色一致。

## 9.1 使用 `display: flex`的方式实现

```css
.container1 {
  display: flex;
  flex-direction: row;
}
```

## 9.2 使用正负 `margin`与 `padding`相冲的方式实现

```css
.container2 {
  overflow: hidden;
}
.container2 .left,
.container2 .right {
  float: left;
  padding-bottom: 5000px;
  margin-bottom: -5000px;
}
```

## 9.3 父容器背景色实现

```css
.container3 {
  background: deeppink;
  width: 400px;
  overflow: hidden;
}
.container3 .left {
  float: left;
  background: none;
}
.container3 .right {
  float: left;
  background: yellowgreen;
}
```

## 9.4 父容器多重背景色 - 线性渐变

```css
.container4 {
  height: 120px;
  width: 400px;
  background: linear-gradient(90deg, deeppink 50%, yellowgreen 0);
}

.container4 .left,
.container4 .right {
  float: left;
  background: none;
}
```

## 9.5 `display: table-cell`实现

```css
.container5 {
  display: table;
}
.container5 .left,
.container5 .right {
  display: table-cell;
}
```

# 10. 单标签实现斜线

假定高宽各为 100px ，如何使用单个标签实现斜线效果。

## 10.1 CSS3 旋转缩放

使用伪元素画出一条直线，然后绕 div 中心旋转 45deg，最后放大 1.414 倍。

```css
.demo1 {
  position: relative;
  overflow: hidden;
}
.demo1::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-bottom: 1px solid deeppink;
  transform-origin: bottom center;
  transform: rotateZ(45deg) scale(1.414);
}
```

## 10.2 线性渐变

```css
.demo2 {
  background: linear-gradient(
    45deg,
    transparent 49.5%,
    deeppink 49.5%,
    deeppink 50.5%,
    transparent 50.5%
  );
}
```

## 10.3 伪元素 + 三角形

利用 CSS border 可以实现一个三角形，利用伪元素画二个略不同的三角形，将二者堆叠露出中间的边线即可。

```css
.demo3 {
  position: relative;
  background: #fff;
}
.demo3::before,
.demo3::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 0;
}
.demo3::before {
  border: 49px solid transparent;
  border-left-color: deeppink;
  border-bottom-color: deeppink;
}
.demo3::after {
  border: 48px solid transparent;
  border-left-color: #fff;
  border-bottom-color: #fff;
}
```

## 10.4 `clip-path`

使用 `clip-path`的 `polygon`来伪元素上画二个三角形，挡在元素上仅留下中间的一条线，形成斜线。

```css
.demo4 {
  position: relative;
  background: deeppink;
}
.demo4::before,
.demo4::after {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: #fff;
}
.demo4::before {
  clip-path: polygon(0 0, 0 100px, 100px 100px, 0 0);
}
.demo4::after {
  clip-path: polygon(100px 99px, 100px 0, 1px 0, 100px 99px);
}
```

## 10.5 直接画线

也可以利用 `polygon`画一个非常细的四边形作为斜线。

```css
.demo5 {
  background: deeppink;
  clip-path: polygon(1px 0, 100px 99px, 99px 100px, -1px 0);
}
```

# 11. IFC, BFC, GFC 与 FFC

FC 即 Formatting Contexts，格式化上下文。`*FC`可以称作视觉格式化模型。CSS 视觉格式化模型（visual formatting model）是用来处理文档并将它显示在视觉媒体上的机制。这是 CSS 的一个基础概念。

比较常见的是 CSS2.1 规范中的 IFC（Inline Formatting Contexts）和 BFC（Block Formatting Contexts）。后两个则是 CSS3 的新增规范，GFC（GridLayout Formatting Contexts）和 FFC（Flex Formatting Contexts）。

FC 是网页 CSS 视觉渲染的一部分，用于决定盒子模型的布局，其子元素将如何定位以及和其他元素的关系和相互作用。

## 11.1 基础概念

### Box

Box 是 CSS 布局的对象和基本单位，直观点讲就是一个磁面是由很多个 Box 组成的，元素的类型和 `display`属性决定了 Box 的类型。

1. block-level Box：当元素的 `display`属性为 `block, list-item, table`时，它就是块级元素。块级元素视觉上呈现为块，竖直排列。

   每个块级元素至少生成一个块级盒（block-level Box）参与 BFC，它被称为主要块级盒（principal block-level Box）。一些元素，比如 `<li>`会生成额外的盒来放置项目符号，不过多数元素只生成一个主要块级盒。

2. inline-level Box：当元素的 `display`属性为 `inline, inline-block, inline-table`时，称它为行内级元素。视觉上它将内容与其他行内级元素排列为多行。段落内容，文本或图片都是行内级元素。行内级元素生成行内极盒（inline-level Box），参与 IFC。

3. flex container：当元素的 `display`属性为 `flex, inline-flex`时，称它为弹性容器。`display: flex`会导致一个元素生成一个块级（block-level）弹性容器框。`display: inline-flex`会导致一个元素生成一个行内级（inline-level）弹性容器框。

4. grid container：当元素的 `display`属性为 `grid, inline-grid`时，称它为栅格容器。

### 块容器盒（block container box）

它只包含其他块级盒，或只包含行内级盒。

## 11.2 IFC（Inline Formatting Contexts）

行内级格式化上下文用来规定行内级盒子的格式化规则。

IFC 仅在一个块级元素中仅包含内联级别元素时才会生成。

布局规则：

1. 内部的盒子会在水平方向，一个接一个地放置。
2. 这些盒子垂直方向的起点从包含它们的块盒子的顶部开始。
3. 摆放这些盒子的时候，它们在水平方向上的 `padding, border, margin` 所占用的空间都会被考虑在内。
4. 在垂直方向上，这些框可能会以不同形式来对齐（`vertical-align`）：它们可能会使用底部或顶部对齐，也可能通过其内部的文本基线（`baseline`）对齐。
5. 能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的行框（line box）。行框的宽度是由包含块和存在的浮动来决定的。
6. IFC 中的 line box 一般左右边都贴紧其包含块，但是会因为 float 元素的存在发生变化。float 元素会位于 IFC 与 line box 之间，使得 line box 宽度缩短。
7. IFC 中的 line box 高度由 CSS 行高计算规则来确定。同一个 IFC 下的多个 line box 高度可能会不同（比如一行包含了较高的图片，另一行只有文本）。
8. 当 inline-level boxes 的总宽度少于包含它们的 line box 时，其水平渲染规则由 `text-align`属性来决定，如果值为 `justify`，那么浏览器会对 inline-boxes（注意不是 inline-table 和 inline-block boxes）中的文字和空格做出拉伸。
9. 当一个 inline box 超过 line box 的宽度时，它会被分割成多个 boxes，这些 boxes 被分布在多个 line box 里。如果一个 inline box 不能被分割（比如只包含单个字符，或 `word-breaking`机制被禁用，或该行内框受 `white-space`属性值为 `no wrap / pre`的影响），那么这个 inline box 将溢出这个 line box。

IFC 具体实用在：

- 水平居中：当一个块要在环境中水平居中时，设置其为 inline-block 则会在外层产生 IFC，通过设置父容器 `text-align: center`则可以使其水平居中。
- 垂直居中：创建一个 IFC，用其中一个元素撑开父元素的高度，然后设置其 `vertical-align: middle`，其行内元素则可以在此父元素下垂直居中。

### 使用 IFC 实现多行文本的水平垂直居中

```css
.demo1 {
  text-align: center;
  width: 400px;
  line-height: 300px;
  height: 300px;
  background-color: #ccc;
}
.demo1 p {
  display: inline-block;
  vertical-align: middle;
  font-size: 18px;
  line-height: normal;
}
```

## 11.3 BFC（Block Formatting Contexts）

块格式化上下文是页面上的一个独立的渲染区域，容器里面的子元素不会在布局上影响外面的元素。它是决定块盒子的布局及浮动元素相互影响的一个因素。

下列情况下将创建一个块格式化上下文：

1. 根元素或其他包含它的元素
2. 浮动元素（`float`不为 `none`）
3. 绝对定位元素（`position`为 `absolute / fixed`）
4. 行内块（`display: inline-block`）
5. 表格单元格（`display: table-cell` HTML 表格单元格默认属性）
6. 表格标题（`display: table-caption` HTML 表格标题默认属性）
7. `overflow`的值不为 `visible`的元素
8. 弹性盒子（`display`为 `flex / inline-flex`）

块格式化上下文包括了创建该上下文的元素的所有子元素，但不包括创建了新的块格式化上下文的子元素。

包含浮动元素的块塌缩，清除浮动等都是 BFC 的应用场景。

## 11.4 GFC（Grid Formatting Contexts）

## 11.5 FFC（Flex Formatting Contexts）

要注意的是弹性容器不是块容器，下列适用于块布局的属性不适用于弹性布局：

1. 在 CSS3 多列布局模块中定义的 `column-*`属性不适用于弹性容器。
2. `float`和 `clear`属性对于弹性项没有作用，并不会把它带离文档流。然而，浮动属性仍然会通过影响 `display`属性的计算值而影响 box 的生成。
3. `vertical-align`属性对于弹性项没有作用。
4. `::first-line`和 `::first-letter`伪元素不适用于弹性容器，而且弹性容器不会为它们的祖先提供第一个格式化的行或第一个字母。

# 12. 几个特殊且实用的伪类选择器

## 12.1 `:root`

`:root`伪类匹配文档树的根元素。应用到 HTML，`:root`即表示为 `<html>`元素，除了优先级更高外，相当于 html 标签选择器。

语法样式：

```css
:root { background: #000 }
```

在使用 CSS 变量时，声明全局 CSS 变量时 `:root`会很有用。

## 12.2 `:empty`

`:empty`伪类，代表没有子元素的元素。

这里的子元素只计算元素结点及文本（包括空格）。注释，运行指令不考虑在内。

```html
<div class="demo1">
  <div>1</div>
  <div>&nbsp;</div>
  <div></div>
</div>
```

```css
.demo1 div {
  height: 20px;
  background: blue;
  border: 1px solid red;
}
.demo1 div:empty {
  display: none;
}
```

## 12.3 `:not`

CSS 否定伪类，`:not(x)`可以选择除某个元素之外的所有元素。x 不能包含另外一个否定选择器。

关于 `:not`伪类有几个有趣的现象：

- 它不像其他伪类，它不会增加选择器的优先级。它的优先级即为它参数选择器的优先级。
- 使用 `:not(*)`将匹配任何非元素的元素，因此这个规则将永远不会被应用。
- 这个选择器只会应用在一个元素上，你不能用它排除所有祖先元素。比如 `body:not(table) a`将依旧会应用在 `table`内部的 `<a>`上，因为 `<tr>`还是会把 `:not`匹配到的。

## 12.4 `:target`

`:target`代表一个特殊的元素，它需要一个 id 去匹配文档 URI 的片段标识符。

# 13. CSS 自定义属性

很多人喜欢称之为 CSS 变量，准确的说 CSS 没有变量。只有自定义属性！

```css
/* 声明一个变量 */
:root {
    --bgColor: #000;
}
```

使用它：

```css
.demo1 {
  background: var(--bgColor);
}
```

## 13.1 CSS 自定义属性的层叠与作用域

CSS 自定义属性是支持继承的，但说成级联或层叠可能更贴切。

> 在 CSS 中，一个元素的实际属性是由其自身属性以及其祖先元素的属性层叠得到的。CSS 自定义属性也支持层叠的特性，当一个属性没有在当前元素定义时，则会转而使用其祖先元素的属性。当前元素定义的属性会覆盖祖先元素的同名属性。

```css
.demo2 {
  --bgColor: red; /* 这里会覆盖祖先元素定义的 --bgColor 属性 */
  background: var(--bgColor);
}
```

> CSS 自定义属性是不支持 !important 声明的。

## 13.2 组合使用

CSS 自定义属性可以进行组合使用：

```css
:root {
  --word: "Hello";
  --word-second: "World";
}
.demo3::before {
  content: var(--word) "_" var(--word-second);
}
```

## 13.3 计算属性 `calc()`

CSS 自定义属性还可以结合 CSS3 的 `calc()`函数一起使用。

```css
:root {
  --margin: 10px;
}
.demo4 {
  border: 1px solid var(--bgColor);
  text-indent: calc(var(--margin) * 10);
}
```

## 13.4 CSS 自定义属性的用途

### 代码更加符合 DRY （Don't repeat yourself）原则

一个页面的配色通常有几种主要颜色，同一个颜色会在多个地方用到。之前是使用 LESS, SASS 等预处理器的变量系统完成的，现在可以直接使用 CSS 自定义属性来完成。

### 精简代码，减少冗余

一般而言，使用媒体查询时，会将需要响应改变的属性全部罗列一遍。

### 方便从 JS 中读/写，统一修改

CSS 自定义属性可以和 JS 交互。

```js
// 读取
const root = getComputedStyle(document.documentElement)
const cssVariable = root.getPropertyValue('--bgColor').trim()
console.log(cssVariable)

// 写入
document.documentElement.style.setProperty('--bgColor', '#0f0')
```

# 14. CSS 命名方式是否有必要规范及 BEM

遵循一套 CSS 命名规范能够在一定程度上避免修改 CSS 所产生的诸如这个样式是否在其他地方被引用？这个样式能否删除等问题。

规范中需要注意到的几部分：

- 布局：以`g`为命名空间，例如：`g-wrap`, `g-header`, `g-content`

- 状态：以`s`为命名空间，表示动态的，具有交互性质的状态，例如：`s-current`, `s-selected`

- 工具：以`u`为命名空间，表示不耦合业务逻辑的，可复用的工具，例如：`u-clearfix`, `u-ellipsis`

- 组件：以`m`为命名空间，表示可复用，移植的组件模块，例如：`m-slider`, `m-dropMenu`

- 钩子：以`j`为命名空间，表示特定给 Javascript 调用的类名，例如：`j-request`, `j-open`

## 14.1 BEM

BEM 的意思就是块（block），元素（element），修饰符（modifier），是由 Yandex 团队提出的一种 CSS Class 命名方法。

类似于：

```css
.block {}
.block__element {}
.block--modifier {}
```

- 就一个页面来说，开发者其实知道它是由各类模块构成的。

- 而元素就是块中的一部分，具有某种功能。元素是依赖上下文的。

- 元素只有处于他们应该属于的块的上下文中时才有意义。修饰符则表示块或元素的一些状态，例如 hover, active, disabled 等。

BEM 中，一个项目中的块名必须是唯一的，明确指出它所描述的是哪个块。相同块的实例可以有相同的名字。一个块范围内的一种元素的名字也必须是唯一的，一种元素也可以重复出现。

# 15. 关于 `reset.css`

`reset.css`的目的是为了消除不同的浏览器在默认样式上的不同表现。

## 15.1 YUI 版本的 `reset.css`

早先 YUI 的一个版本的 `reset.css`：

```css
body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea, p, blockquote, th, td {
  margin: 0;
  padding: 0;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
fieldset, img {
  border: 0;
}
address, caption, cite, code, dfn, em, strong, th, var {
  font-style: normal;
  font-weight: normal;
}
ol, ul {
  list-style: none;
}
caption, th {
  text-align: left;
}
h1, h2, h3, h4, h5, h6 {
  font-size: 100%;
  font-weight: normal;
}
q:before, q:after {
  content: '';
}
abbr, acronym {
  border: 0;
}
```

这个版本的 reset 是使用一刀切的方式，让所有元素统一在同一起跑线上。但为此，对于 `div, dt, li, th, td`等本身没有默认 `padding`和 `margin`的标签重复设置造成了冗余代码，且将 `h1-h6`这类本身有具体语义化的元素一刀切的去掉了它们本身的特性。

## 15.2 `normalize.css`

[normalize.css v5.0.0](https://necolas.github.io/normalize.css/5.0.0/normalize.css) 做了些什么？

1. 统一了一些元素在所有浏览器下的表现，保护有用的浏览器默认样式而不是完全清零它们，让它们在各个浏览器下表现一致。
2. 为大部分元素提供一般化的表现。
3. 修复了一些浏览器的 Bug，并且让它们在所有浏览器下保持一致性。
4. 通过一些巧妙的细节提升了 CSS 的可用性。
5. 提供了详尽的文档让开发者知道，不同元素在不同浏览器下的渲染规则。

# 16. 字体 `font-family`

## 16.1 字体的分类

就 Web 常用的一些字体而言，大致可以分为这几种字体类型：

- serif 衬线
- sans-serif 无衬线
- monospace 等宽
- fantasy 梦幻
- cuisive 草体

其实大体上分为**衬线字体**和**无衬线字体**，等宽字体中也有衬线等宽和无衬线等宽字体。这 5 个分类是 `font-family`的 5 个可用字体系列取值。

也就是说，上述 5 个名字，代表的并非某个特定字体，而是一系列字体，这些通用的名称允许用户代理（通常就是浏览器）从相应集合中选择一款字体。

这也就解释了，`font-family`中的 family 家庭的意思。也就是不单单指一个，而是可以指定多个。

## 16.2 serif -- 衬线字体

衬线的意思是在字符笔画末端有叫做衬线的小细节的额外装饰，而且笔画的粗细会有所不同，这些细节在大写字母中特别明显。

### 宋体（SimSun）

Windows 下大部分浏览器的默认中文字体，是为适应印刷术而出现的一种汉字字体。笔画有粗细变化，是一种衬线字体，宋体在小字号下的显示效果还可以，但是字号一大体验就很差了，一般不建议做标题字体使用。

### Times New Roman

MAC 平台 Safari 下默认的英文字体，是最常见且广为人知的西文衬线字体之一，众多网页浏览器和文字处理软件都是用它作为默认字体。

## 16.3 sans-serif -- 无衬线字体

sans 的意思是无。专指西文中没有衬线的字体，并与汉字字体中的黑体相对应。与衬线字体相反，该类字体通常是机械的和统一线条的，它们往往拥有相同的曲率，笔直的线条，锐利的转角。

中文下，无衬线字体就是黑体，黑体字也被称为方体或等线体，没有衬线装饰，字形端庄，笔画横平竖直，笔迹全部一样精细。

### 微软雅黑（Microsoft Yahei）

从 Windows Vista 开始，微软提供的新字体，一款无衬线的黑体类字体，显著提高了字体的显示效果。现在这款字体已经成为 Windows 浏览器最值得使用的中文字体。

### 华文黑体（STHeiti），华文细黑（STXihei）

属于同一字体家庭系列，MAC OS X 10.6 之前的简体中文系统界面的默认中文字体，正常粗细就是华文细黑，粗体下则是华文黑体。

### 黑体-简（Heiti SC）

从 MAC OS X 10.6 开始，黑体-简代替华文黑体用作简体中文系统界面默认字体，苹果生态最常用的字体之一，包括 iPhone，iPad 等设备用的也是这款字体。

### 冬青黑体（Hiragino Sans GB）

又叫苹果丽黑，Hiragino 是字游工房设计的系列字体名称。是一款清新的专业印刷字体，小字号时足够清晰，MAC OS X 10.6 开始自带有 W3 和 W6 。

### Helvetica，Helvetica Neue

被广泛用于全世界使用拉丁字母和西里尔字母的国家。Helvetica 是苹果电脑的默认字体，微软常用的 Arial 字体也来自于它。

### Arial

Windows 平台上默认的无衬线西文字体，有多种变体，比例及字重（weight）和 Helvetica 极为相近。

### Verdana

无衬线字体，优点在于它在小字上仍结构清晰端整，阅读辨识容易。

### Tahoma

十分常见的无衬线字体，字体结构和 Verdana 很相似，其字元间距较小，而且对 Unicode 字集的支持范围较大。许多不喜欢 Arial 字体的人常常会改用 Tahoma 来代替，除了是因为 Tahoma 很容易取得之外，也是因为 Tahoma 没有一些 Arial 为人诟病的缺点，例如大写“i”与小写“L”难以分辨等。

## 16.4 monospace -- 等宽字体

等宽字体是指字符宽度相同的电脑字体，常见于 IDE 或编辑器中，每个字母的宽度相等，通常用于计算机相关书籍中排版代码块。

除了 IDE ，技术文章中的代码块经常也是用等宽字体进行排版。

### Consolas

这是一套等宽的字体，属无衬线字体。这个字体使用了微软的 ClearType 字型平滑技术，主要是设计做为代码的显示字型之用，特别之处是它的“0”字加入了斜撇，以方便与字母“O”分辨。

> ClearType：是由微软在其操作系统中提供的屏幕亚像素微调字体平滑工具，让 Windows 字体更加漂亮。在 Windows XP 平台上，这项技术默认是关闭的，到了 Windows Vista 才默认开启。

```css
font-family: Consolas, "Liberation Mono", Menlo, Courier, monospace;
```

上面是 Github 代码区块的字体设置，可以看到默认是 `Consolas`，紧接着的几个都是其他等宽字体。如果用户的系统中都没有预装这些字体，则会匹配最后一个 `monospace`，它会让浏览器从用户系统中选择一个等宽字体进行展示。

## 16.5 fantasy -- 梦幻 和 cuisive -- 草体

这二种字体在浏览器中不常用，在各个浏览器中有明显的差异。

## 16.6 中文字体的兼容写法

一些中文字体，例如 `font-family: '宋体'`，由于字符编码的问题，少部分浏览器解释这行代码的时候，中文会出现乱码。这个时候，设定的字体将无法正常显示。

所以通常会转化成对应的英文写法或者是对应的 `unicode` 编码：`font-family: '宋体'` -> `font-family: '\5b8b\4f53'`。

`\5b8b\4f53` 是宋体两个中文字的 unicode 编码表示。类似的写法还有：

- 黑体：`\9ED1\4F53`

- 微软雅黑：`\5FAE\8F6F\96C5\9ED1`

- 华文细黑：`\534E\6587\7EC6\9ED1`

- 华文黑体：`\534E\6587\9ED1\4F53`

> `Unicode编码`：人们希望在一套系统里能够容纳所有字符，Unicode 编码解决传统的字符编码方案的局限性，每个字符占用 2 字节。这样理论上一共最多可以表示 2^16 (即65536) 个字符。基本满足各种语言的使用。

## 16.7 字体定义的细节

定义字体时，何时需要字体两端添加引号？

```css
p {
  font-family: 'Microsoft YaHei', '黑体-简', '\5b8b\4f53';
}
```

当字体名字中间有空格，中文字体名及 Unicode 字符编码表示的中文字体，为了保证兼容性，都建议在字体两端添加单引号或者双引号。

## 16.8 字体定义顺序

字体定义顺序是一门学问，通常而言，定义字体时会定义多个字体或字体系列。

```css
body {
  font-family: tahoma, arial, 'Hiragino Sans GB', '\5b8b\4f53', sans-serif;
}
```

1. 使用 `tahoma` 作为首选西文字体，小字号下结构清晰端正，阅读辨识容易；

2. 用户电脑未安装 `tohoma`，则选择 `arial` 作为替代的西文字体，覆盖 Windows 和 MAC OS；

3. `Hiragino Sans GB` 为冬青黑体，首选的中文字体，保证了 MAC 用户的观看体验；

4. Windows 下没有预装冬青黑体，则使用 `'\5b8b\4f53'` 宋体作为替代的中文字体方案，小字号下有着不错的效果；

5. 最后使用无衬线系列字体 `sans-serif` 结尾，保证旧版本操作系统用户能选中一款电脑预装的无衬线字体，向下兼容。

## 16.9 字体书写规则

1. 兼顾中西：中文与西文（英文）都要考虑到。

2. 西文在前，中文在后：由于大部分中文字体带有的英文部分并不好看，而英文字体中大多数不包含中文。所以通常会先进行英文字体的声明，选择最优的英文字体，这样不影响中文字体的选择。

3. 兼顾多操作系统：MAC OS 下的很多中文字体在 Windows 下都没有预装，所以要针对不同操作系统定义字体。

4. 兼顾旧操作系统，以字体族系列 `serif` 和 `sans-serif` 结尾：当使用一些非常新的字体时，要考虑向下兼容，兼顾一些极旧的操作系统。使用字体族系列 `serif` 和 `sans-serif` 结尾总归是不错的选择。

# 17. 再探究字体的渲染规则及fallback机制

## 17.1 字体是如何渲染的

### A：解码

1. Web 服务器返回的 HTTP 头中的 `Content-Type: text/html; charset=` 信息，一般拥有最高的优先级。

2. 网页本身 `meta header` 中的 `Context-Type` 信息的 `charset` 部分，当 HTTP 头中未指定编码或者本地文件时使用这部分判断。

3. 如前两条都没有找到，浏览器菜单里一般允许用户强制指定编码。

### B：分段

编码确定后，网页就被解码成了 Unicode 字符流。因为得到的文本可能是很多种语言混杂的，里面可能有中文，英文等，它们可能要用不同的字体显示：

为了统一处理所有这些复杂的情况，会将文本分为由不同语言组成的小段，在有的文本布局引擎里，这个步骤称为 "itemize"，分解后的文本段常被称作 "text run"，但是具体划分的规则可能根据不同的引擎有所区别。

### C：字体匹配

分段之后，则要根据设置的不同 `font-family` 对每一段文字进行字体匹配。这里遵循字体的 fallback 机制。

fallback 机制：在操作系统介面和网页等现代排版环境下，如果指定用字体A来显示某字符X，但该字体并不支持这个字符（甚至该字体当前不可用），排版引擎通常不会直接放弃，它会根据一个预先记好的列表来尝试寻找能显示字符X的字体，如果找到字体B能够渲染，那就用字体B来显示字符X。字体B就是当前这个情况的 fallback。

以 `font-family: Helvetica, Arial;` 为例，Arial 字体就是一种 fallback ，当指定的第一选择字体 Helvetica 不可用时，则尝试去寻找 Arial 是否可用。

系统所包含字体不只和系统预装的字体有关，还和系统上安装的软件有关。

### D：渲染

当确定了字体以后，就可以将文本，字体等参数一起交给具体的排版引擎，生成字形和位置，然后根据不同的平台调用不同的字体 rasterizer 将字形转换成最后显示在屏幕上的图案。一般浏览器都会选择平台原生的 rasterizer。比如 Mac OS X 下用 Core Graphics，Linux/X11 下用 FreeType，Windows 下用 GDI/DirectWrite 等。

## 17.2 影响字体渲染的因素

影响字体的渲染因素有很多，总的来说：

- Web 页面的 `lang`, `charset`和浏览器本身的设置都会对默认字体产生影响

- 不同操作系统，不同浏览器的默认中文，英文字体的设置也都有区别

### A：serif 和 sans-serif 不总是生效

以 `font-family: sans-serif` 为例，虽然希望浏览器选择一款非衬线字体展示文字，但是可以通过修改浏览器的默认配置来使得 sans-serif 展示一款 serif 字体。在 Chrome 浏览中，可以通过设置->外观->自定义字体 来改变。

# 18. 使用 `position: sticky` 实现粘性布局

CSS 中 position 的取值大概有以下几个：

```css
{
  position: static;
  position: relative;
  position: absolute;
  position: fixed;
  position: inherit;
  position: initial;
  position: unset;
  position: sticky;
}
```

sticky 英文字面意思是粘，粘贴，所以一般称之为粘性定位。这是一个结合了 `relative` 和 `fixed` 两种定位功能于一体的特殊定位，适用于一些特殊场景。

首先元素会先按照普通文档流定位，然后相对于该元素在流中的 flow root(BFC) 和 containing block（最近的块级祖先元素）定位。

而后，元素定位表现为在跨越特定阈值前为相对定位，之后为固定定位。

这个特定阈值指的是 top, right, bottom, left 之一。

## 18.1 生效规则

`position: sticky` 的生效是有一定限制的：

1. 必须指定 top, bottom, left, right 四个阈值中的一个，才可使粘性定位生效。

当 `top` 和 `bottom` 同时设置时，`top` 生效的优先级高。`left` 和 `right` 同时设置时，`left` 的优先级高。

2. 设定为 `position: sticky` 元素的任意父节点的 `overflow` 属性必须是 `visible`，否则 sticky 不会生效。

如果元素的任意父节点定位设置为 `position: overflow`，则父容器无法进行滚动，所以 `position: sticky` 元素也不会有滚动然后固定的情况。

3. 达到设置的阈值，就是元素表现为 `relative` 还是 `fixed` 是根据元素是否达到设定了的阈值决定的。

# 19. 深入探讨 CSS 特性检测 `@supports` 与 Modernizr

一些新的 CSS 属性能极大提升用户体验以及减少工作量，并且在当下的前端氛围下：

- 很多实验性功能未成为标准却被大量使用

- 需要兼容多终端，多浏览器，而各浏览器对某一新功能的实现表现的天差地别

所以有了优雅降级和渐进增强的说法，在这种背景下，又想使用新的技术给用户提供更好的体验，又想做好回退机制保证低版本终端用户的基本体验，CSS 特性检测就应运而生了。

什么是 CSS 特性检测？

就是针对不同浏览器终端，判断当前浏览器对某个特性是否支持。运用 CSS 特性检测，我们可以在支持当前特性的浏览器环境下使用新的技术，在不支持的浏览器环境下做出某些回退机制。

## 19.1 CSS `@supports`

传统的 CSS 特性检测都是通过 Javascript 实现的，但现在也可以使用原生 CSS 来实现。

CSS `@supports` 通过 CSS 语法来实现特性检测，并在内部 CSS 区块中写入如果特性检测通过希望实现的 CSS 语句。

语法：

```css
@supports <supports_condition> {
  /* specific rules */
}
```

举个例子：

```css
div {
  position: fixed;
}

@supports (position:sticky) {
  div {
    position: sticky;
  }
}
```

上面的例子中首先定义了 div 的 `position: fixed`，紧接着 `@supports (position:sticky)` 则是特性检测，如果当前浏览器支持 `@supports` 语法，并且支持 `position:sticky` 语法，则将 div 设置为 `position: sticky`。

## 19.2 `@supports not` && `@supports and` && `@supports or`

### `@supports not` -- 非

not 操作符可以放在任何表达式的前面来产生一个新的表达式，新的表达式为原表达式的值的否定。

```css
@supports not (background: linear-gradient(90deg, red, yellow)) {
  div {
    background: red;
  }
}
```

### `@supports and` -- 与

多重判断，类似 javascript 的 `&&` 运算符。用 and 操作符连接两个原始的表达式。只有两个原始表达式的值都为真，生成的表达式才为真，反之为假。

and 可以连接任意多个表达式。

```css
p {
    overflow: hidden;
    text-overflow: ellipsis;
}
@supports (display: -webkit-box) and (-webkit-line-clamp: 2) and (-webkit-box-orient: vertical) {
    p {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}
```

### `@supports or` -- 或

理解了 and 就很好理解 or，它与 javascript 的 `||` 运算符类似，表达式中只要有一个为真，则结果就为真。

```css
@supports (background: -webkit-linear-gradient(0deg, yellow, red)) or (background: linear-gradient(90deg, yellow, red)) {
    h1 {
        background: -webkit-linear-gradient(0deg, yellow, red);
        background: linear-gradient(90deg, yellow, red);
    }
}
```

渐进增强：（progressive enhancement）针对低版本浏览器进行构建页面，保证最基本的功能，然后再针对高级浏览器进行效果、交互等改进和追加功能达到更好的用户体验。

## 19.3 CSS.supports()

它是作为 `@supports` 的另一种形式出现的，使得我们可以使用 javascript 的方式来获得 CSS 属性的支持情况。

## 19.4 modernizr

以前通常是使用 javascript 来进行特性检测的，其中 modernizr 就是其中最为出色的佼佼者。

[modernizr](https://github.com/Modernizr/Modernizr)

modernizr 的使用方法：

```javascript
// 假设已经引用了 modernizr
Modernizr.on('testname', function(result) {
  if (result) {
    console.log('passed');
  } else {
    console.log('failed');
  }
});

// 或者类似 CSS.supports()
Modernizr.testAllProps('background', 'linear-gradient(90deg, #888, #ccc)'); // return true/false
```

## 19.5 特性检测原理

如果嫌引入整个 modernizr 库太大，页面又不支持 `@supports`，其实也可以使用简单的 javascript 来实现。

如果只是要检测某个属性是否被支持，可以直接检测 `element.style` 上是否存在即可。如：

```javascript
const root = document.documentElement;
if('background' in root) {
    console.log('background');
}
```

当然，元素可能有 `background` 属性，但是不支持具体的 `linear-gradient()` 属性值。这个时候该如何检测呢？只需要将具体的值赋给某一元素，再查询这个属性值能否被读取。

```javascript
const el = document.createElement('div');
el.style.backgroundImage = "linear-gradient(90deg, #888, #ccc)";
if (el.style.backgroundImage) {
    console.log("支持");
} else {
    console.log("不支持");
}
```

因为做这种特定属性值判断的时候会有一个 CSS 赋值操作，所以应该选取用于判断的元素应该是一个隐藏在页面上的元素。

## 19.6 各种方式间的优劣

- 原生的 `@supports` 的性能肯定是最好的，而且元需引入外部 javascript，首推这个。但需要考虑兼容性的问题。

- Modernizr 功能强大，兼容性好。但需要引入外部 javascript。如果只是进行某几个特性检测，会有杀鸡用牛刀的感觉。

- 针对需要的特性检测，可以使用 javascript 实现一个简单的函数。

```typescript
export function cssTest(property: string, value?: string): boolean {
    let el = document.getElementById('test-display-none');
    if (!el) {
        el = document.createElement('div');
        el.id = 'test-display-none';
        el.style.display = 'none';
        // document.body.appendChild(el);
        // 最好不要使用同一个 el。否则
        // cssTest('backgroundImage', 'linear-gradient(90deg, #888, #ccc)') 返回 true
        // cssTest('backgroundImage', 'linear-gradient1(90deg, #888, #ccc)') 返回 true 因为上一行正确设置了
    }

    if (value) {
        el.style[property] = value;
        if (el.style[property]) {
            return true;
        }
    } else {
        return property in el.style;
    }

    return false;
}
```

# 20. 巧妙地制作背景色渐变动画

按照常规的想法是配合 `animation` 实现，但是过渡动画会变成逐帧动画。

这是因为线性渐变是不支持动画 `animation` 的。

如果使用单纯的单色背景是可以使用 `animation` 产生渐变动画的。

所以 `background` 是支持动画的，但是 `linear-gradient()` 和 `radial-gradient()` 是不支持的。

## 20.1 通过 `background-position` 模拟渐变动画

通过 `background-size: 200% 100%` 将图片的宽度设置为两倍于背景区的宽度。再通过改变 `background-position`的 x 轴初始位置来移动图片，由于背景图设置的大小是背景区的两倍，所以移动是由 `0% 0%` 到 `100% 0%`。

- `background-position`: 指定图片的初始位置。这个初始位置是相对于 `background-origin` 定义的背景位置图层来决定的。

- `background-size`: 设置背景图大小。当取值为百分比时，表示指定背景图片相对背景区的百分比大小。当设置两个参数时，第一个值指定图片的宽度，第二个值指定图片的高度。

## 20.2 通过 `background-size` 模拟渐变动画

通过改变 `background-size` 的第一个值，将背景图的大小由3倍背景区大小向1倍背景区大小过渡，形成动画效果。

设置 `background-position: 100% 0`，是因为默认值 `0% 0%` 的情况下，会导致动画最左侧的颜色不变，这样不大自然。

## 20.3 通过 `transform` 模拟渐变动画

上面两种方式由于使用了 `background-position` 和 `background-size`，并且在渐变中改变了这两个属性，会导致页面不断地进行重绘（repaint），对页面消耗非常严重。

对于伪元素配合 `transform` 进行渐变动画，通过元素的 `after` 或 `before` 伪元素，在伪元素内画出一个足够大的背景，再通过 `transform` 对伪元素进行位置变换来模拟渐变动画。

## 20.4 hue-rotate

使用 `filter: hue-rotate` 可以很轻松的实现渐变动画

## 20.5 CSS @Property

`@Property CSS at-rule` 是 CSS Houdini API 的一部分。它允许开发者显式地定义 CSS 的自定义属性，允许进行属性类型检查，设定默认值以及定义该自定义属性是否可以被继承。

`@Property` 其实就是灵活度更高的 `CSS 自定义属性`。也可以称其为 `CSS Houdini 自定义属性`。

- `@property --property-name`：就是自定义属性的名称，定义后可在 CSS 中通过 `var(--property-name)` 进行引用。

- `syntax`：自定义属性的语法规则，也可以理解为自定义属性的类型

- `inherits`：是否允许继承

- `initial-value`：初始值

在上述例子中：

```css
@property --colorA {
    syntax: "<color>";
    inherits: false;
    initial-value: fuchsia;
}
```

将原本定义在 `background` 上的过渡效果嫁接到了 `@property color` 上。而 CSS 是支持一个颜色变换到另外一个颜色的。通过这种方式实现了渐变背景色的过渡动画。

# 21. 盒子端 CSS 动画性能提升研究

不同于传统的 PC Web 或者是移动 Web，在客厅盒子端，接大屏显示器下。许多能流畅运行的 Web 动画，受限于硬件水平，在盒子端的表现往往不尽如人意。

基于此，对于 Web 动画的性能问题。仅仅停留在感觉已经优化的 OK 之上是不够的。想要在盒子端跑出高性能接近 60FPS 的流畅动画，就必须要刨根问底，深挖每一处可以提升的方法。

## 21.1 流畅动画的标准

理论上说，FPS 越高，动画会越流畅。目前大多数设备的屏幕刷新率为 60次/秒。所以通常来讲 FPS 为 60frame/s 时动画效果最好，也就是每帧的消耗时间为 16.67ms。

直观感受，不同帧率的体验：

- 帧率能够达到 50 ~ 60 FPS 的动画将会相当流畅，让人倍感舒适

- 帧率在 30 ~ 50 FPS 之间的动画，因各人敏感程度不同，舒适度因人而异

- 帧率在 30 FPS 以下的动画，让人感觉到明显的卡顿和不适感

- 帧率波动很大的动画，亦会使人感觉到卡顿

## 21.2 盒子端动画优化

经过对比，在盒子端 CSS 动画的性能要优于 Javascript 动画。而在 CSS 动画里，使用 GPU 硬件加速的动画性能要优于不使用硬件加速的性能。

所以在盒子端，实现一个 Web 动画，优先级是：

GPU 硬件加速 CSS 动画 > 非硬件加速的 CSS 动画 > Javascript 动画

## 21.3 动画性能上报分析

要有优化，就必须得有数据做为支撑，用来对比优化前后是否有提升。而对于动画而言，衡量一个动画的标准也就是 FPS 值。

这里通过 `requestAnimationFrame` 这个函数近似的得到动画运行时的帧率。

原理是，正常情况下 `requestAnimationFrame` 这个方法在一秒内会执行 60 次，也就是在不掉帧的情况下，假设动画在时间 A 开始执行，在时间 B 结束，耗时 x ms。而在这段时间内 `requestAnimationFrame` 一共执行了 n 次，则此段动画的帧率大致为：`n / (B - A)`。

## 21.4 Web 每一帧的渲染

要想达到 60 FPS，每帧的预算时间仅比 16 毫秒多一点（1 秒 / 60 = 16.67 毫秒）。但实际上，浏览器有整理工作要做，因此剩下时间其实也就 10 毫秒左右。

而每一帧，如果有必要，我们能够控制的部分，也是像素到屏幕管道中的关键步骤如下：

完整的像素管道：JS / CSS > 样式 > 布局 > 绘制 > 合成：

1. JavaScript。一般来说，我们会使用 Javascript 来实现一些视觉变化的效果。比如用 JQuery 的 animate 函数做一个动画，对一个数据集进行排序或者往页面里添加一些 DOM 元素等。当然，除了 Javascript，还有其他一些常用方法也可以实现视觉变化效果，比如：CSS Animations，Transitions 和 Web Animation API。

2. 样式计算。此过程是根据匹配选择器计算出哪些元素应用哪些 CSS 规则的过程。知道规则后，将应用规则并计算每个元素的最终样式。

3. 布局。在知道对一个元素应用哪些规则之后，浏览器即可开始计算它要占据的空间大小及其在屏幕的位置。网页的布局模式意味着一个元素可能影响其他元素。例如 元素的宽度一般会影响其子元素的宽度以及树中各处的节点。因此对于浏览器来说，布局过程是经常发生的。

4. 绘制。绘制是填充像素的过程。它涉及绘制文本，颜色，图像，边框和阴影，基本上包括元素的每个可视部分。绘制一般是在多个表面（通常称为层）上完成的。

5. 合成。由于页面的各部分可能被绘制到多层，由此它们需要按正确的顺序绘制到屏幕上，以便正确渲染页面。对于与另一元素重叠的元素来说，这点特别重要，因为一个错误就可能使一个元素错误地出现在另一个元素的上层。

当然，不一定每帧都总是会经过管道每个部分的处理。我们的目标就是，每一帧动画，对于上述的管道流程，能避免则避免，不能避免则最大限度优化。

## 21.5 优化动画步骤

优化目标是使用 GPU 硬件加速的基础上，更深入的去优化 CSS 动画。步骤为：

### 1. 精简 DOM，合理布局

精简 DOM 结构在任何时候都是对页面有帮助的。

### 2. 使用 transform 代替 left, top, 减少使用耗性能的样式

现代浏览器在完成以下四种属性的动画时，消耗成本较低：

- `position（位置）`：`transform: translate(npx, npx)`

- `scale（比例缩放）`：`transform: scale(n)`

- `rotation（旋转）`：` transform: rotate(ndeg)`

- `opacity（透明度）`：`opacity: 0...1`

如果可以，尽量只使用以上四种属性去控制动画。

不同样式在消耗性能上面是不同的，改变一些属性的开销比改变其他属性要多，因此更可能使动画卡顿。

例如，与改变元素的文本颜色相比，改变元素的 `box-shadow` 将需要开销大很多的绘图操作。改变元素的 `width` 可能比改变其 `transform` 要多一些开销。如 `box-shadow` 属性，从渲染角度来讲十分耗性能，原因就是与其他样式相比，它们的绘制代码执行时间过长。

也就是说，如果一个耗性能严重的样式经常需要重绘，那么你就会遇到性能问题。其次你要知道，没有不变的事情，在今天性能很差的样式，可能明天就被优化了，并且浏览器之间也存在差异。

开启 GPU 硬件加速

归根结底，上述四种属性的动画消耗较低的原因是会开启 GPU 硬件加速。动画元素生成了自己的图形层（GraphicsLayer）。

通常而言，开启 GPU 加速的方法我们可以使用：

`will-change: transform`

这会使声明了该样式属性的元素生成一个图形层，告诉浏览器接下来该元素将会进行 transform 变换，让浏览器提前做好准备。

注意，使用 `will-change` 并不一定会有性能的提升，因为即使浏览器预料到会有这些更改，依然会为这些属性运行布局和绘制流程。这样做的唯一好处是，创建新的图层本身代价很高，而与其等到需要时匆忙地创建，不如一开始就直接创建好。

对于 Safari 及一些旧版本浏览器，它们不能识别 `will-change`，则需要使用某种 translate 3D 进行 hack，通常会使用：

`transform: translateZ(0)`

所以，正常而言，在生产环境下，可能需要使用如下代码来开启硬件加速：

```css
{
  will-change: transform;
  transform: translateZ(0);
}
```

### 3. 控制频繁动画的层级关系

动画层级的控制的意思是尽量让需要进行 CSS 动画的元素的 `z-index` 保持在页面最上方，避免浏览器创建不必要的图形层，这能够很好的提升渲染性能。

图形层（GraphicLayer）是一个浏览器渲染原理相关的知识（WebKit/blink 内核下）。它能对动画进行加速，但同时也存在相应的加速坑！

简单来讲就是浏览器为了提升动画的性能，为了在动画的每一帧中不必每次重新绘制整个页面。在特定方式下会触发生成一个合成层，合成层拥有单独的图形层。

需要进行动画的元素包含在这个合成层之下，这样动画的每一帧只需要去重新绘制这个图形层即可，从而达到了提升动画性能的目的。

满足以下任意情况便会创建层：

- 硬件加速的 iframe 元素（比如 iframe 嵌入的页面中有合成层）

- 硬件加速的插件，比如 flash 等

- 使用加速视频解码的 `<video>` 元素

- 3D 或者硬件加速的 2D Canvas 元素

- 对自己的 opacity 做 CSS 动画或使用一个动画变换的元素

- 拥有加速 CSS 过滤器的元素

- 元素有一个包含复合层的后代节点（换句话说，就是一个元素拥有一个子元素，该子元素在自己的层里）

- 元素有一个 `z-index` 较低且包含一个复合层的兄弟元素

但最后一点，也就是可能会存在坑的地方，首先要明确两点：

1. 希望动画得到 GPU 硬件加速，会使用 `transform: translateZ()` 这样的方式生成一个图形层

2. 图形层虽好，但不是越多越好。每一帧的渲染内核都会遍历计算当前所有的图形层，并计算它们下一帧的重绘区域，所以过多的图形层计算也会给渲染造成性能影响。

例如：

```html
<div class="container">
    <div class="swiper">轮播图</div>
    <ul class="list">
        <li>列表li</li>
        <li>列表li</li>
        <li>列表li</li>
        <li>列表li</li>
    </ul>
</div>

<style>
    .swiper {
        position: static;
        animation: 10s move infinite;
    }

    .list {
        position: relative;
    }

    @keyframes move {
        100% {
            transform: translate3d(10px, 0, 0);
        }
    }
</style>
```

由于给 `.swiper` 添加了 `translate3d` 动画，所以它会生成一个图形层，在开发者工具 -> Rendering 中勾选 Layer Borders 可以看到黄色边框即代表生成了一个独立的复合层，拥有独立的图形层。

但是在上述例子中，并没有给下面的 `list` 添加任何能够触发生成图形层的属性，但是它同样也有黄色的边框。

原因就在于：`元素有一个 z-index 较低且包含一个复合层的兄弟元素`。我们并不希望 `list` 元素也生成图形层。但是由于 CSS 层级定义的原因，下面的 `list` 的层级是高于 `swiper` 的，所以它只能被动的也生成了一个图形层。

要避免这种情况，就需要明确的设置 `.swiper` 的层级高于 `.list`：

```css
.swiper {
    position: relative;
    animation: 10s move infinite;
    z-index: 100;
}
```

### 4. 考虑使用 `will-change`

`will-change` 为开发者提供了一种告知浏览器该元素会有哪些变化的方法，这样浏览器可以在元素属性真正发生变化之前提前做好对应的优化准备工作。这种优化可以将一部分复杂的计算工作提前准备好，使页面的反应更为快速灵敏。

值得注意的是，用好这个属性并不容易：

- 在一些低端盒子上，`will-change` 会导致很多小问题：比如会使图片模糊，有的时候很容易适得其反，所以使用的时候还需要多加测试

- 不要将 `will-change` 应用到大多数元素上：浏览器已经尽力尝试去优化一切可以优化的东西了。一些更强力的优化如果与 `will-change` 结合在一起的话，可能会消耗很多的机器资源。过度使用的话，反而会导致页面响应缓慢或者消耗非常多的资源。

- 有节制的使用：通常当元素恢复到初始状态时，浏览器会弃掉之前做的优化工作。但是如果直接在样式表中显式声明了 `will-change` 属性，则表示目标元素可能会经常变化，浏览器会将优化工作保存得比之前更久。所以最佳实践是当元素变化之前和之后通过脚本来切换 `will-change` 的值。

- 不要过早的应用 `will-change` 优化：如果页面在性能方面没什么问题，则不要添加该属性来榨取那一丁点的速度。它的设计初衷是作为最后的优化手段，用来尝试解决现有的性能问题。而不是用来预防性能问题的。过度使用 `will-change` 会导致生成大量图层，进而导致大量的内存占用，并导致更复杂的渲染过程。

- 给它足够的工作时间：这个属性是用来让页面开发者告知浏览器哪些属性可能会变化的。然后浏览器可以选择在变化发生之前提前去做一些工作。所以应该尝试去找到一些方法提前一定时间量去获知元素可能发生的变化，然后为它加上 `will-change`。

### 5. 使用 dev-tool 时间线 timeline 观察，找出导致高耗时，掉帧的关键操作

1. 对比屏幕快照，观察每一帧包含的内容及具体的操作

2. 找到掉帧的那一帧，分析该帧内不同步骤的耗时占比，进行有针对性的优化

3. 观察是否存在内存泄漏

# 22. 纯 CSS 方式实现 CSS 动画的暂停与播放

在 CSS3 animation 中，有这样一个属性可以播放，暂停动画：

```css
animation-play-state: paused | running;
```

该属性用来定义一个动画是否运行或者暂停。可以通过查询它来确定动画是否正在运行。另外，它的值可以被设置为暂停和恢复的动画的重放。

## 22.1 hover 伪类实现

```css
.btn:hover ~ .animation {
    animation-play-state: paused;
}
```

这个方法无法实现点击切换 暂停/播放 状态。

## 22.2 checked

使用 `radio` 标签的 `checked` 伪类，加上 `<label for>` 实现纯 CSS 捕获点击事件。

```css
#stop:checked ~ .animation {
    animation-play-state: paused;
}

#play:checked ~ .animation {
    animation-play-state: running;
}
```

# 23. CSS 关键字 initial、inherit 、unset 和 revert

`position` 有多少取值，通常的问题是 `static`, `relative`, `absolute` 和 `fixed`，此外还有 `sticky`。其实，除此之外 CSS 属性通常还可以设置下面几个值：

- `initial` （默认）

- `inherit` （继承）

- `unset`

- `revert`

## 23.1 initial

这个关键字用于设置 CSS 属性为它的默认值，可作用于任何 CSS 样式。（IE 不支持）

## 23.2 inherit

每个 CSS 属性都有一个特性就是：这个属性必然是默认继承的（`inherited: yes`）或是默认不继承的（`inherited: no`）其中之一。

譬如，`background-color` 是不会继承父元素的 `background-color` 的。

## 23.3 可继承属性

默认为 `inherited: yes` 的属性：

- 所有元素可继承：`visibility` 和 `cursor`

- 内联元素可继承：`letter-spacing`, `word-spacing`, `white-space`, `line-height`, `color`, `font`, `font-family`, `font-size`, `font-style`, `font-variant`, `font-weight`, `text-decoration`, `text-transform`, `direction`

- 块状元素可继承：`text-indent` 和 `text-align`

- 列表元素可继承：`list-style`, `list-style-type`, `list-style-position`, `list-style-image`

- 表格元素可继承：`border-collapse`

## 23.4 unset

从字面上理解就是不设置，其实它是 `initial` 和 `inherit` 的组合。

也就是说如果我们给一个 CSS 属性设置了 `unset` 的话：

1. 如果该属性是默认继承属性，该值等同于 `inherit`

2. 如果该属性是非继承属性，该值等同于 `initial`

```html
<div class="father">
    <div class="children">子级元素一</div>
    <div class="children unset">子级元素二</div>
</div>

<style>
    .father {
        color: red;
        border: 1px solid black;
    }

    .children {
        color: green;
        border: 1px solid blue;
    }

    .unset {
        color: unset;
        border: unset;
    }
</style>
```

在上面的例子中，对于 `.unset` 而言：

1. 由于 `color` 是可继承样式，所以最终表现为父级的颜色 `red`

2. 由于 `border` 是不可继承样式，最终表现为 `border: initial`，也就是默认的样式，无边框

## 23.5 revert

`revert` 是一个更新的关键字，源自于 CSS 3。直译为 `恢复`。

它与关键字 `unset` 非常类似，在大部分情况下，他们的作用是一模一样的。唯一的区别是：

- `revert`：属性应用了该值后，将还原到具有由浏览器或用户创建的自定义样式表（浏览器侧设置）设置的值

- `unset`：属性应用了该值后，样式将完全被还原

# 24. 纯 CSS 实现瀑布流布局

## 24.1 `display: flex`

横向 flex 布局嵌套多列纵向 flex 布局

## 24.2 `column-count`

`column-count` 元素内容将被划分的最佳列数

`break-inside: avoid;` 避免在元素内部插入分页符，每列最后一个元素的一小部分会出现在下一列的顶端

## 24.3 `display: grid`

`grid-template-columns`, `grid-template-rows` 分割行列

`grid-row` 控制每个 item 所占格子的大小

# 25. vh, vw, vmin, vmax

## 25.1 `vw` and `vh`

1. 1vw 等于 1/100 的视口宽度（Viewport Width）

2. 1vh 等于 1/100 的视口高度（Viewport Height）

综上，对于一个页面而言，它的视窗高度就是 100vh，宽度就是 100vw。

响应式web设计离不开百分比。但是，CSS 的百分比并不是所有问题的最佳解决方案。因为 CSS 的宽度是相对于包含它的最近的父元素的宽度的。所以如果你就是想用视口（viewport）的宽度或高度，而不是父元素的，那就应该使用 `vw` 和 `vh`。

如果想要得到一个同屏幕等高或等宽的框，只需要简单的CSS：

```css
.slide {
  width: 100vw;
}
/* 或者 */
.slide {
  height: 100vh;
}
```

## 25.2 `vmin` and `vmax`

1. `vmin`：是当前 `vw` 和 `vh` 中较小的值

2. `vmax`：是当前 `vw` 和 `vh` 中较大的值

这二个单位在横竖屏切换中十分有用。

# 26. 奇妙的 `-webkit-background-clip: text`

何为 `-webkit-background-clip: text`。

`background-clip` 的意思就是背景裁剪，它的作用是设置元素的背景（背景图片或颜色）的填充规则。其中 `background-clip: text` 就是以区块内的文字作为裁剪区域向外裁剪，文字的背景即为区块的背景，文字之外的区域都将被裁剪掉。由于兼容性问题，通常使用它时会使用：`-webkit-background-clip: text`。

```css
div {
    font-size: 180px;
    font-weight: bold;
    color: deeppink;
    background: url('/img.jpg');
    background-size: contain;
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    color: transparent;
}
```

其实要注意的是 `color: transparent`，如果不将文字设置为透明，只能看到带颜色的文本。只有设置为透明，才能看到文本轮廓的背景图片。

## 26.1 实现文字渐变效果

## 26.2 背景渐变动画 & 文字裁剪

## 26.3 给文字增加高光动画

## 26.4 按钮填充效果

## 26.5 图片窥探效果

# 27. conic-gradient 角向渐变

## 27.1 API

```css
{
  background: conic-gradient(deeppink, yellowgreen);
}
```

## 27.2 与线性渐变及径向渐变的异同

- `linear-gradient` 线性渐变的方向是一条直线，可以是任何角度

- `radial-gradient` 径向渐变是从圆心点以椭圆形状向外扩散

- `conic-gradient` 角向渐变是以圆心为起始点，然后以顺时针方向绕中心实现渐变效果

## 27.3 实现颜色表盘

除了 `rgb()` 颜色表示法外，还有 `hsl()` 表示法

`hsl()` 被定义为色相-饱和度-明度（Hue-saturation-lightness）

- 色相（H）是色彩的基本属性，就是平常所说的颜色名称，如红色，黄色等

- 饱和度（S）是指色彩的纯度，越高色彩越纯，低则逐渐变灰，取0-100%的数值

- 明度（V），亮度（L），取 0-100%

## 27.4 配合百分比使用

可以指定角向渐变每一段的比例，以实现饼图。

```css
{
  background: conic-gradient(deeppink 0, deeppink 30%, yellowgreen 30%, yellowgreen 70%, teal 70%, teal 100%);
}
```

在这里我们分别指定了 0%-30%, 30%-70%, 70%-100% 三个区间的颜色，下面是另一种写法：

```css
{
  background: conic-gradient(deeppink 0 30%, yellowgreen 0 70%, teal 0 100%);
}
```

要注意的是先定义的颜色会层叠在后定义的颜色之上，所以这种写法其实表示的是：

1. 0-30% 的区间使用 `deeppink`

2. 0-70% 的区间使用 `yellowgreen`

3. 0-100% 的区间使用 `teal`

## 27.5 配合 `background-size` 使用

使用了百分比控制了区间，再配合使用 `background-size` 就可以实现各种同步贴图。

## 27.6 重复角向渐变

和线性渐变与径向渐变一样，角向渐变也存在重复角向渐变：`repeating-conic-gradient`

## 27.7 动画与 `mix-blend-mode`

## 27.8 渐变颜色条

# 28. 颜色混合模式 `mix-blend-mode`

CSS3 新增了一个属性 `mix-blend-mode`，通常称之为混合模式。

## 28.1 概述

`mix-blend-mode` 可取的值：

```css
{
  mix-blend-mode: normal;         // 正常
  mix-blend-mode: multiply;       // 正片叠底
  mix-blend-mode: screen;         // 滤色
  mix-blend-mode: overlay;        // 叠加
  mix-blend-mode: darken;         // 变暗
  mix-blend-mode: lighten;        // 变亮
  mix-blend-mode: color-dodge;    // 颜色减淡
  mix-blend-mode: color-burn;     // 颜色加深
  mix-blend-mode: hard-light;     // 强光
  mix-blend-mode: soft-light;     // 柔光
  mix-blend-mode: difference;     // 差值
  mix-blend-mode: exclusion;      // 排除
  mix-blend-mode: hue;            // 色相
  mix-blend-mode: saturation;     // 饱和度
  mix-blend-mode: color;          // 颜色
  mix-blend-mode: luminosity;     // 亮度
  
  mix-blend-mode: initial;
  mix-blend-mode: inherit;
  mix-blend-mode: unset;
}
```

Photoshop 中高级进阶系列之一 - 图层混合模式原理：

- A 基础型混合模式：利用图层的不透明度及填充不透明度来控制与下面的图像进行混合。

  1. Normal 正常

  2. Dissolve 溶解

- B 降暗图像型混合模式（减色模式）：滤除图像中的亮调图像，从而达到使图像变暗的目的。

  3. Darken 变暗

  4. Multiply 正片叠底

  5. Color Burn 颜色加深

  6. Linear Burn 线性加深

  7. Darker Color 深色

- C 提亮图像型混合模式（加色模式）：滤除图像中的暗调图像，从而达到使图像变亮的目的。

  8. Lighten 变亮

  9. Screen 滤色

  10. Color Dodge 颜色减淡

  11. Linear Dodge (Add) 线性减淡（添加）

  12. Lighter Color 浅色

- D 融合图像型混合模式：用于不同程度的对上，下两图层中的图像进行融合。此类混合模式还可以在一定程度上提高图像的对比度。

  13. Overlay 叠加

  14. Soft Light 柔光

  15. Hard Light 强光

  16. Vivid Light 亮光

  17. Linear Light 线性光

  18. Pin Light 点光

  19. Hard Mix 实色混合

- E 变异图像型混合模式：用于制作各种变异图像效果。

  20. Difference 差值

  21. Exclusion 排除

  22. Subtract 减去

  23. Divide 划分

- F 色彩叠加型混合模式：依据图像的色相，饱和度等基本属性，完成于下面图像之间的混合。

  24. Hue 色相

  25. Saturation 饱和度

  26. Color 颜色

  27. Luminosity 明度

当然以上是 PS 的混合模式，数量比 CSS 多一些，但是分类是通用的。

## 28.2 实例

## 28.3 使用 `mix-blend-mode: screen` 滤色模式制作 loading 效果

这里使用 `mix-blend-mode: screen` 滤色模式，这是一种提亮图形混合模式。`screen` 指的是两个颜色同时投影到一个屏幕上的合成颜色。具体做法是把两个颜色都反相，相乘，然后再反相。简单记为“让白更白，而黑不变”。

## 28.4 `mix-blend-mode: difference` 差值模式

差值模式的效果则是先查看每个通道中的颜色信息，比较底色和绘图色，用较亮的像素点的像素值减去较暗的像素点的像素值。与白色混合将使底色反相，与黑色混合则不产生变化。

## 28.5 文字故障效果

# 29. `background-blend-mode`

除了 `mix-blend-mode`，CSS 还提供了一个 `background-blend-mode`，也就是背景的混合模式。

- 它可以是背景图片与背景图片的混合。

- 也可以是背景图片与背景色之间的混合。

## 29.1 基础应用

## 29.2 background-blend-mode: difference 制作黑白反向动画

需要透明背景的黑白动图

## 29.3 制作 hover 效果

使用 `mix-blend-mode` 和 `background-blend-mode` 理论上只要图片主色是黑色，底色是白色（不是透明色），都可以通过这二个样式动态的改变图片的颜色。

## 29.4 制作文字背景图

使用 `mix-blend-mode` 也可以实现 `background-clip` 的文字渐变效果，只需要构造出黑色文字，白色底色的文字 `div`，再叠在图片上即可。

# 30. 奇妙的 CSS shapes(CSS图形)

## 30.1 CSS3

在 CSS3 之前，我们能做的只有矩形，在 CSS3 出来后，通过：

- `border-radius`

- `border`

- `transform`

- 伪元素配合

- gradient 渐变

能够作出非常多的几何图形。

- 三角形

- 切角

- 梯形

- 五边形

- 六边形

- 八边形

- 五角星

- 六角星

- 八角星

- 十二角星

- 椭圆

## 30.2 clip-path

上面讲述的是使用传统 CSS3 的方式绘制几何图形。

CSS 新属性 `clip-path` 裁剪路径，可以很便捷的生成各种几何图形。对应的正是 SVG 中的 path。

API:

```css
{
  /* Keyword values */
  clip-path: none;

  /* Image values */
  clip-path: url(resources.svg#c1);

  /* Box values
  clip-path: fill-box;
  clip-path: stroke-box;
  clip-path: view-box;
  clip-path: margin-box;
  clip-path: border-box;
  clip-path: padding-box;
  clip-path: content-box;
  */

  /* Geometry values */
  clip-path: inset(100px 50px);
  clip-path: circle(50px at 0 100px);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);

  /* Box and geometry values combined */
  clip-path: padding-box circle(50px at 0 100px);

  /* Global values */
  clip-path: inherit;
  clip-path: initial;
  clip-path: unset;
}
```

例如：`clip-path: circle(50px at 50px 50px)` 表示在元素的（50px, 50px）处（以元素的左上角为坐标起点），裁剪生成一个半径为 50px 的圆。

在整个 `clip-path` 属性中，最为重要的当属 `polygon`，可以利用 `polygon` 生成任意多边形。

## 30.3 clip-path 动画

`clip-path` 另外一个强大之处在于可以进行 CSS transtion 与 CSS animation，也就是过渡和动画。

## 30.4 从完整的图形分割成多个小图形

## 30.5 `clip-path` 动画的局限

进行过渡的两个状态，坐标顶点的数量必须一致。

也就是说如果想要从三角形过渡到矩形，假设 `clip-path` 分别是：

- 三角形：`clip-path: polygon(50% 0, 0 100%, 100% 0)`

- 矩形：`clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%)`

动画是没有过渡效果的，原因就是从 3 个坐标点变换到了 4 个坐标点。

因此这里需要一个讨巧的办法，在三角形的表示方法中，使用四个坐标，并让其中两个坐标重合在一起即可：

- 将上面的三角形改成：`clip-path: polygon(50% 0, 50% 0, 0 100%, 100% 0)`

## 30.6 N边形过渡动画

## 30.7 N polygon

## 30.8 `shape-outside`

`shape-outside` 它也能制造各种几何图形的能力，但是它只能和浮动 `float` 一起使用。

它的 API：

```css
{
  /* Keyword values */
  shape-outside: none;
  shape-outside: margin-box;
  shape-outside: content-box;
  shape-outside: border-box;
  shape-outside: padding-box;
  
  /* Function values */
  shape-outside: circle();
  shape-outside: ellipse();
  shape-outside: inset(10px 10px 10px 10px);
  shape-outside: polygon(10px 10px, 20px 20px, 30px 30px);
  
  /* <url> value */
  shape-outside: url(image.png);
  
  /* Gradient value */
  shape-outside: linear-gradient(45deg, rgba(255, 255, 255, 0) 150px, red 150px);
  
  /* Global values */
  shape-outside: initial;
  shape-outside: inherit;
  shape-outside: unset;
}
```

配合 `float` 可以实现让文字根据图形的轮廓在其周围排列，而不再仅仅局限于在矩形（图片本身无论背景是不是透明，都是一个矩形）轮廓周围排列。

## 30.9 图文混排（平行四边形）

## 30.10 心形，菱形

# 31. 纯 CSS 实现波浪效果

使用纯 CSS 实现波浪效果困难的原因主要是没有很好的方法实现贝塞尔曲线。

借助其他的方法（SVG，Canvas）则相对比较简单。

## 31.1 使用 SVG 实现波浪效果

画出三次贝塞尔曲线的核心在于 `<path id="wave-2" fill="rgba(154, 205, 50, .8)" d="M 0 100 C 140.6 94.24 45.08 106.32 200 100 A 95 95 0 0 1 0 100 Z">`

## 31.2 使用 canvas 实现波浪效果

主要是利用 `ctx.bezierCurveTo()` 绘制三次贝塞尔曲线实现。

## 31.3 纯 CSS 实现波浪效果

我们都知道通过给一个正方形设置 `border-radius: 50%` 可以得到一个圆形。

如果 `border-radius` 接近 50%，但是不到 50%。并将这个图形滚动起来，它的边缘就会形成类似波浪的效果。

# 32. 使用 CSS 属性 `contain`，控制页面的重绘与重排

`contain` 属性允许我们指定特定的 DOM 元素和它的子元素，让它们能够独立于整个 DOM 树结构之外。目的是能够让浏览器有能力只对部分元素进行重绘，重排，而不必每次都针对整个页面。

API：

```css
{
  /* No layout containment. */
  contain: none;
  /* Turn on size containment for an element. */
  contain: size;
  /* Turn on layout containment for an element. */
  contain: layout;
  /* Turn on style containment for an element. */
  contain: style;
  /* Turn on paint containment for an element. */
  contain: paint;

  /* Turn on containment for layout, paint, and size. */
  contain: strict;
  /* Turn on containment for layout, and paint. */
  contain: content;
}
```

## 32.1 `contain: size`

设置了 `contain: size` 的元素渲染不会受到其子元素内容的影响。

换言之，正常情况下父元素的高度会因为子元素的增多而被撑高，但设置了 `contain: size` 后，子元素数量的变化将不再影响父元素的样式布局。

## 32.2 `contain: style`

据说被暂时移除了

## 32.3 `contain: paint`

设置了 `contain: paint` 的元素此子元素不会在此元素的边界之外被展示。因此，如果元素不在屏幕上或以其他方式设置为不可见了，则能保证它的后代不可见且不会被渲染。

有点像设置了 `overflow: hidden`，即明确告知用户代理（User Agent），子元素的内容不会超过元素的边界，所以超出部分不需要渲染。

另外，如果元素处于屏幕以外了，那么用户代理会直接忽略渲染这些元素，从而能更快的渲染其他内容。

## 32.4 `contain: layout`

设置了 `contain: layout` 的元素会告知用户代理，此元素内部样式的变化不会引起元素外部的样式变化，反之亦然。

DEMO 效果不明显！！！

## 32.5 `contain: strict` | `contain: content`

这二个属性其实就是上述几个属性的聚合效果：

- `contain: strict`：同时开启 layout, style, paint, size 的功能，相当于 `contain: size layout paint`

- `contain: content`：同时开启 layout, style, paint 的功能，相当于 `contain: layout paint`

另外 `contain:` 本身就可以同时定义几个。

# 33. fixed 定位失效

在许多情况下，`position: fixed` 会失效。MDN 用一句话概括了这种情况：当元素祖先的 transform 属性非 none 时，容器由视口改为改祖先。

那么为何会发生这种情况？这个问题就涉及到了堆叠上下文（Stacking Context）的概念。

## 33.1 Stacking Context -- 堆叠上下文

指的是 HTML 元素的三维概念，这些 HTML 元素在一条假想的相对于面向（电脑屏幕的）视窗或者网页的用户的 Z 轴上延伸，HTML 元素依据自身属性按照优先级顺序占用层叠上下文的空间。

简而言之，生成的堆叠上下文会影响该元素的层叠关系与定位关系。

而由于堆叠上下文的创建，该元素会影响其子元素的固定定位。设置了 `position: fixed` 的子元素将不会基于 viewport 定位，而是基于这个父元素。

## 33.2 创建堆叠上下文的方式

在 #3 中曾经提到过堆叠上下文的创建方式，再补充一些（*为新增的）：

- 根元素（`HTML`）
- `z-index`值不为 "auto" 的绝对/相对定位。
- 一个 `z-index`值不为 "auto" 的 flex item。即父元素 `display: flex / inline-flex`。
- `opacity`属性小于 1 的元素。
- `transform`属性不为 "none" 的元素。
- `mix-blend-mode`属性值不为 "normal" 的元素。
- *`filter`值不为"none"的元素。
- `perspective`值不为 "none" 的元素。
- `isolation` 属性被设置为 "isolate" 的元素。
- `position: fixed`
- 元素的 `will-change`指定了任意属性。（即使后续没有使用任何变形或动画，但因为浏览器已经默认该元素是硬件加速的，即使用 GPU 处理的）
- `webkit-overflow-scrolling`属性被设置为 "touch"。
- *`backdrop-filter`值不为"none"的元素。

然后还需要验证以上任意情况是否都会使其子元素的 `position: fixed` 失效。

验证结果为：（Windows10 Chrome 版本 112.0.5615.140（正式版本） （64 位））

1. transform 属性值不为 "none"的元素
2. filter值不为“none”的元素
3. perspective值不为“none”的元素
4. 在 will-change 中指定了任意 CSS 属性
5. 设置了 transform-style: preserve-3d 的元素
6. 设置了 contain: paint | layout | content | strict 的元素
7. 设置了 backdrop-filter 的元素

另外要注意的是，在不同内核浏览器下的表现也会有区别。

# 34. CSS 动画技巧与细节

## 34.1 正负旋转相消

让祖父元素正向旋转，父级元素反向旋转。因为一正一反的旋转，且缓动函数一样，会让整个元素看上去依然是静止的。但这是因为正反旋转互相抵消了，此时如果再给元素加上 3D 转换，并且在内层动画旋转上额外的在 X 轴多一些旋转，就能产生一些特殊的效果。

## 34.2 动画相同，缓动不同

如果不想使用 CSS 默认提供的 `linear`, `ease-in`, `ease-out` 等缓动函数的话，可以自定义 `cubic-bezier(1, 1, 0, 0)`，可以通过网站 [cubic-bezier.com](https://cubic-bezier.com/) 调整并得到你所需要的缓动函数的对应 cubic-bezier。

## 34.3 过渡取消

圆点一开始是透明的，当 hover 时，会赋予它背景颜色，并取消了它的过渡，所以它会直接显示。

hover 离开后，它原本的过渡又回来了，所以它会从有颜色慢慢消失。

# 35. CSS 滤镜技巧与细节

API:

```css
{
  filter: blur(5px);
  filter: brightness(0.4);
  filter: contrast(200%);
  filter: drop-shadow(16px 16px 20px blue);
  filter: grayscale(50%);
  filter: hue-rotate(90deg);
  filter: invert(75%);
  filter: opacity(25%);
  filter: saturate(30%);
  filter: sepia(60%);

  /* Apply multiple filters */
  filter: contrast(175%) brightness(3%);

  /* Global values */
  filter: inherit;
  filter: initial;
  filter: unset;
}
```

## 35.1 基本用法

## 35.2 hover 增亮图片

brightness 表示亮度

contrast 表示对比度

## 35.3 生成图像阴影

通过生成阴影的方式大多是 `box-shadow`, `filter: drop-shadow()`, `text-shadow`。但是它们只能生成单色阴影。

如果要跨过这层限制，那可以使用伪元素生成一个与原图一样大小的新图叠加在原图下方，并利用 `filter: blur()` 并调整其亮度/对比度，透明度等，制作出一个虚幻的影子，伪装成原图的阴影效果。

## 35.4 blur 混合 contrast 产生融合效果

两个滤镜单独的作用为：

1. `filter: blur()`：设置高斯模糊效果

2. `filter: contrast()`：调整对比度

但如果进行以下设置：

1. 画布上设置了 `filter: contrast()`。

2. 进行动画的图形需要是画布的子元素，并被设置了 `filter: blur()`。

此时当二个图形相交时，边与边会产生一种边界融合的效果，通过对比度滤镜把高斯模糊的模糊边缘干掉，再利用高斯模糊实现融合效果。

## 35.5 燃烧的火焰

## 35.6 文字融合动画

## 35.7 注意事项

1. CSS 滤镜可以给同个元素同时定义多个，如：`filter: contrast(150%) brightness(1.5)`，但是先后顺序不同产生的效果也是不一样的。

2. 滤镜动画需要大量计算，不断的重绘页面，属于非常消耗性能的动画。

3. `blur()` 混合 `contrast()` 滤镜效果，设置不同的颜色会产生不同的效果。

# 36. `text-fill-color` 与 `color` 的异同

`text-fill-color` 会覆盖 `color` 所定义的字体颜色，也就是前者的优先级更高。


## 36.1 差异

在 CSS3 之前，`color` 无法设置为 `transparent`，而 `text-fill-color` 可以。但在 CSS3 中，`transparent` 被重新定义为一个真实的颜色，任何需要颜色的地方都可以被设置了。

所以两者最大的差异，可以认为是 `text-fill-color` 的概念是借鉴了 SVG（SVG 中使用 `fill` 属性给图形文本上色），而 `color` 则是传统意义上的 CSS 概念。

# 37. 两行 CSS 代码实现图片任意颜色赋色

## 37.1 使用 `background-blend-mode: lighten` 实现

任意图片只要是主体黑色纯色，背景白色。然后利用 `background-blend-mode` 然后在图片下面叠一层其他颜色，通过 `lighten` 混合模式就可以实现图片主体颜色变为其他颜色的效果。

要注意的是图片主体颜色应该只有黑色纯色，并且背景是纯白色而不能是透明的！

# 38. 纯 CSS 导航栏下划线跟随效果

# 39. 使用 `scale` 和 `transform-origin` 控制动画方向

## 39.1 `transform: scale()` 实现运动

`scale()` 用于修改元素的大小。可以通过向量形式定义的缩放值来放大或缩小元素，同时可以在不同的方向（x/y/z）设置不同的缩放值。

## 39.2 `transform-origin` 实现运动方向

`transform-origin` 可以更改一个元素变形（transform）的原点，该属性可以使用一个，两个或三个值来指定，每个值表示一个方向上的偏移量。

## 39.3 拓展

## 39.4 直接使用定位实现

# 40. Pure CSS Button Effect

# 41. 选择器：`:focus-within`

CSS 的伪类使用一个冒号（:），CSS 伪元素使用两个冒号（::）。

当然也有例外，对于 CSS2 中已经有的伪元素，例如：`before`，单冒号和双冒号是作用是一样的。

所以如果网站只需要兼容 webkit, firefox, opera 等现代浏览器或者是移动端页面，建议按 CSS3 标准对于伪元素使用双冒号的写法。如果要兼容低版本的 IE 浏览器，使用 CSS2 的单冒号写法更安全。

## 41.1 伪类选择器：`:focus-within`

它表示一个元素获得焦点，或者该元素的后代元素获得焦点都可以触发 `:focus-within`。

## 41.2 `:focus-within` 的冒泡性

这个属性有点类似 Javascript 的事件冒泡，即可以从获得焦点的元素开始一直冒泡到根元素 `html`，都可以触发 `:focus-within` 事件。

## 41.3 input

## 41.4 TAB 切换导航

## 41.5 配合 `:placeholder-shown` 伪类实现表单效果

`:placeholder-shown` 大概意思就是，当 input 类型标签使用了 placeholder 属性有了默认占位文字后会触发此伪类样式。那么再配合 `:not()` 伪类则可以改变 placeholder 文字消失后的样式。

## 41.6 离屏导航

# 42. 滚动视差

滚动视差（Parallax Scrolling）是指让多层背景以不同的速度移动，形成立体的运动效果，带来出色的视觉体验。作为网页设计的热点趋势，越来越多的网站应用了这项技术。

通常而言，滚动视差在前端需要辅助 Javascript 才能实现。当然，其实 CSS 也能够实现。

## 42.1 认识 `background-attachment`

`background-attachment`：如果指定了 `background-image`，那么它可以用来决定背景在视口中固定还是随着包含它的区块滚动。

- `background-attachment: scroll`：背景相对于元素本身固定，而不是随着它的内容滚动。

- `background-attachment: local`：背景相对于元素的内容固定，如果一个元素拥有滚动机制，背景将会随着元素的内容滚动，并且背景的绘制区域和定位区域是相对于可滚动的区域而不是包含它们的边框。

- `background-attachment: fixed`：背景相对于视口固定。即使一个元素拥有滚动机制，背景也不会随着元素的内容滚动。

需要注意的是，看上去 `scroll` 和 `fixed` 的效果是一样的，实则不然。

`scroll` 相对于元素本身固定，`fixed` 相对于视口固定。有点类似 `position` 的 `absolute` 和 `fixed`。如果横向拖动页面大小，会发现 `fixed` 的图片在变换，因为里面的图片是基于视口进行定位的。

## 42.2 使用 `background-attachment: fixed` 实现滚动视差

## 42.3 使用 `transform: translate3d` 实现滚动视差

# 43. 阴影技巧与细节

## 43.1 单侧阴影

关于 `box-shadow`，大部分时候，我们使用它都是用来生成一个两侧的投影，或者一个四侧的投影。

`box-shadow` 的用法：

```css
{
  box-shadow: none | [inset? && [<offset-x> <offset-y> <blur-radius>? <spread-radius>? <color>?]];
}
```

以 `box-shadow: 1px 2px 3px 4px #333` 为例，4个数值分别是，x方向偏移量，y方向偏移量，模糊半径，扩张半径。

如何生成一个单侧的投影？

要注意的是扩张半径可以是负值，如果阴影的模糊半径与负的扩张半径一致。我们将看不到任何阴影，因为此时生成的阴影将被包含在原来的元素之下，这时再设置一个方向上的偏移量，即可实现单侧投影。

## 43.2 投影背景动画

`box-shadow` 是可以设置多层的，所以可以通过设置多个模糊半径和扩张半径为 0 的阴影，形成格子背景。虽然也可以通过 `background-image: linear-gradient()` 来实现类似的渐变背景。但是渐变背景并不像 `box-shadow` 一样支持补间动画。

## 43.3 立体投影

有时候为了突破 `box-shadow`, `text-shadow` 或者 `drop-shadow` 的一些定位局限，让阴影的位置，大小，模糊度可以更加的灵活，接下来会使用一些其他元素或者属性模拟元素的阴影，以达到立体投影的效果。

## 43.4 文字立体投影 / 文字长阴影

## 43.5 长投影

通过对两个伪元素的 `transform: skew()` 变换以及从实色到透明色的背景色变化，实现长投影。

## 43.6 色彩投影

利用伪元素，生成一个和原图相同的新图叠加在原图下方，并利用滤镜 `filter: blur()` 并配合其他的亮度/对比度，透明度等滤镜，制作出一个虚幻的影子作为原图的阴影效果。

## 43.7 使用 `box-shadow` 实现灯光效果

## 43.8 单标签实现 TikTok Logo

## 43.9 使用 `mix-blend-mode` 实现 TikTok Logo

# 44. CSS 滤镜导致 CSS 3D 失效

```css
{
    transform-style: preserve-3d;
    perspective: 1000;
    transform: translate3d();
}
```

当使用上述 CSS 3D 样式属性时，如果想继续增强效果而使用了 `mix-blend-mode` 效果，导致的结果是 3D 效果整体消失了。

目前情况下：

- chrome: 3D 退化为 2D

- firefox: 3D 退化为 2D

- safari: 渲染正常

此 BUG 大致原因是，当使用 CSS 混合模式的时候，堆叠上下文会重新对使用了混合模式的元素的根节点处创建一个独立的渲染平面。此渲染平面是不支持 `preserve-3d` 的（因为它们渲染到单独的 FBO 中），所以我们看到的是一个 2D 的平面效果。

另外对根节点设置 `backdrop-filter: blur(1px);` 或 `filter: blur(1px);` 也会导致同样的问题。（对子节点设置 `blur` 显示正常）

# 45. 纯 CSS 滚动进度条

# 46. `box-decoration-break`

取值只有两个：

```css
{
  box-decoration-break: slice; // 默认取值
  box-decoration-break: clone;
}
```

使用了 `box-decoration-break: clone` 的内联元素，如果存在折行显示，那么每一行都将拥有原本单行时的所有完整样式。

## 46.1 生效样式影响范围

只会作用于下列样式：

- background
- border
- border-image
- box-shadow
- clip-path
- margin
- padding
- Syntax

## 46.2 文本选中效果

## 46.3 每行文字带特定边框

如果想要每行都带特定的边框样式，或许可以为每一行设置一个 `<p>` ，但如果文本内容不确定，容器的宽度也不确定时，使用 `box-decoration-break` 会更加便捷。

## 46.4 结合过渡动画

## 46.5 注意事项

兼容性：截止到 2023/07/04 为 2.77%	+	95.01%	=	97.78%

要注意大部分都是支持内联元素，但不支持跨列或分页符支持。

实际使用时可能需要写成：

```css
{
   box-decoration-break: clone;
   -webkit-box-decoration-break: clone;
}
```

# 47. 纯 CSS 实现鼠标跟随

用 CSS 如何实时监测当前鼠标的位置？

让页面上铺满元素。然后通过 `~` 兄弟元素选择器，用 `hover` 的 `div` 去控制这个兄弟元素的位置。

## 47.1 小球跟随

## 47.2 Gooey

## 47.3 鼠标跟随

## 47.4 鼠标跟随动画

## 47.5 Water Surface

# 48. CSS 火焰

## Step1: filter blur && filter contrast

模糊滤镜叠加对比度滤镜会产生融合效果。

这两个滤镜单独作用分别是：

1. `filter: blur()`: 给图像设置高斯模糊效果。
2. `filter: contrast()`: 调整图像的对比度。

利用这两个滤镜的融合效果，可以产生类似火焰形状的三角形。

## Step2: 火焰粒子动画

随机均匀分布大量大小不一的圆形 `div`，隐匿在火焰三角形内部。每个圆形赋予一个从下往上逐渐消失的动画，并且给于不同的 `animation-delay`。

## Step3: `mix-blend-mode` 润色

### 48.1 滴水效果

注意：

1. CSS 滤镜可以给同个元素同时定义多个，但是滤镜的先后顺序不同产生的效果也是不一样的。

2. 滤镜动画需要大量的计算，不断的重绘页面，属于非常消耗性能的动画，使用时要注意使用场景。记得开启硬件加速及合理使用分层技术。

3. `blur()` 混合 `contrast()` 滤镜效果，设置不同的颜色会产生不同的效果。

# 49. 使用 CSS 控制动画行进

拆解分析需求

1. 页面 render 后，无任何操作，动画不会开始。只有鼠标对元素进行 click，触发元素的 `:active` 伪类效果时，动画才开始进行。

2. 动画进行到任意时刻，鼠标停止点击，则动画停止。

3. 重新对元素点击，动画继续从上一帧结束的状态开始。

4. 如果动画播放完，再点击不会重复播放，动画状态保留在动画的最后一帧。

## 49.1 小球从左到右

## 49.2 BEER!

## 49.3 按钮动画

# 是否是触摸屏的查询

```css
@media (hover: none) and (pointer: coarse) {
    /* touchscreens */
}
@media (hover: none) and (pointer: fine) {
    /* stylus */
}
@media (hover: hover) and (pointer: coarse) {
    /* controllers */
}
@media (hover: hover) and (pointer: fine) {
    /* mouse or touchpad */
}
```

# 50. `flex` 上下文中的自动 `margin`

为了引出本节的主题，先看看这个问题：如何水平垂直居中一个元素？

下面这个方式算是 CSS 领域最常见的方法：

```html
<div class="container">
  <div class="box"></div>
</div>
```

```css
.container {
  display: flex;
}
.box {
  margin: auto;
}
```

这里其他涉及了一个问题，如何让 `margin: auto` 在垂直方向上生效？

在传统的 `display: block` 容器下，`margin: auto` 仅能在水平方向上将元素居中，但是垂直方向不行。

查看 CSS 文档可以得知，在 `display: block` 下，如果 `margin-left` 和 `margin-right` 都是 `auto`，则它们的表达值相等，从而导致元素水平居中。（这里的表达值为元素剩余可用空间的一半）。

但如果是 `margin-top` 和 `margin-bottom` 为 `auto` 时，则它们的值都为 0 ，所以也就无法在垂直方向上居中。

如果要让单个元素使用 `margin: auto` 在垂直方向上也能够居中，需要让该元素处于 FFC(flex formatting context) 或 GFC(grid formatting context) 上下文中，也就是以下这些取值：

```css
{
  display: flex;
  display: inline-flex;
  display: grid;
  display: inline-grid;
}
```

以 `display: flex` 举例，CSS 文档中表示，在 flex 格式化上下文中设置了 `margin: auto` 的元素，在通过 `jestify-content` 和 `align-self` 进行对齐之前，任何正处于空闲的空间都会分配到该方向的自动 margin 中。这里很重要的一点就是，`margin: auto` 的生效不仅仅是水平方向，垂直方向的空闲空间也会被分配。

因为是在 *`jestify-content` 和 `align-self` 进行对齐之前分配* 所以可以通过 `margin` 来模拟实现 `flex` 布局下的 `space-between` 以及 `space-around`。

## 50.1 自动 `margin` 实现 `space-around` 和 `space-between`

## 50.2 自动 `margin` 实现 `align-self: center | flex-end`

# 51. CSS 属性选择器

## 51.1 语法介绍

- `[attr]`: 该选择器包含 attr 属性的所有元素，不论 attr 的值为何。
- `[attr=val]`: 该选择器仅选择 attr 属性被赋值为 val 的所有元素。
- `[attr~=val]`: 该选择器仅选择具有 attr 属性的元素，并要求 val 值是 attr 值包含的被**空格**分隔的取值列表里的一个。

子串值（Substring value）属性选择器：

下面几个属于 CSS3 新增语法，也被称为“伪正则选择器”，因为它们提供类似 regular expression 的灵活匹配方式。

- `[attr|=val]`: 选择 attr 属性的值是 `val` 或值以 `val-` 开头的元素。（注意：这里的 "-" 不是一个错误，这是用来处理语言编码的）
- `[attr^=val]`: 选择 attr 属性的值以 `val` 开头（包括 `val`）的元素。
- `[attr$=val]`: 选择 attr 属性的值以 `val` 结尾（包括 `val`）的元素。
- `[attr*=val]`: 选择 attr 属性的值中包含子字符串 `val` 的元素。

## 51.2 用法

```css
/* 选择带有 href 属性的元素 */
[href] {
  color: red;
}

/* 一个 img 标签，它含有 title 属性，并且包含类名为 logo 的元素 */
img[title][class~=logo] {}
```

## 51.3 伪正则写法

### A: `i` 参数：忽略类名的大小写限制

```css
p[class*="text" i] {}
```

可以选中类似以下这些元素:

```html
<p class="text"></p>
<p class="nameText"></p>
<p class="desc textarea"></p>
```

### B: `g` 参数：表示大小写敏感（case-sensitively），该属性未纳入标准，支持的浏览器不多。

### C: 配合 `:not` 伪类

```css
/* 选择所有没有 href 属性的 a 标签 */
a:not([href]) {}

/* 摆地摊一个 href, target, rel 属性都没有的 a 标签 */
a:not([href]):not([target]):not([rel]) {}
```

### D: 重写行内样式

```html
<p style="height: 24px; color: red;">xxxxxx</p>
```

可以使用属性选择器强制覆盖掉上面的样式：

```css
[style*="color: red"] {
  color: blue !important;
}
```

## 51.4 注意事项

### A: 选择器的优先级

```css
/* 这两个选择器的优先级是一致的 */
.header {}
[class~="header"] {}

/* ID 选择器 #header 比 属性选择器 [id="header"] 的权重更高  */
#header {}
[id="header"] {}
```

### B: 是否需要引号

从 HTML2 开始，不添加引号的写法就已经得到支持了，所以以下三种写法都是正确的：

```css
[class="header"] {}
[class='header'] {}
[class=header] {}
```

但对于一些特殊符号会识别错误，所以建议都加上引号：

```css
a[href=bar] {}
a[href^=http://] {} /* 无效选择器，:// 会导致识别错误 */
```

# 52. A Guide to CSS Rules

## 52.1 可能/潜在的错误写法

### 留意盒子的尺寸（Beware of box model size）

该规则主要针对盒子的高宽而言

```css
.mybox {
  border: 1px solid black;
  padding: 5px;
  width: 100px;
}
```

`.mybox` 的元素宽度可能会被误认为是 `100px`，但实际上是 `112px`，这是因为盒子的宽度最终由 `content, padding, border` 的宽度相加而得。

建议的写法：

```css
.mybox {
  box-sizing: border-box;
  ...
}
```

建议的规则：

1. `width` 与 `border, border-left, border-right, padding, padding-left, padding-right` 属性同时使用时，指定 `box-sizing`。
2. `height` 与 `border, border-top, border-bottom, padding, padding-top, padding-bottom` 属性同时使用时，指定 `box-sizing`。

### `display` 匹配属性 （display-property-grouping）

当元素设定不同的 `display` 时，部分规则可能无效。

建议的规则：

1. `display: inline`: 不与 `width, height, margin, margin-top, margin-bottom, float` 同时使用。
2. `display: inline-block`: 不与 `float` 同时使用。
3. `display: block`: 不与 `vertical-align` 同时使用。
4. `display: table-*`: 不与 `margin, float` 同时使用。

### 不允许属性重复（duplicate-properties）

即，不允许同一个样式规则中，出现重复定义的属性：

```css
.mybox {
  width: 100px;
  width: 120px;
}
```

但也有例外，定义同个属性可以用来实现一些渐进增加功能：

```css
.mybox {
  background: #fff;
  background: rgba(255, 255, 255, 0.5);
}
```

对于不支持 RGBA 色彩展示的浏览器，将会回退使用第一条定义的规则：`background: #fff`。

不建议的写法：

```css
/* 定义相同的属性 */
.mybox {
  border: 1px solid black;
  border: 1px solid black;
}
/* 被另一个属性隔开 */
.mybox {
  border: 1px solid black;
  color: green;
  border: 1px solid red;
}
```

允许的写法：

```css
/* 定义不同的属性 */
.mybox {
  border: 1px solid black;
  border: 1px solid red;
}
```

建议的规则：

1. 不允许出现两次且值相同的属性。
2. 不允许同个属性出现两次且中间被至少一个其他的属性隔开。

### 不允许空规则（empty-rules）

空规则就是不包含任意属性，一般是因为重构了样式但忘记删除冗余代码造成的，消除空规则可以缩小样式文件大小和精简浏览器待处理的样式信息。

建议的规则：

1. 样式中不包含空样式规则

### 使用已知的属性（known-properties）

CSS 可使用的属性变得越来越多，本规则检测属性名称是否正确，此规则将检查每个使用的属性名称以确保其是已知的属性。

当然，以 `-` 前缀开始的浏览器专有属性将被忽略，因为前缀会添加各个浏览器版本属性上，而这些属性并没有一个参考标准。

此规则不仅会检查属性名称，也会检查属性对应的值是否与其匹配。

建议的规则：

1. 样式中使用标准的属性及属性值

## 52.2 兼容性

### 不允许负文本缩进（Disallow negative text indent）

此规则意在找出 CSS 代码中使用 `text-indent` 的潜在问题。

文本负缩进通常当作辅助的目的，来隐藏屏幕上的文字。使用场景之一就是作为图像的替换技术，使用文本负缩进，可确保屏幕阅读器在文本没有显示在屏幕中时也能读取其数据。此技巧通常使用很大的负单位数值，如 -999px 或 -9999px。

此缩进，允许将背景图片展示给普通用户的同时，也确保屏幕阅读器能顺利解析内联的文本信息。

当文本负缩进使用在横向视图页面时，会引起一定的麻烦，因为会出现一个很长的横向滚动条，此问题可以通过添加 `direction: ltr` 来解决。

建议的规则：

1. 当使用负文本缩进时，配合 `direction: ltr` 一起使用。

### 使用浏览器兼容前缀（Require compatible vendor prefixes）

建议的规则：

1. 尽量使用 `autoprefixer` 来编译 CSS 代码，使用工具去替代人工添加浏览器前缀。

### 使用备用色彩值（Require fallback colors）

此规则意在确保在所有的浏览器上都能显示合适的颜色。建议在使用 CSS3 颜色表示法：`rgba(), hsl(), hsla()` 时，使用一个备份颜色确保颜色值在低版本浏览器上能正常显示，像这样：

```css
.mybox {
  color: red;
  color: rgba(255, 0, 0, 0.5);
}
```

建议的规则：

1. 指定颜色属性时，使用了 `rgba(), hsl(), hsla()` 颜色值时，在该属性定义前使用针对旧版本浏览器的 color 颜色格式。

### 不再使用针对旧版本 IE 的 hack 方式

在以前，旧版本 IE 浏览器仍是不得不兼容的，CSS 代码中会存在很多 `*`，`_` 等，类似这样：

```css
{
  background-color: yellow\0; /* ie8 */
  +background-color: pink; /* ie7 */
  *background-color: pink; /* ie7 */
  _background-color: orange; /* ie6 */
}
```

建议的规则：

1. 在 IE8- 逐渐退出历史舞台的今天，如果业务已经完全抛弃 IE8- 了，就应该不再使用 `+`，`_`，`*`，`\0` 等这些针对 IE 的 hack 方式。

## 52.3 CSS 性能

### 不使用过多的网络字体（Don't use too many web fonts）

`@font-face` 的出现让我们可以让用户使用任何字体，而不必拘泥于 "web-safe" 的字体之一。但是字体文件本身是很大的，以及部分浏览器在下载字体文件时，不会实时渲染。这就给使用网络字体的同时，带来了显示性能的隐患。因此建议，使用 `@font-face` 使用 web-fonts 不宜过多。

建议的规则：

1. 使用少于 5 次网络字体 `@font-face` 引用。（5 这个次数是 CSSLint 的建议）

### 不使用 `@import`

`@import` 命令用于在 CSS 文件中引用其他的 CSS 文件：

```css
@import url(more.css);
@import url(andmore.css);

a {
  color: black;
}
```

当浏览器解析以上代码时，会在每个 `@import` 后开始下载指定的文件，从而停止执行后面的代码。也就是说在 `@import` 指定的文件未下载完成前，浏览器不会同时下载其他的样式文件，总而失去了并行下载 CSS 的优势，且会造成页面的闪烁。

建议的规则：

1. 不在 CSS 代码中使用 `@import`

### 谨慎使用属性选择器（Disallow selectors that look like regular expressions）

属性选择器带来匹配便利的同时，由于这些复杂的属性选择器需要通过一遍又一遍的计算来匹配对应属性值，从而确保最终的效果正确。为此，CSS 需要消耗更多的时间，来计算整个页面的显示效果。

建议的规则：

1. 尽量少的使用属性选择器，如果确定要使用，应该要意识到该选择器带来的开销比一些常规选择器更大。

### 谨慎使用通配符 `*`（Disallow universal selector）

通用选择器 `*` 匹配所有元素。尽管每次都能很方便的选择一组元素，但如果将其作为选择器的核心部分（选择器位置的最右侧）则会造成性能问题，如：

```css
.mybox * {}
```

浏览器解析以上 CSS 规则时会按照从右至左的顺序解析选择器，因此这个规则首先会匹配文档中的所有元素。然后逐一检测这些元素是否匹配下一级的规则，在这里即是否拥有 `.mybox` 祖先样式。所以如果包含 `*` 的选择器越复杂，其解析的时间越久。

建议的规则：

1. 应该谨慎使用通用选择符 `*`，如果必须使用，也应该尽量避免将其放置在最右侧。

### 谨慎使用未定义的属性选择器（Disallow unqualified attribute selectors）

HTML5 允许在标签中创建自定义属性。然而，与上一条规则类似，如 `[type=text]`，首先会匹配所有元素，然后检查属性。这意味着*未定义属性选择器*和*通用选择器*一样都有相同性能问题。

建议的规则：

1. 尽量避免将属性选择器放置在选择器的最右侧。

### 使用简写属性（Require shorthand properties）

此规则建议，当可以通过简写属性来减少文件体积时，应当尽量使用简写方式，像这样：

```css
.mybox {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
  margin-bottom: 30px;
}

/* 应该替换为 */

.mybox {
  margin: 20px 10px 30px;
}
```

建议的规则：

1. 当可通过简写属性来减少文件体积时，应当尽量使用属性的简写方式。

### 不允许重复背景图片定义（Disallow duplicate background images）

如果有多个样式需要使用同一背景图片，那么最好声明一个包含此图片地址的通用样式类，然后将这个类添加到需要使用的元素之上，如：

```css
.heart-icon {
  background: url(sprite.png) -16px 0 no-repeat;
}
.task-icon {
  background: url(sprite.png) -32px 0 no-repeat;
}

/* 上面两个类重复定义了背景图片地址，造成了冗余代码，同时也增加了修改的成本 */
/* 比较好的方式是抽取一个图片地址类作为利用类 */

.icons {
  background: url(sprite.png) no-repeat;
}

.heart-icon {
  background-position: -16px 0;
}
.task-icon {
  background-position: -32px 0;
}
```

建议的规则：

1. 在需要使用重复的背景图片时，应该定义一个公用类进行复用。

## 52.4 可维护性和重复性（Maintainability & Duplication）

### 尽量少的使用浮动 `float` （Disallow too many floats）

`float` 属性是 CSS 中实现多列布局广受欢迎的方式。在项目中，`float` 元素被用来创建不同的页面布局。如果此时改变布局，则会使得 CSS 代码十分脆弱，难以维护。

在如今，有更好的方式去实现网络化布局：`flex` 和 `grid`。

建议的规则：

1. 尽量少的使用 `float` 去进行页面布局，如果兼容性允许，应该使用 `display: flex` 或 `display: grid` 进行替代。

### 不使用过多的字体大小声明（Don't use too many font size declarations）

一个利于维护的站点，通常都有通用的字体集。某类字体的大小往往定义了一个代表其含义的抽象类，以便运用到站点的各个使用场景。

如果未抽取出公用类，会导致书写 CSS 时频繁的使用 `font-size` 来使元素大小按预期显示。这就会带来一个问题，当设计的字体大小改变后，我们需要改变样式中所有设计的字体大小。而抽取成公用类时，只用改变类中定义的大小即可做到全局调整，像这样：

```css
.small {
  font-size: 8px;
}
.medium {
  font-size: 11px;
}
.large {
  font-size: 14px;
}
```

建议的规则：

1. 不使用过多的字体大小声明，通过定义不同类型的字体类进行字体大小的复用。

### 尽量少的使用 ID 选择器进行样式定义（Disallow IDs in selectors）

CSS 的好处之一就是可以在多处复用样式规则，但如果使用了 ID 选择器则在不经意间就将样式局限在了单个元素上。

建议的规则：

1. 尽量少的使用 ID 选择器进行样式定义。

# 53. CSS 负值技巧与细节

## 53.1 使用负值 `outline-offset` 实现加号

在新版本的 Chrome 中已经无法实现。

旧版本中实现会有一些要求：

- 容器得是个正方形
- outline 边框本身的宽度不能太小
- outline-offset 负值 x 的 取值范围为：`-(容器宽度的一半 + outline 宽度的一半) < x < -(容器宽度的一半 + outline 宽度)`

## 53.2 单侧投影

`box-shadow` 的用法定义：

```css
{
  box-shadow: none | [inset? && [ <offset-x> <offset-y> <blur-radius>? <spread-radius>? <color>? ]]
}
```

以 `box-shadow: 1px 2px 3px 4px #333` 为例，它的含义是：`x 方向偏移 1px，y 方向偏移 2px，模糊半径为 3px，扩张半径为 4px`

关于 `box-shadow`，大部分时候，我们使用它都是用来生成一个两侧的投影，或者一个四侧的投影：

- 投影在相邻两侧：`box-shadow: 3px 3px 1px 1px #666`
- 投影在周围四侧：`box-shadow: 0 0 3px 3px #666`

要注意的是，扩张半径可以为负值。

如果阴影的模糊半径，与负的扩张半径一致，那么将看不到任何阴影，因为生成的阴影将被包含在原来的元素之下，除非给它设置一个方向上的偏移量。

- 左：`box-shadow: -7px 0 5px -5px #333`
- 右：`box-shadow: 7px 0 5px -5px #333`
- 上：`box-shadow: 0 -7px 5px -5px #333`
- 下：`box-shadow: 0 7px 5px -5px #333`

## 53.3 使用 `scale(-1)` 实现翻转

要实现一个元素的 180° 的翻转，一般使用 `transform: rotate(180deg)`，其实使用 `transform: scale(-1)` 也可以达到同样的效果

## 53.4 使用负 `letter-spacing` 倒序排列文字

`letter-spacing` 属性明确了文字的间距行为，通常而言，除了关键字 `normal`，我们还可以指定一个大小用来表示文字的间距。

不过，受到中英文混排或者不同字体的影响，以及倒序后的排列方式，不建议使用这种方式来倒序排列文字。

## 53.5 `transition-delay` 和 `animation-delay` 的负值使用，立刻开始动画

如果想在一进入页面时，3个球就是同时运动的（三个球互相之间其实有 delay），只需要将 `animation-delay` 改成负值即可。

被设置为负值的动画会立刻执行，并且开始的位置会是其动画阶段中的一个阶段。

## 53.6 负值 `margin`

在 flexbox 布局还没有流行之前，要实现多行等高布局的一种方法就是使用正 `padding` 负 `margin` 相消的方式。

## 53.7 总结

- 使用负 `margin` 实现元素的水平垂直居中
- 使用负 `margin` 隐藏列表 li 首尾多余的边框
- 使用负 `text-indent` 实现文字的隐藏
- 使用负 `z-index` 参与层叠上下文排序

# 54. Web 字体 `font-family` 再探秘

## 54.1 字体基础知识

在 Web 上常用的一些字体大体可以分为衬线字体和无衬线字体

- **衬线字体**: 关键字为 `serif`，意为有衬线的字体，衬线的意思是在字符笔画末端有叫做衬线的小细节的额外装饰，而且笔画的粗细会有所不同，这些细节在大写字母中特别明显。

- **无衬线字体**：关键字为 `sans-serif`，也就是无衬线的意思。专指西文中没有衬线的字体，与汉字字体中的黑体相对应。该类字体通常是机械的和统一线条的，它们往往拥有相同的曲率，笔直的线条，锐利的转角。

对于 CSS 中的 `font-family` 而言，它有两类取值：

1. 类似具体的字体族名定义：`font-family: Arial` 这里定义了一个具体的字体样式，字体族名为 `Arial`。
2. 通用字体族名，它是一种备选机制，用于在指定的字体不可用时给出较好的字体，类似：`font-family: sans-serif`。其中，`sans-serif` 表示无衬线字体族，例如："Open Sans"，"Arial"，"微软雅黑"等。

关于通用字体族名，在 [CSS Fonts Module Level3 -- Basic Font Properties](https://www.w3.org/TR/2018/REC-css-fonts-3-20180920/#generic-font-families) 中，定义了 5 个，也就是我们熟知的几个通用字体族名：

1. `serif` 衬线字体族
2. `sans-serif` 非衬线字体族
3. `monospace` 等宽字体，即字体中每个字宽度相同
4. `cursive` 草书字体
5. `fantasy` 主要是那些具有特殊艺术效果的字体

## 54.2 新增通用字体族关键字

在 [CSS Fonts Module Level4 -- Generic font families](https://www.w3.org/TR/css-fonts-4/#generic-font-families) 中，新增了几个关键字：

1. `system-ui` 系统默认字体
2. `emoji` 用于兼容 emoji 表情符号字符
3. `math` 适用于数字表达式
4. `fangsong` 此字体系列用于中文的（仿宋）字体

### `system-ui`

简单而言，`font-family: system-ui` 的目的就是在不同的操作系统的 Web 页面下，自动选择本操作系统下的默认系统字体。

默认使用特定操作系统的系统字体可以提高性能，因为浏览器或者 webview 不必去下载任何字体文件，而是使用已有的字体文件。`font-family: system-ui` 字体设置的优势之处在于它与当前操作系统使用的字体相匹配，对于文本内容而言，它可以得到最恰当的展示。

### `San Francisco Fonts`

`San Francisco Fonts` 又叫旧金山字体，是一款西文字体。随着 iOS 9 以及 WatchOS 和 Apple TV 上新的 tvOS 出现。它是一种在 iOS 系统上用于替代升级另外一款西文字体 `Helvetica Neue` 的。

### `-apple-system/BlinkMacSystemFont`

考虑到不同平台及向后兼容，在 macOS 和 iOS 上，需要使用 `-apple-system` 和 `BlinkMacSystemFont` 来兼容适配 `system-ui` 标准。

### `Segoe UI`

是 Windows 从 Vista 开始的默认西文字体族，只有西文，不支持汉字，属于无衬线体。

它表示的是一个系列而不是某一款单一字体。使用 `font-family: Segoe UI` 可以在 Windows 平台以及 Windows Phone 上选取最佳的西文字体。

### `Roboto`

它是为 Android 操作系统设计的一个无衬线字体族。Google 描述该字体为“现代的，但平易近人的”和“有感情”的。

这个字体族包含 `Thin, Light, Regular, Medium, Bold, Black` 六种粗细及相配的斜体。

## 54.3 总结

```css
{
  font-family: 
    system-ui,-apple-system,BlinkMacSystemFont,segoe ui,Roboto,
    Helvetica,Arial,
    sans-serif,apple color emoji,segoe ui emoji,segoe ui symbol;
}
```

1. `system-ui` 使用各个支持平台上的默认系统字体。
2. `-apple-system` 在一些稍低版本 Mac OS X 和 iOS 上，针对旧版的 `Neue Helvetica` 和 `Lucida Grande` 字体，升级使用更为合适的 `San Francisco Fonts`。
3. `BlinkMacSystemFont` 针对一些 Mac OS X 上的 Chrome 浏览器，使用系统默认字体。
4. `segoe ui` 在 Windows 及 Windows Phone 上选择系统默认字体。
5. `Roboto` 面向 Android 和一些新版的 Chrome OS。
6. `Helvetica, Arial` 在针对不同操作系统不同平台设定采用默认系统字体后，针对一些低版本浏览器的降级方案。
7. `sans-serif` 兜底方案，保证字体风格统一，至少也得是无衬线字体。

### 字体定义规则建议：

### 1. 尽量使用系统默认字体

使用系统默认字体的主要原因是性能，并且系统字体的优点在于它与当前操作系统使用的相匹配，因此它的文本展示必然也是一个让人舒适展示效果。

### 2. 兼顾中西，西文在前，中文在后

中文或者西文（英文）都要考虑到。由于大部分中文字体也带有英文字体，但是英文部分又不怎么好看，而英文字体中大多不包含中文。所以通常会先进行英文字体的声明，选择最优的英文字体，中文字体声明则紧随其后，这样即不会影响中文字体的选择，也可以让英文部分更美观。

### 3. 兼顾多操作系统

选择字体的时候要考虑多操作系统。例如 MAC OS 下的很多中文字体在 Windows 都没有预装，为了保证 MAC 用户的体验，在定义中文字体的时候，先定义 MAC 用户的中文字体，再定义 Windows 用户的中文字体。

### 4. 兼顾旧操作系统，以字体族系列 `serif` 和 `sans-serif` 结尾

当使用一些非常新的字体时，要考虑向下兼容，兼顾到一些极旧的操作系统，使用字体系列 `serif` 和 `sans-serif` 结尾总归是不错的选择。

# 55. CSS 阴影动画优化

当有一个这样的盒子：

```css
div {
  width: 100px;
  height: 100px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}
```

希望在 hover 时，阴影从 `box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3)` 过渡到 `box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3)` 时，由于过渡动画时间内，浏览器会不断的重绘盒阴影。又由于阴影属于耗性能样式，所以动画给人感觉多少有些卡顿。

## 55.1 使用伪元素及透明度进行优化

为什么使用透明度 `opacity` 进行动画要比 `box-shadow` 进行动画性能更好？ 可以参考这个 [CSS Triggers List](https://csstriggers.com/)

## 55.2 两个阴影叠加替换

上面方法由于最终效果是两个阴影叠加在一起，整体感觉上阴影颜色会更深一点。所以更好的优化方案是让两个阴影交替显示。

# 56. 在 CSS 中使用三角函数绘制曲线图形及展示动画

[css-doodle](https://css-doodle.com/)

# 57. 使用 `scroll-snap-type` 优化滚动

根据 [CSS Scroll Snap Module Level1 规范](https://www.w3.org/TR/css-scroll-snap-1/)，CSS 新增了一批能够控制滚动的属性，让滚动能仅通过 CSS 的控制就得到许多原本需要 JS 介入的交互。

## 57.1 `scroll-snap-type`

`scroll-snap-type`：属性定义了在滚动容器中的一个临时点（snap point）如何被严格执行。

语法：

```css
{
  scroll-snap-type: none | [ x | y | block | inline | both ] [ mandatory | proximity ]?
}
```

如果希望滚动容器在每次滚动后，子元素最终停留位置不是尴尬的被分割，而是完整呈现在容器内，可以这样写：

```css
ul {
  scroll-snap-type: x mandatory;
}
li {
  scroll-snap-align: center;
}
```

### 1. 属性 `mandatory` 和 `proximity`

- `mandatory`：通常会使用这个值，它的意思是*强制性*，表示滚动结束后，滚动停止点一定会强制停在我们指定的地方。
- `proximity`：意思是*接近，临近，大约*，意思为在滚动结束后，滚动停止点可能是滚动停止的地方，也可能会再进行一些额外的滚动，停在我们指定的地方。

### 2. `both mandatory`

```css
{
  scroll-snap-type: both mandatory;
}
```

表示横向与竖向的滚动都进行捕捉。

## 57.2 `scroll-snap-align`

使用 `scroll-snap-align` 可以简单的控制要聚集的当前滚动子元素在滚动方向上相对于父容器的对齐方式。

```css
{
  scroll-snap-align: start | center | end;
}
```

### `start`

表示聚集的滚动子元素在滚动方向上相对于父容器顶部对齐。

### `center`

表示聚集的滚动子元素在滚动方向上相对于父容器中心对齐。

### `end`

表示聚集的滚动子元素在滚动方向上相对于父容器底部对齐。

### 不规则子元素滚动

如果子元素大小不一，`scroll-snap-align` 也能有非常好的表现。

## 57.3 `scroll-margin` / `scroll-padding`

`scroll-snap-align` 可以控制滚动子元素与父容器的对齐方式，但如果想要更精细的进行控制时，可以使用 `scroll-margin` 或 `scroll-padding`。

- `scroll-padding`：作用于父容器，类似于盒子的 `padding`
- `scroll-margin`：作用于滚动子元素，每个子元素的 `scroll-margin` 可以设置为不一样的值，类似于盒子的 `margin`

# 58. CSS 实现充电动画

## 58.1 Battery Animation

## 58.2 HuaWei Battery Charging Animation

# 59. CSS 中的层叠（Cascading）

## 59.1 常见 CSS 优先级误区

通常我们聊到 CSS 规则的优先级，都是以下这样的：

一个选择器的优先级可以说是由四个部分相加（分量），可以认为是 *个十百千* 四位数：

- 千位：如果声明在 `style` 的属性（内联样式）则该位得一分。这样的声明没有选择器，所以它的总得分就是 1000
- 百位：选择器中包含 ID 选择器则该位得一分
- 十位：选择器中包含类选择器，属性选择器或者伪类则该位得一分
- 个位：选择器中包含元素，伪元素选择器则该位得一分

总的来说规则就是：内联 > ID 选择器 > 类/属性/伪类选择器 > 标签元素/伪元素

上面的规则的问题在于一来只考虑了页面作者定义的样式的优先级，并且没有包含 `!important` 规则。另外决定一个 CSS 样式的最终表现而言，还有一个非常重要的概念 -- 层叠

## 59.2 层叠（Cascading）

层叠是 CSS 的一个基本特征，它是一个定义了如何合并来自多个源的属性值的算法。下面是影响层叠的五个源：

- 浏览器会有一个基本的样式来给任何网页设置默认样式。这些样式统称*用户代理样式*
- 网页的作者可以定义文档的样式，这是最常见的样式表。大多数情况下此类样式表会定义多个，它们构成网站的视觉和体验，即页面主题，可以理解为*页面作者样式*
- 读者、作为浏览器的用户，可以使用自定义样式表定制使用体验，可以理解为*用户样式*
- 动画（Animation），指使用 `@Keyframes` 规则定义状态间的动画，动画序列中定义关键帧的样式来控制 CSS 动画序列
- 过渡（Transition）

再算上 `!important` 的顺序大概是：

1. user agent（用户代理样式）
2. user（用户样式）
3. author（页面作者样式）
4. animations（动画）
5. author（用户作者样式）!important
6. user（用户样式）!important
7. user agent（用户代理样式）!important
8. transitions（过渡）

即优先级大概是这样：过渡动画过程中每一帧的样式 > 用户代理，用户，作者设置的 `!important` 样式 > 动画过程中每一帧的样式优先级 > 页面作者，用户，用户代理的普通样式

# 60. 实现带圆角的渐变边框

## 60.1 使用 border-image 实现渐变边框

`border-image` 最大问题在于设置的 `border-radius` 会失效。

## 60.2 `background-image` + 伪元素

缺点：

- 多使用了伪元素
- 如果要求边框内的背景是透明的，此方案便行不通了。

## 60.3 `background-clip` 实现

因为用到了 `background-clip: border-box`，所以还需要 `background-origin: border-box` 使图案完整显示。

缺点：同样如果要求边框内的背景是透明的，此方案便行不通了。

## 60.4 `border-image` + `overflow: hidden`

既然 `border-image` 会使得 `border-radius` 失效，那么就给它增加一个父容器，在父容器上设置 `overflow: hidden` + `border-radius` 即可。

## 60.5 `border-image` + `clip-path`

设置 `border-image` 的元素 `border-radius` 会失效，但在 CSS 中，还有其它方法可以产生带圆角的容器，即 `clip-path`。

`clip-path` 属性可以创建一个只有元素的部分区域可以显示的剪切区域。即元素与该区域覆盖的部分显示，其他部分隐藏。剪切区域是被引用的内嵌的 URL 定义的路径或外部 SVG 路径。

`clip-path: inset(0 round 10px)`

- `clip-path: inset()` 是矩形裁剪
- `inset()` 的用法有多种，在这里 `inset(0 round 10px)` 可以理解为，实现一个父容器大小（完全贴合，垂直水平居中于父容器）且 `border-radius: 10px` 的容器，将这个元素之外的所有东西裁剪掉（即不可见）。

# 61. CSS 故障艺术

## 61.1 使用 mix-blend-mode 实现抖音 LOGO

## 61.2 图片 Glitch Art 风

要注意的是由于图片本身并不是红色和青色的，所以需要通过 `background-image: url() color` 在 `color` 处叠加上这两种颜色，并通过 `background-blend-mode: lighten` 让其表现出来。

另外为了保持中间叠加部分为原色，需要再叠加一个 `mix-blend-mode: darken` 反向处理一下。

## 61.3 动态 Glitch 效果

## 61.4 Glitch Art 风格的 404 效果

## 61.5 其他配色效果

`黄 + 粉红 + 蓝` 配合 `mix-blend-mode: multiply`。

如果效果不希望和背景混合在一起，可以使用 `isolation: isolate` 进行隔离

## 61.6 `clip-path` 实现文字断裂效果

## 61.7 `clip-path` 的 Glitch Art

# 62. 使用 `display: contents` 增强页面语义

## 62.1 基本用法

设置了 `display: contents` 属性的元素本身将不会产生任何盒子，但是它会保留其子元素的正常展示。

## 62.2 充当无语义的包裹框

在写 React, Vue 时，这个属性在写 JSX / 模板时能有很好的作用，并且也非常符合这个属性本身的定位。

比如：

```jsx
return (
  <div class="wrap">
    <h2>title</h2>
    <div>...</div>
  </div>
)
```

如果只是想输出 `.wrap` 中的内容，但由于框架限制，必须加一个 `.wrap` 包裹多个元素，但是 `.wrap` 本身其实并没有任何样式。如果此时将该元素放到其他 `display: flex`，`display: grid` 容器下，由于加了这层 `.wrap`，整个布局也都需要重新调整。

以前的作法是使用框架提供的容器 `<React.Fragment>` 或 `<template>` 元素，它们都不会向页面插入任何多余节点。

而现在多了一种选择就是加上 `display: contents`：

```jsx
return (
  <div class="wrap" style="display: contents">
    <h2>title</h2>
    <div>...</div>
  </div>
)
```

## 62.3 让代码更符合语义化

在实际场景中，页面上充斥着大量可点击按钮，或可以点击的文字。在语义上它们应该是一个个 `<button>`，但是由于按钮样式没那么好控制，并且会引入很多默认样式，一般我们都是使用 `<p>, <div>, <a>` 等标签来模拟的。

现在有了 `display: contents` 可以让我们的代码更符合语义化，并且不需要去解决 `<button>` 带来的样式问题：

```html
<p class="button">
    <button style="display: contents"> Button </button>
</p>
<p class="button">
    <button style="display: contents"> Click Me </button>
</p>
```

当然了，对于提升使用了 `<div>, <a>` 标签模拟的按钮的可访问性而言，更好的办法是通过 [WAI-ARIA 标准](https://www.w3.org/TR/wai-aria-1.1/) 定义的一系列 `ARIA-*` 属性来改善。

## 62.4 在替换元素及表单元素中一些有意思的现象

`display: contents` 并非在所有元素下的表现都一致。

对于可替换元素及大部分表单元素，使用 `display: contents` 的作用类似于 `display: none`。

也就是说对于一些常见的可替换元素，表单元素：

- `<br>`
- `<canvas>`
- `<object>`
- `<audio>`
- `<iframe>`
- `<img>`
- `<video>`
- `<frame>`
- `<input>`
- `<textarea>`
- `<select>`

作用 `display: contents` 相当于使用了 `display: none`，元素的整个框和内容都不会绘制在页面上。

## 62.5 `<button>` 的一些异同

`<button></button>` 如果包裹了内容，其一些可继承的样式还是会被子内容继承的，这个在实际使用中需要注意。（都会继承，只是其他标签没有 `<button` 这么多的附加样式）

## 62.6 对 A11Y 的影响

如果页面对可访问性的要求很高，使用此属性时要当心。

# 63. CSS MASK

## 63.1 语法

最基本，使用 mask 的方式是借助图片：

```css
{
  mask: url(mask.png);        /* 使用位图来做遮罩 */
  mask: url(masks.svg#star);  /* 使用 SVG 图形中的形状来做遮罩 */
}
```

此外，mask 还可以接受一个类似 `background` 的参数，也就是渐变：

```css
{
  mask: linear-gradient(#000, transparent); /* 使用渐变来做遮罩 */
}
```

图片与 mask 生成的渐变的 `transparent` 的重叠部分，将会变得透明。

## 63.2 使用 mask 实现图片切角遮罩

## 63.3 多张图片下使用 mask

## 63.4 使用 MASK 进行转场动画

## 63.5 mask 与滤镜和混合模式

## 63.6 mask 与图片

当然，mask 最本质的作用应该还是作用于图片上。

# 64. 不定宽溢出文本适配滚动

## 64.1 hover 时弹出框提示

一种可行的方案是在 hover 时，弹出一个文本框展示全文，最简单的就是在标签下添加 `title` 属性：

```html
<nav>
  <p ttile="溢出文本1 溢出文本2 溢出文本3 溢出文本4">溢出文本1 溢出文本2 溢出文本3 溢出文本4</p>
</nav>
```

这里主要讲的是在文本和容器长度都不确定的情况下，文本实现在 hover 状态下，从左向右，滚动到文本末端再滚动回初始位置，如此反复的提示效果。

## 64.2 容器定宽，文本不定宽

给标签加上 `display: inline-block`，让标签的宽度变为实际文本的宽度。

## 64.3 父容器不定宽度

如果父容器的宽度不固定，或者由于 `calc` 兼容性问题无法使用，则可以这样：

```css
@keyframes move1 {
    from {
        left: 0;
        transform: translate(0, 0);
    }
    to {
        left: 100%;
        transform: translate(-100%, 0);
    }
}
```

- `transform: translate(-100%, 0)` 能够向左移自身宽度的 100%
- `left: 100%` 能够实现向右位移父容器宽度的 100%

使用 `margin-left` 替换 `left` 也一样可以实现，使用百分比表示的 `margin-left` 位移的基准也是父元素的宽度。

## 64.4 不足之处

### 1. 无法判断文本长度是否超出父元素宽度

我们只是希望文本溢出时，hover 时才出现滚动效果，但这在纯 CSS 下是无法实现的。

在父元素定宽的例子中，可以使用 `min-width` 来限制，其他情况下可能还是需要借助 JavaScript 进行简单的判断，然后通过 `class` 来实现。

### 2. 动画闪烁

在父容器不定宽的情况下，由于对两个属性进行了动画，并且位移的方向还是相反的，所以动画可能看上去会有一点闪烁。

# 65. 使用 `tabindex` 配合 `focus-within` 实现父选择器

在目前的 CSS 中没有真正意义上被广泛实现的父选择器，这和浏览器的渲染机制有关。

但可以通过 `:focus-within` 伪类来达到类似的目的。

它表示一个元素获得焦点，或该元素的后代元素获得焦点，利用它我们可以实现通过元素的子元素的（focus事件），触发该伪元素，从而实现一个狭义上的父选择器。

## 65.1 `:focus-within` 伪类实现父选择的缺陷

最大问题是元素必须要有 `focus` 事件，才能触发它或者它的父元素的 `:focus-within`。所以一般情况下，只能和 `<button>`，`<input>` 元素一起使用。

不同于 `<button>, <input>, <select>, <a>` 这类可交互元素，`<div>, <span>, <table>` 这类非交互元素，默认是不能被聚焦的，即默认不存在 `focus` 事件。

## 65.2 使用 `tabindex` 使元素获得 `focus` 事件

`tabindex` HTML 标签属性，指示其元素是否可以聚焦，以及它是否参与键盘导航（通常使用 tab 键）

也就是说，一个单独的 div 标签，它是没有 `focus` 事件的。但当给它加上一个 `tabindex` 属性后，它就和 `<input>` 类似，拥有了 `focus` 事件，再配合 `focus:within` 能够使用的场景就大大提升了。

```html
<div>
  <!-- 没有 focus 事件的元素 -->
  <div>Click</div>
</div>

<div>
  <!-- 拥有 focus 事件的元素 -->
  <div tabindex="-1">Click</div>
</div>
```

关于为什么这里使用 `tabindex="-1"`，是因为 `tabindex` 为负值是表示该元素可以聚焦，但是不能通过键盘导航来访问到该元素。因为我们只是需要让元素获得 `focus` 事件，但并不需要它真的能够用键盘导航来访问。

## 65.3 `button` 的 `focus` 事件冒泡问题

该方案其实是依赖 `focus` 事件的冒泡来实现的，而对于 `<button>` 元素，它在不同的系统和不同的浏览器下表现可能会有不同，在使用时要注意。（MAC 下 Safari 可能存在 `focus` 事件被目标元素捕获后，不再继续向上冒泡的问题）

# 66. CSS 艺术 -- 使用 `background` 创造各种美妙的背景

## 66.1 背景基础知识

在 CSS 中 `background` 最常用的是下面 4 种情况：

- 纯色背景 `background: #000`
- 线性渐变 `background: linear-gradient(#fff, #000)`
- 径向渐变 `background: radial-gradient(#fff, #000)`
- 角向渐变 `background: conic-gradient(#fff, #000)`

## 66.2 背景进阶 -- 使用 `mix-blend-mode`

## 66.3 使用径向渐变

## 66.4 使用混合模式叠加不同的渐变图案

## 66.5 使用 `mask`

`mask-composite` OR `-webkit-mask-composite`

使用 `mask` 切割图片时 `-webkit-mask-composite` 属性有点类似于 `mix-blend-mode`，它是用来指定应用于同一个元素的多个蒙版图像相互合成的方式。指定为 `xor` 时类似于偶数相减，奇数相加的模式。

# 67. `position-sticky` 失效的问题

`sticky` 定位类似于相对定位，（当它表现为 `fixed` 定位的特性时）会根据最近的滚动容器（nearest scrollport）自动计算偏移量。

## 67.1 包裹的父容器高度与 `sticky` 元素一致

如果在 `.sticky` 元素和你希望吸附的滚动元素之间，添加上一层 `.parent` 的 div 元素，不给 div 添加任何样式，sticky 就失效了。

失效原因：

此时 `.sticky` 元素的最近的 `scrollport` 变成了它的父容器 `.parent`。该元素的高度和 `.sticky` 元素的高度是一样的，所以表现不出 `fixed` 的特性。

其实这里也不算完全失效，只需要将 `.parent` 元素的高度设置的大于 `.sticky` 元素本身，也能看到效果。

## 67.2 包裹的父容器设置了 `overflow:hidden`

当 `.sticky` 的父元素为 `overflow:hidden` 时，即使它的高度比 `sticky` 元素高，但是在滚动中仍然不会表现出 `fixed` 特性。

失效原因：

设置了 `overflow: hidden` 的元素，它不再使用滚动特性。

另外要注意的是，设置为 `position: sticky` 元素的任意父节点的 `overflow` 属性都必须是 `visible` 的。否则 `sticky` 不会生效。

## 67.3 总结

`sticky` 生效的条件：

- 必须指定 `top, right, bottom, left` 四个阈值中的一个，并且达到了设定的阈值，才可使粘性定位生效，否则其行为与相对定位相同。 另外 `top, bottom` 同时设置时，`top` 生效的优先级高。`left, right` 同时设置时，`left` 的优先级高。
- 任意父节点的 `overflow` 属性必须是 `visible`，否则不会生效。因为父容器无法滚动时，`sticky` 元素自然也就不存在滚动然后固定的情况。
- 父元素的高度必须大于当前元素，否则也会失效。

# 68. 使用纯 CSS 实现滚动阴影效果

使用 `background-attachment` 实现滚动阴影

一些问题：

- 因为使用的是背景 `background` 模拟的阴影，所以内容永远是在背景之上的。
- `background-attachment` 的兼容性问题，不过大多数兼容问题出在了 `background-attachment: fixed` 上。本例中主要是使用 `local, scroll` 所以影响不大。

# 69. 一行 CSS 代码

初衷是为了在 [CSSBattle](https://cssbattle.dev) 上使用尽量少的代码实现效果。

```html
<a style=box-shadow:0+0+0+200px#b5e0ba,0+0+0+5in#5d3a3a>
<!-- HTML5 支持属性后面的值不用引号包住 -->
```

# 70. 水平垂直居中深入挖掘

- absolute: `position:absolute` 配合 `top:50%;left:50%;transform:translate(-50%,-50%)`
- autobot: `display:flex` 配合 `margin:auto`
- flex: `display:flex` 配合 `align-items:center;justify-content:center`
- grid: `display:grid` 配合 `place-content:center`

## 70.1 居中单个元素

四种方案都能很好的完成，但是方案 `absolute` 和 `autobot` 需要在父元素和子元素上都添加 CSS，`flex` 和 `grid` 方案对于子元素是无感知的，只需要通过修改父元素的 CSS 即可。

## 70.2 居中多个元素

- `absolute` 方案由于用的是绝对定位，导致子元素都叠在了一起
- `flex` 和 `grid` 方案，如果不添加边距(margin/gap)，子元素会贴在一起
- 不限制方向的话，`flex` 默认是水平排列, `grid` 默认是竖直排列
- `grid` 下所有子元素的宽度会被强行拉伸到最宽的一个子元素的内容的宽度（也就是拉伸至网格宽度）（因为本例中没有指定子元素的具体宽度，可以认为是元素在 `grid` 布局下 `width: auto` 的行为）

## 70.3 控制间距

提示：`flex` 布局从 chrome84 开始，也支持直接使用 `gap` 对子元素的间距进行控制

- `autobot` 方案由于 `margin: auto` 是需要均分剩余空间的，所以无法通过 `gap: 5px` 将间隔控制在 5px。

## 70.4 元素多到溢出

- `autobot` 由于没有剩余空间，`margin: auto` 已经无法做到均匀分配了，所以会出现一边贴着容器边，另外一边溢出。
- `flex` 和 `grid` 都做到了即使超出容器空间，仍然是水平垂直居中的。

## 70.5 总结

`flex` 方案目前是最优的水平垂直居中方案。

- 便捷的水平垂直居中单个元素
- 便捷的水平垂直居中多个元素，无论是横向，竖向，或是内容超出
- 非常方便的控制子元素的间距
- 不会改变子元素的宽度

# 71. 如何不使用 `overflow: hidden` 实现相同效果

## 71.1 控制 `overflow: hidden` 的方向

有这样的问题主要是为了一个实际的需求，即要求容器内的内容，在垂直方向上超出容器会被裁剪，但是水平方向上超出容器不会被裁剪。

首先想到的解决方案是在背景元素本身再套用一层父元素，然后父元素才是实际上的 `overflow: hidden` 元素，达到类似的效果。

但是如果处在一个比较复杂的布局流内，可能就没有办法通过包裹一层父元素来解决了。

## 71.2 利用 `clip-path` 进行裁剪

## 71.3 利用 `contain: paint` 进行内容裁剪

`contain: paint` 的本意是用于提升页面的渲染，容器之外的元素将不再进行渲染，但是它会产生一些副作用：

- 它会生成一个自己的新的堆叠上下文（It becomes a stacking context），也就是说它会改变它的子元素的 `absolute` 定位和 `fixed` 定位的基准
- 它会成新的格式化上下文（It becomes a new formatting context），也就是说，元素外部的布局不会再影响它的子元素。

# 72. 动态高度过渡动画

## 72.1 `transition` 不支持 `height: auto`

当我们期望容器高度自适应内容时，会设置 `height: unset` 或 `height: auto`（`unset` 与 `auto` 相同）。但是 CSS transtion 不支持元素的高度为 `auto` 的变化。

如果将 `auto` 设置成一个具体的高度值，过渡转换就会生效。

## 72.2 巧用 `max-height` 适配动态高度

将 `height: 0` 改成 `max-height: 0`，再将 `height: auto` 替换成 `max-height: 1000px`，利用 `max-height` 支持 transition 来实现过渡动画。

但这里也有两个缺陷：

- 如果实际场景中需要使用到 `max-height`，那么就无法用这个方法来代替了。
- 另外就是视觉上有延迟，`max-height` 的值与实际高度相差越大越明显。比如实际高度是 `200px`，而 `max-height` 设置为 `1000px`，动画时间为 `1s`，缓动函数为 `linear`。那么实际动画从 0 到 200px 的时候动画就停止了，而动画时间只过去了 0.2秒。

# 73. 边框动画

## 73.1 `border` 属性

谈到边框，首先会想到 `border`，常用的莫过于 `solid / dashed`。

## 73.2 边框长度变化

## 73.3 虚线边框动画

使用 `dashed` 可以方便的创建虚线边框，但如果想让边框产生动画，`dashed` 可能就没有办法了。不过还有许多其他实现虚线的方案，比如渐变。

另外由于 `border` 和 `background` 在盒子模型上位置的差异，如果要使用它们俩实现切换边框的功能，会有一个视觉上的错位。

解决方案一个是使用 `outline + outline-offset` 代替 `border`。或者通过设置 `background-position` 来解决。

## 73.4 渐变

## 73.5 `conic-gradient`

## 73.6 `clip-path`

如果是单线条渐变的话，边框的末尾部分会是一个小三角而不是垂直的，这在某些场景下不适合。

## 73.7 `overflow`

## 73.8 `border-radius`

## 73.9 `border-image`

## 73.10 `border-image` 使用渐变
