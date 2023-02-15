first

```
console.log(100)
```

end

```
```

empty

# 01. 从一个对象生成一个联合类型

```typescript
export const fruitCounts = {
  apple: 1,
  pear: 4,
  banana: 26,
};

type SingleFruitCount =
  | { apple: number }
  | { banana: number }
  | { pear: number };

const singleFruitCount: SingleFruitCount = {
  banana: 12,
};
```

看起来不错

### Browser

It also works in a browser; here is a complete example:

```html
<!DOCTYPE html>
<html>
  <body>
    <textarea id="text-input" oninput="this.editor.update()"
              rows="6" cols="60">Type **Markdown** here.</textarea>
    <div id="preview"> </div>
    <script src="lib/markdown.js"></script>
    <script>
      function Editor(input, preview) {
        this.update = function () {
          preview.innerHTML = markdown.toHTML(input.value);
        };
        input.editor = this;
        this.update();
      }
      var $ = function (id) { return document.getElementById(id); };
      new Editor($("text-input"), $("preview"));
    </script>
  </body>
</html>
```

### Command Line

Assuming you've installed the `md2html` script (see Installation,
above), you can convert Markdown to HTML:

```javascript
for(const item in object) {
  
}
```