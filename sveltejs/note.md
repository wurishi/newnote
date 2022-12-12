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

<img src="{src}" />
```

##### c1: 双引号内使用 `{}`

也可以在属性值的内部使用 `{}`，如：

```html
<img src="{src}" title="link is {src}" />
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
<button on:click="{handleClick}">
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

## c. 反应式语句

在 `$:` 之后不仅可以提供 `反应式声明` 的值，还可以运行 `反应式语句`。例如，当某个变量的值发生改变时，就输出日志：

```typescript
$: console.log(`the count is ${count}`)
```

当然也可以使用 `{}` 将一组语句合成一个代码块：

```typescript
$: {
    const doubleCount = count * 2
    console.log(`the doubleCount is ${doubleCount}`)
}
```

甚至还可以将 `$:` 放在 `if` 代码块前：

```typescript
$: if (count >= 10) {
    alert('count is dangerously high!')
    count = 9
}
```

## d. 更新数组和对象

由于 `svelte` 的反应性是由赋值语句触发的，因此使用数组的诸如 `push` 和 `splice` 之类的方法就不会触发自动更新，要解决这个问题的一种方法是添加一个多余的赋值语句：

```typescript
<script lang="ts">
    let numbers = [1, 2, 3, 4]

    function addNumber() {
        numbers.push(numbers.length + 1)
        numbers = numbers // 只有这样才会触发自动更新
    }

    $: sum = numbers.reduce((t, n) => t + n, 0)
</script>

<p>{numbers.join(' + ')} = {sum}</p>

<button on:click={addNumber}> Add a number </button>

```

但还有一个更惯用的解决方案：

```typescript
function addNumber() {
    numbers = [...numbers, number.length + 1]
}
```

要注意的是对数组和对象的属性 `例如：obj.foo += 1 或 array[i] = 0` 进行赋值操作并不需要什么特殊的解决自动更新的方案。就和对值本身进行赋值一样的方式即可。

```typescript
// 以下代码都会触发自动更新

numbers[0] = 0

obj.name = 'xxl'
```

一个简单的经验法则是：被更新的变量的名称必须出现在赋值语句的左侧。像下面这个例子，就不会触发自动更新：

```typescript
const foo = obj.foo
foo.bar = 'baz'

// 除非在最后使用了 obj = obj 这种方式，否则 obj.foo.bar 并不会更新
```

# 3. 属性

## a. 声明属性

目前为止，我们只是处理了内部状态 - 即，这些值都只能在当前的组件中被访问到。

实际上，在绝大部分的真实案例中。我们都需要将数据从一个组件传递到另一个组件。最常见的就是将一个值传递给它的子组件。要做到这一点，`svelte` 使用 `export` 关键字
来声明属性。

在子组件中这样写：

```typescript
<script lang="ts">export let answer</script>
```

然后在父组件中就可以给子组件传递数据了：

```typescript
<script lang="ts">
    import Component from './3.a_comp.svelte'
</script>

<Component answer={42} />
```

与 `$:` 类似，在标准的 `JavaScript` 中 `export` 并不是这样工作的，它是 `svelte` 特有的语法。

## b. 默认值

我们可以在子组件中很轻松的给属性设置默认值：

```typescript
export let answer = 'a mystery'
```

此时，如果父组件没有指定 `answer` 属性的值，就将显示默认值。

## c. 属性传递

如果有一组属性需要传递（spread）到一个组件上，可以使用 `...` 语法而不用逐一指定：

```typescript
<Component {...props} />
```

另外如果需要获取到所有传递给组件的属性，包括未使用 `export` 声明的属性。可以使用 `$$props` 关键字。但通常不建议这样做，因为这会让 `svelte` 难以优化。

```typescript
$: console.log('所有传递过来的属性：', $$props)
```

# 4. 逻辑

## a. if 块

在 HTML 标签中是没有表达逻辑的方式的，比如判断，循环等。

在 `svelte` 中使用一些特殊的标签来实现在 HTML 中使用逻辑。

```html
{#if user.loggedIn}
<button on:click="{toggle}">Log out</button>
{/if} {#if !user.loggedIn}
<button on:click="{toggle}">Log in</button>
{/if}
```

如上，在 `svelte` 中使用 `{#if 条件表达式} {/if}` 来实现在 HTML 中的 `if` 语句块。

## b. else 块

在上一个例子中我们使用了二个 `if` 语句块，但实际上在这里，第二个 `if` 语句块我们更习惯于用 `else` 语句块来实现，在 `svelte` 中是这样实现 `else` 语句的：

```html
{#if user.loggedIn}
<button on:click="{toggle}">Log out</button>
{:else}
<button on:click="{toggle}">Log in</button>
{/if}
```

在 `svelte` 中，特殊标记总是以 `#` 开头的标记，并以 `/` 开头的标记作为结尾。像是 `else` 这种在中间出现的标记则是以 `:` 开头。

## c. else-if 块

将多个条件链接在一起请使用 `else if`:

```html
{#if x > 10}
<p>{x} is greater than 10</p>
{:else if x < 5}
<p>{x} is less than 5</p>
{:else}
<p>{x} is between 5 and 10</p>
{/if}
```

## d. each 块

使用 `each` 块遍历数据列表

```typescript
<script lang="ts">
    const cats = [
        { id: '1', name: 'Keyboard Cat' },
        { id: '2', name: 'Maru' },
    ]
</script>

<ul>
    {#each cats as cat}
        <li>
            {cat.name}
        </li>
    {/each}
</ul>
```

所有的 `iterable` 对象都可以通过 `each` 遍历

另外可以指定 `index` 作为第二个参数（key）。

```html
{#each cats as cat, index}
        <li>
            {index} : {cat.name}
        </li>
{/each}
```

## e. 为 each 添加 key 值

一般情况下，当修改了 `each` 块中的值是，`svelte` 会在尾端进行添加或删除条目，并更新所有变化。但这可能不是你想要的结果。

```html
<script lang="ts">
    import Component from './4.e_comp.svelte'

    let list = [
        { id: 1, color: '#0d0887' },
        { id: 2, color: '#6a00a8' },
        { id: 3, color: '#b12a90' },
        { id: 4, color: '#e16462' },
        { id: 5, color: '#fca636' },
    ]

    function handleClick() {
        list = list.slice(1)
    }
</script>

<button on:click={handleClick}>Remove first thing</button>

{#each list as item (item.id)}
    <Component current={item.color} />
{/each}
```

如果在 `each` 块不指定 `(item.id)` 作为 `key`，则列表会从底部删除元素来响应 `list = list.slice(1)` 造成的更新。但这会导致其他所有元素都重新渲染。添加了 `key` 之后等于是告诉了 `svelte` 什么地方需要改变。此时列表中只有被更新/删除的数据对应的元素才会被重新渲染。

另外你可以使用任何对象用作 `key`。这意味着在上面代码中，你也可以直接使用 `(item)` 来代替 `(item.id)` 作为 `key` 值。但是一般使用数字或字符串作为 key 值更安全。例如，使用来自 API 服务器的新数据进行更新时。

## f. await 块

在 `svelte` 中可以直接使用 `await 块` 在 HTML 标签中处理 `promise`。

```html
<script lang="ts">
    async function getRandomNumber() {
        return new Promise<number>((resolve, reject) => {
            setTimeout(() => {
                resolve(Math.random())
            }, 1000)
        })
    }

    let promise = getRandomNumber()

    function handleClick() {
        promise = getRandomNumber()
    }
</script>

<button on:click={handleClick}>generate random number</button>

{#await promise}
    <p>...waiting</p>
{:then number}
    <p>The number is {number}</p>
{:catch error}
    <p style="color: red;">{error.message}</p>
{/await}
```

另外 `wait` 阶段和 `cache` 块是可以被忽略的，所以如果只想在 `promise` 正确返回时执行操作，可以简写成这样：

```html
{#await promise then num}
    <p>The number is {num}</p>
{/await}
```

# 5. 事件

## a. DOM 事件

大之前的例子中其实已经出现过了，我们可以使用 `on:事件名` 的方式监听 DOM 元素的所有事件。

```末尾空白
末尾空白









```
