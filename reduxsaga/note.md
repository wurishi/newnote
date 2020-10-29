[参考链接](https://redux-saga-in-chinese.js.org/)

# Redux Sage

## 01: 概述

redux-sage 是一个用于管理应用程序 Side Effect 的 library, 它的目标是让副作用管理更容易, 执行更高效, 测试更简单, 在处理故障时更容易.

可以想像为, 一个 sage 就像是应用程序中的一个单独的线程, 它独自负责处理副作用. redux-sage 是一个 redux 的中间件, 意味着这个线程可以通过正常的 redux action 从主应用程序启动, 暂停和取消, 它也能访问完整的 redux state, 也可以 dispatch redux action.

redux-sage 使用了 ES6 的 Generator 功能, 让异步的流程更易于读取, 写入和测试. 通过 Generator 让异步的流程看起来就像是标准的同步 JavaScript 代码. (有点像 async / await, 但 Generator 还有一些更棒而且我们也需要的功能).

不同于 redux-thunk, 你不会再遇到回调地狱, 你可以很容易地测试异步流程并保持你的 action 是干净的.

### 01-00: Generator 介绍

[JavaScript Generators 权威指南](https://github.com/gajus/gajus.com-blog/blob/master/posts/the-definitive-guide-to-the-javascript-generators/index.md)

[ES6 Generators 基础](https://davidwalsh.name/es6-generators)

[深入 ES6 generators](https://2ality.com/2015/03/es6-generators.html)

[3 cases where JavaScript generators rock](https://goshakkk.name/javascript-generators-understanding-sample-use-cases/)

### 01-01: 开始

#### 安装

```bash
npm i redux-saga
```

或者, 可以直接在 HTML 页面的 `<script>`标签中使用提供的 UMD 构建文件.

#### 示例 01-01

## 02: 入门教程

一个计数器例子作为入门教程

代码可测试:

```bash
npm i -D jest
```

见 saga.spec.js

## 03: 基础概念

### 03-01: 使用 Saga 辅助函数

redux-saga 提供了一些辅助函数, 包装了一些内部方法, 用来在一些特定的 action 被发起到 Store 时派生任务.

`takeEvery`是最常见的, 它提供了类似 redux-thunk 的行为.

要注意的是, `takeEvery`允许多个生成器函数同时启动. 如:

```js
function* fetchData(action) {
    try {
        const data = yield call(Api.fetchUser, action.payload.url);
        yield put({type: 'FETCH_SUCCESS', data});
    } catch (error) {
        yield put({type: 'FETCH_FAILED', error});
    }
}

function* watchFetchData() {
    yield takeEvery('FETCH_REQUESTED', fetchData);
}
```

在上面这个例子中, `takeEvery`允许多个 `fetchData`实例同时启动. 如果 只想得到最新的数据, 可以使用 `taskLatest`

和 `takeEvery`不同, 在任何时刻, `takeLatest`只允许一个 `fetchData`任务在执行. 并且这个任务是最后被启动的那个. 如果已经有一个任务在执行的时候又启动了另一个, 那么之前的那个任务会被自动取消.

### 03-02: 声明式 Effects

在 `redux-saga`的世界里, Sagas 都用 Generator 函数实现. 我们从 Generator 里 yield 纯 JavaScript 对象以表达 Saga 逻辑, 这些对象被称为 Effect. Effect 是一个简单的对象, 这个对象包含了一些给 middleware 解释执行的信息. 可以把 Effect 看作是发送给 middleware 的指令以执行某些操作 (调用某些异步函数, 发起一个 action 到 store, 等等)

`redux-saga/effects`包里提供了许多函数来创建 Effect.

Sagas 可以 yield 多种形式的 effect. 最简单的方式就是 yield 一个 Promise.

```js
// 假设 Api.fetch 返回一个 Promise
// 为什么 sagas 中不直接这样写
function* fetchData() {
    const products = yield Api.fetch('./products');
}
```

主要是为了单元测试时的方便, 单元测试时, 只需要保存 fetchData 任务 yield 一个调用正确的函数并且有着正确的参数即可. 这样就能用 equal 编写简单与可靠的测试用例了.

所以, 相比于在 Generator 中直接调用异步函数, 更好的方法是仅仅 yield 一条描述函数调用的信息. 也就是说, 可以简单的 yield 一个看起来像下面这样的对象:

```js
// Effect -> 调用 Api.fetch 并传递 './products' 作为参数
{
    CALL: {
        fn: Api.fetch,
        args: ['./poducts']
    }
}
```

出于这个原因, redux-saga 提供了一个不一样的方式来执行异步调用.

```js
import { call } from 'redux-saga/effects';

function* fetchData() {
    const products = yield call(Api.fetch, '/products');
}
```

使用 `call(fn, ...args)`这个函数, 与之前的例子不同, 现在不会立即执行异步调用, 相反, `call`创建了一条描述结果的信息. 这样就能够更容易的测试 Generator 函数. 因为, 即使在 Redux 环境之外, `call`也只是返回一个纯文本对象的函数而已.

这就是 **声明式调用 (declarative calls)** 的优势.

`call`支持调用对象方法, 可以使用以下的形式, 为调用的函数提供一个 `this`上下文.

```js
yield call([obj, obj.method], arg1, arg2, ...); // 等同于 obj.method(arg1, arg2, ...)
```

`apply`提供了另外一种调用的方式:

```js
yield apply(obj, obj.method, [arg1, arg2, ...])
```

`call`和 `apply`非常适合返回 Promise 结果的函数. 另外一个函数 `cps`可以用来处理 Node 风格的函数, 即 callback 为 `(error, result) => {}` 这样的形式. CPS 表示的是延续传递风格 (Continuation Passing Style).

比如:

```js
const content = yield cps(readFile, '/path/to/file');
```

### 03-03: 发起 action 到 store

如果要发起一些 action 通知 Store, 可以找到 Store 的 `dispatch`函数.

```js
function* fetchProducts(dispatch) {
    const products = yield call(Api.fetch, '/products');
    dispatch({ type: 'PRODUCTS_RECEIVED', products });
}
```

然后, 该解决方案和上一节中的在 Generator 内部直接调用函数有着相同的缺点, 即如果我们要测试 `fetchProducts`, 则需要模拟 AJAX 响应之后的 dispatch.

相反的, 我们需要同样的使用声明式的解决方案, 即对于 Generator 而言我们要测试的仅是检查 yield 之后的 effect, 是否包含了正确的指令.

redux-saga 为此提供了另外一个函数 `put`, 这个函数用于创建 dispatch Effect.

```js
import { call, put } from 'redux-saga/effects';

function* fetchProducts() {
    const products = yield call(Api.fetch, '/products');
    yield put({ type: 'PRODUCTS_RECEIVED', products });
}
```

此时测试 fethProducts, 就很简单, 只需要检查 yield 是否是一个 dispatch 指令即可.

### 03-04: 错误处理

使用 `try/catch`

### 03-05: Effect

概括来说, 从 Saga 内部触发的异步操作 (Side Effect) 总是由 yield 一些声明式的 Effect 来完成的. (你也可以直接 yield Promise, 但是这会让测试变得困难)

一个 Saga 所做的实际上是组合那些 Effect, 实现其所需的控制流. 最简单的例子是直接把 yield 一个接一个地放置来对序列化 yield Effect. 当然也可以使用熟悉的控制流操作 (if, while, for) 来实现更复杂的控制流.