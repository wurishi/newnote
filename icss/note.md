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

## 6.2 借助伪元素及 `text-align: justify`

`text-align: justify`可以用来实现两端对齐文本效果：

> `text-align` CSS 属性定义行内内容（如文字）如何相对于它的块父元素对齐。它并不控制块元素自己的对齐，只控制它的行内内容的对齐。
>
> `text-align: justify`表示文字向两侧对齐。

但使用它并没有效果，W3C 上有一段解释：

> 最后一个水平对齐属性是 `justify`，会带来自己的一些问题。CSS 中没有说明如何处理连字符，因为不同的语言有不同的连字规则。
>
> 虽然 `text-align: justify`属性是全兼容的，但是要使用它实现两端对齐，需要注意在模块之间添加 **【空格/换行符/制表符】**才能起作用。

尝试给在 HTML 中添加换行换，但仍无效。

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

# 14. CSS 命名方式是否有必要规范

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