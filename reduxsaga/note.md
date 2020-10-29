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

## 04: 高级

### 04-01: 监听未来的 action

`takeEvery`/ `takeLatest`只是一个在强大的低阶 API 之上构建的 wrapper effect. 接下来使用一个新的 Effect`take`. `take`让我们通过全面控制 action 观察进程来构建复杂的控制流成为可能.

一个简单的日志记录器:

```js
function* watchAndLog_take() {
  while (true) {
    const action = yield take('*');
    const state = yield select();

    console.log('action', action);
    console.log('state after', state);
  }
}
```

`take`就像我们更早之前看到的 `call`和 `put`. 它创建另一个命令对象, 告诉 middleware 等待一个特定的 action. 正如在 `call`Effect 的情况中, middleware 会暂停 Generator, 直到返回的 Promise 被 resolve. 在 `take`情况中, 它将会暂停 Generator 直到一个匹配的 action 被发起.

注意, 这里使用了一个无限循环 `while(true)`. 因为它是一个 Generator 函数, 所以它不具备 `从运行至完成(run-to-completion behavior)`的行为. Generator 将在每次迭代阻塞以等待 action 发起.

在`takeEvery`的情况中, 被调用的任务无法控制何时被调用, 它将在每次 action 被匹配时一遍遍地调用. 并且它们也无法控制何时停止监听.

而在 `take`的情况中, 控制恰恰相反. 与 action 被 `推向(pushed)`的任务处理函数不同, Saga 是自己主动 `拉取(pulling)`action 的.

这样的反向控制让我们可以使用传统的 push 方法实现不同的控制流程.

比如我们希望监听用户发送三次 action 之后, 显示祝贺信息:

```js
function* watchFirstThreeAction() {
  for (let i = 0; i < 3; i++) {
    const action = yield take('*');
  }
  yield put({ type: 'SHOW_CONGRATULATION' });
}
```

与 `while(true)`不同, 这里运行了一个只迭代三次的 `for`循环, 在 `take`初次的3个 action 之后, saga 会发送一条祝贺信息的 action 然后结束. 这意味着 Generator 会被回收并且相应的监听不会再发生.

主动拉取 action 的另一个好处是我们可以使用熟悉的同步风格来描述控制流. 举个例子, 假设我们希望实现一个这样的登录控制流, 有两个 action 分别是 `LOGIN`和 `LOGOUT`. 使用 `takeEvery`或 redux-thunk 我们必须要写两个分别的任务或 thunks : 一个用于 `LOGIN`, 另一个用于 `LOGOUT`.

结果就是逻辑被分开在两个地方, 并且在阅读代码时为了搞明白情况, 还需要在大脑中重新排列它们从而重建控制流模型.

使用拉取(pull)模式, 则可以让我们在同一个地方写控制流, 而不是重复处理相同的 action.

```js
function* loginFlow() {
    while(true) {
        yield take('LOGIN');
        // ...
        yield take('LOGOUT');
        // ...
    }
}
```

这样的 saga 会更好理解, 因为序列中的 actions 就是我们期望中的. 它知道 `LOGIN`action 后面应该始终跟着一个 `LOGOUT`action.

### 04-02: 无阻塞调用

```js
function* loginFlow() {
  while (true) {
    const { user, password } = yield take('LOGIN_REQUEST');
    const token = yield call(authorize, user, password);
    if (token) {
      yield put({ type: 'STORE_TOKEN', token });
      yield take('LOGOUT');
      yield put({ type: 'CLEAR_tOKEN' });
    }
  }
}
```

这样的 loginFlow 有一个问题, 即在等待 authorize 时, 如果触发了 `LOGOUT` action, 因为此时 generator 还被阻塞在 `yield call(authorize, user, password)`处, 导致 `LOGOUT`会被错过. 这是因为 `call`是一个会阻塞的 Effect, 即 Generator 在调用它结束之前是不能执行或处理其他事情的. 但在这里, 我们希望 `LOGOUT`与 `authorize`是并发的, 所以我们需要以非阻塞的形式调用 `authorize`方法. 这样 loginFlow 就能继续执行, 并且监听并发的响应.

redux-saga 提供了一个表示无阻塞调用的 Effect: `fork`. 当我们 fork 一个任务时, 任务会在后台启动, 调用者可以继续自己的流程, 而不用等待被 fork 的任务结束.

```js
function* newLoginFlow() {
  while (true) {
    const { user, password } = yield take('LOGIN_REQUEST');
    yield fork(authorize, user, password);
    yield take(['LOGOUT', 'LOGIN_ERROR']);
    yield put({ type: 'CLEAR_TOKEN' });
  }
}
```

`yield take(['LOGOUT', 'LOGIN_ERROR'])`意思是监听 2 个并发的 action.

但还没完, 如果 `authorize`和 `LOGOUT`是并发调用了, 那么我们需要在收到 `LOGOUT`时, 取消 `authorize`的任务, 否则 `authorize`成功获取响应(或失败的应用)后还是会发起一个 `LOGIN_SUCCESS`或 `LOGIN_ERROR`, 这将导致状态不一致.

为了取消 fork 任务, 我们可以使用一个指定的 Effect `cancel`.

```js
function* newLoginFlow() {
  while (true) {
    const { user, password } = yield take('LOGIN_REQUEST');
    const task = yield fork(authorize, user, password);
    const action = yield take(['LOGOUT', 'LOGIN_ERROR']);
    if (action.type === 'LOGOUT') {
      yield cancel(task);
    }
    yield put({ type: 'CLEAR_TOKEN' });
  }
}
```

另外 `cancel`Effect 并不是粗暴地结束了 `authorize`任务, 相反, 它会给予任务一个机会用来执行清理的逻辑, 那就是 `cancelled`Effect.

```js
function* authorize(user, password) {
  try {
    const token = yield call(mockAPI, user, password);
    yield put({ type: 'LOGIN_SUCCESS', token });
    return token;
  } catch (error) {
    yield put({ type: 'LOGIN_ERROR', error });
  } finally {
    if (yield cancelled()) {
      console.log('被主动取消了');
    }
  }
}
```

### 04-03: 同时执行多个任务

`yield`指令可以很简单的将异步控制流以同步的写法表现出来, 但如果要同时执行多个任务, 不能像下面这样写:

```js
const users = yield call(fetch, '/users'),
      repos = yield call(fetch, '/repos');
```

因为这样写, 第二个 effect 将会在第一个 `call`执行完毕之后才开始, 所以应该这样写:

```js
const [users, repos] = yield all([
    call(fetch, '/users'),
    call(fetch, '/repos')
]);
```

当 `yield all`一个包含 effects 的数组时, generator 会被阻塞直到所有的 effects 都执行完毕, 或者当其中一个 effect 被拒绝 (就像 `Promise.all`的行为)

### 04-04: 在多个 Effects 之间启动 race

下面的示例演示了触发一个远程请求, 并且限制在1秒内响应, 否则作超时处理.

```js
function* fetchPostsWithTimeout(time) {
  const { posts, timeout } = yield race({
    posts: call(mockFetch, '/posts'),
    timeout: delay(time),
  });
  if (posts) {
    yield put({ type: 'POSTS_RECEIVED', posts });
  } else {
    yield put({ type: 'TIMEOUT_ERROR' });
  }
}
```

`race`的另一个有用的功能是, 它会自动取消那些失败的 Effects.

```js
function* backgroundTask() {
  try {
    while (true) {
      yield delay(1000);
      yield put({ type: 'REFRESH', time: Date.now() });
    }
  } catch (error) {
  } finally {
    if (yield cancelled()) {
      yield put({ type: '主动取消了' });
    }
  }
}

function* watchStartBackgroundTask() {
  while (true) {
    yield take('START_BACKGROUND_TASK');
    yield race({
      task: call(backgroundTask),
      cancel: take('CANCEL_TASK'),
    });
  }
}
```

当 `CANCEL_TASK`被发起时, `race`会自动取消 `backgroundTask`, 并且 `backgroundTask`中的 finally 块将被执行到并发现自己被 `cancelled`了.