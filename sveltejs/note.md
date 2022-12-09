# 1. 简介

## a. 基础知识

svelte 把客户端渲染的工作更多的放在了编译阶段，因此可以抛弃 `虚拟DOM` 直接对 DOM 作精确修改。

svelte 也是基于组件开发的，每一个组件就是一个包含了 `html` `<script>` `<style>` 三种元素的 `.svelte` 文件。

即，如果只需要静态内容，直接在 `.svelte` 文件中加上 html 标签即可。

```html
<h1>Hello world!</h1>
```

## b. 添加数据

在 html 中引入动态内容的方式是，首先添加一个 `script` 标签，并在里面写代码。然后在 `html` 中，使用 `{}` 即可引用代码标签的变量，方法等。并且在 `{}` 中也可以执行一些语句。

```html
<script lang="ts">
    const name = 'world'
</script>

<h1>Hello {name.toLocaleUpperCase()}!</h1>
```

## c. 动态属性

同样的也可以使用 `{}` 用来给元素属性设置动态值。

```html
<script lang="ts">
    const src = '/vite.svg'
</script>

<img src={src} />
```

##### c1: 双引号内使用 `{}`

也可以在属性值的内部使用 `{}`，如：

```html
<img src={src} title="link is {src}" />
```

##### c2: 速记属性

当属性名与变量名相同是，`svelte` 提供了一个速记法：

```html
<img {src} />
```

## d. CSS 样式

与 `HTML` 一样，在组件中添加一个 `<style>` 标签，即可在该标签内添加 CSS 样式了。

```html
<p>This is a paragraph.</p>

<style>
    p {
        color: purple;
        font-family: 'Comic Sans MS', cursive;
        font-size: 2em;
    }
</style>
```

要注意的是，添加的样式作用域将被限定在当前组件中。

## e. 嵌套组件

将整个应用程序都放在一个组件中是不切实际的。`svelte` 允许你在 `script` 标签中 `import` 其他文件中的组件，并直接以 `<Component />` 的形式在 `html` 中使用。

```html
<script lang="ts">
    import DComponent from './1.d.svelte'
</script>

<p>This is my paragraph.</p>
<DComponent />
```

要注意的是如前一节提到，CSS 样式被限定在 `1.d.svelte` 中了，所以并不造成当前组件 `p` 标签的样式被意外地修改。

另外组件首字母大写是一种普遍的约定，主要是为了能够区分自定义组件和普通的 `html` 标签。

## f. HTML 标签

通常情况下，字符串是以纯文本的形式插入的，这意味着像 `<` `>` 这样的字符会原样输出。

但如果我们期望将字符串以 HTML 的形式输出时，可以使用 `{@html }` 实现：

```html
<script lang="ts">
    const string = `this string contains some <strong>HTML!!!</strong>`
</script>

<p>{string}</p>

<p>{@html string}</p>
```

第一行会原样输出字符串的内容，而第二行会将 `<strong>` 作为一个 html 标签，显示加粗的 `HTML!!!`。

要<b>注意</b>的是，`svelte` 并不会对 `{@html }` 内的输出做任何清理。所以要使用此功能时，切记要手动转换来自不信任源的 `html` 代码，以防止 `XSS` 攻击的风险。

# 2. 反应性 (reactive) 能力

## a. 赋值

`svelte` 的内核是一个强大的 `reactivity` 系统。能够让 DOM 和程序状态保持同步，比如事件响应。

定义一个变量，再定义一个方法用来改变这个变量(重新赋值）：

```html
<script lang="ts">
    let count = 0

    function handleClick() {
        count += 1
    }
</script>
```

注册事件的语法为 `on:event={eventHandler}`，如果要为一个按钮添加鼠标点击事件，可以这样：

```html
<button on:click={handleClick}>
    Clicked {count}
</button>
```

## b. 反应性声明

当组件的某些状态是需要其他部分计算出来时（例如，`fullname` 就是由 `firstname` 和 `lastname` 组成的），并且一旦其他部分发生更改，自身也需要重新计算时。

`svelte` 提供了 `反应式声明 (reactive declarations)` 它看起来像这样：

```html
<script lang="ts">
    let count = 0

    $: timeStr = count === 1 ? 'time' : 'times'
</script>
```

对于 `svelte` 而言，它将 `$:` 解释为 “只要参考值变化了，就重新运行此代码”

当然我们也可以在 `html` 标签中写类似的 `{ count === 1 ? 'time' : 'times' }` 而不必非得使用反应式声明。但如果你需要多个地方多次引用到它，使用反应式声明就会变得更有用。（可以理解为反应式声明会缓存结果，对于一次改变，代码只需要执行一次）。

