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



