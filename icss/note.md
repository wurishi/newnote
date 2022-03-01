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

