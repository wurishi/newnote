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
$('div:hidden');
// jQuery 并非是依赖 CSS 的 visibility, opacity 或 display 来判断元素是否显示的，除以下几种情况外都会被认定为可见元素：
// display: none;
// type="hidden" 的表单元素
// width 和 height 为 0
// 隐藏的父元素

$('div:gt(2)'); // 从第三个开始之后的所有 div

$('div:animated'); // 动画已经播放完的 div
```

### 2. 是否包含某个元素

```js
if ($('div.foo')) {} // 错误的方法，因为 $() 始终会返回一个对象
if ($('div.foo').length) {} // 正确的方法，长度为 0 时，表示没有此元素
```

### 3. 缓存查询结果

jQuery 并不会缓存查询结果

```js
const divs = $('div');
```

如果要经常性的使用查询结果，应该使用一个变量把它缓存下来。不过需要注意的是，当 DOM 发生改变时，需要再次调用 `$()` 查询。

### 4. Refining & Filtering Selections

```js
$('div.foo').has('p'); // div.foo 是否包含 p 标签
$('h1').not('.bar'); // classname 中没有 bar 的 h1 标签
$('ul li').filter('.current'); // classname 为 current 的 ul li 标签
$('ul li').first(); // 第一个
$('ul li').eq(5); // 第六个
```

### 5. Selecting Form

```js
$('form :checked'); // :checked 对 checkboxes, radio buttons, selects 有效
$('form :disabled'); // input 标签是否被设置了 disabled ，这种写法性能更好，也可以用 $('form input').filter(':disabled') 代替
$('form :enabled'); // 与 :disabled 相对的，是查找没有被设置 disabled 属性的元素
$('form :input'); // 包含 input, textarea, select, button 等元素
$('form :selected'); 
// :password
// :reset
// :radio
// :text
// :submit
// :checkbox
// :button
// :image
// :file
```

## Working with Selections

```js
$('h1').html('hello world'); // setter
$('h1').html() // getter 'hello world'
```

要注意的是 jQuery 支持链式调用，即可以这样：`$('h1').find('h3').eq(2).html('html')`。

但像 `html()` 这种支持 `setter/getter` 的方法，只有在 `setter()` 时才支持链接调用，也就是说下面这种写法是不对的：

```js
$('h1').html().addClass('test'); // 不支持
```

此外，如果使用了 `eq()` 之后想要返回到上一级，可以使用 `end()` 方法：

```js
$('#content')
    .find('h3')
    .eq(2)
        .html('h3')
        .end() // 恢复到 #content 的所有 h3 的 selector 下
    .eq(0)
        .html('first h3');
```

## Manipulating Elements

### 1. Getting and Setting

- `.html()` - 获取或设置元素的 html 内容
- `.text()` - 获取或设置元素的 text 内容，html 将会被删除
- `.attr()` - 获取或设置元素的属性
- `.width()` - 获取或设置元素的宽（像素）
- `.height()` - 获取或设置元素的高（像素）
- `.position()` - 获取元素的位置（仅只读）
- `.val()` - 获取或设置 Form 元素的值

要注意的是上述方法的 Setting 是针对查询到的所有元素进行操作的，所以在 set 时最好是使用 `first eq` 等指定到具体的元素。

### 2. Moving, Copying, and Removing Elements

- `$('a').after($('b'))` - a 的后面是 b: a -> b
- `$('a').insertAfter($('b'))` - a 插入到 b 的后面 b -> a
- `insertBefore()`
- `before()`
- `appendTo()`
- `append()`
- `prependTo()`
- `prepend()`
- `clone()` - 克隆元素
- `remove()` - 删除元素包括事件监听
- `detach()` - 暂时删除元素，将元素重新放回页面时之前的事件监听仍然保留

### 3. Creating New Elements

```js
$('<p>content</p>');
$('<a />', {
    html: '<strong>link</strong> content',
    'class': 'new',
    href: 'foo.html',
});
// 要注意的是，每次添加一个 DOM 是非常消耗资源的事情，如果想要加入多个元素，应该试着将他们聚合在一起一次性提交，比如说这样：
const myItems = [];
for (let i = 0; i < 100; i++) {
    myItems.push(`<li>${i}</li>`);
}
$('ul').append(myItems.join(''));
```

### 4. Manipulating Attributes

```js
$('a').attr('herf', 'foo.html');
$('a').attr({
    href: 'foo.html',
    rel: 'nofollow',
});
$('a').attr({
    href: function(idx, href) {
        return '/new/' + href;
    }
});
```