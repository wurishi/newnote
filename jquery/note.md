https://learn.jquery.com/using-jquery-core/dollar-object-vs-function/

# Using jQuery Core

## $ vs $()

## ${document}.ready()

例子：ready.html

```js
$(function() {
    console.log('ready');
});
// 仅当 page 的 Document Object Model (DOM) 加载完成时调用

$(window).on('load', function() {
    console.log('load');
});
// 会在整个页面加载完成时调用（包括 images 和 iframe)
```

## Avoiding Conflicts with Other Libraries

默认 jQuery 会占用 `$` 和 `jQuery` 二个全局变量。如果使用的其他第三方库也占用了 `$` 全局变量，可以通过 `noConflict()` 方法来解决冲突。

### 1. jQuery 后加载

如果像下面这样：

```html
<script src="prototype.js"></script>
<script src="jquery.js"></script>
```

jquery 的 `$` 覆盖了 `prototype` ，可以这样写：

```js
var $j = jQuery.noConflict();
$j('div'); // jQuery 方法
$('main'); // prototype 的方法被恢复了
```

### 2. jQuery 先加载

```html
<script src="jquery.js"></script>
<script src="prototype.js"></script>
```

```js
jQuery(document); // 因为无法恢复 $ ，只能调用 jQuery 方法
$('main'); // prototype 方法
```

### 3. 使用立即执行函数

在不关心执行先后顺序，又想使用 `$` 可以有以下几种形式：

```js
// 1
jQuery.noConflict();
(function($) {
    // 这里的 $ 是 jQuery
})(jQuery);

// 2
jQuery(document).ready(function ($) {
    // 这里的 $ 是 jQuery 本身
});

// 3
jQuery(function ($) {
    // 这里的 $ 是 jQuery 本身
});

```

## Attributes

通过 `.attr()` 方法可以访问任何对象所包含的属性。

```js
$('a').attr('href', '1.html'); // 设置一个属性
$('a').attr({
    title: 'title',
    href: '2.html',
}); // 设置多个属性
const href = $('a').attr('href'); // 获取属性
```

## Selecting Elements

### 1. Selecting 的方式

```js
$('#myId'); // by ID
$('.myClass'); // by Class Name
$("input[name='first_name']"); // by Attribute
$('#contents ul.people li'); // CSS 选择器
$('div.myClass, ul.people'); // 逗号分隔的列表

// 与 CSS2-3 相同的 CSS 选择器语法
$('a.external:first');
$('tr:odd');

$('#myForm :input'); // 所有 #myForm 中的类似 input 的元素 (包含 input, button, select 等)

$('div:visible');
```
