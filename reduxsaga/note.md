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

### 04-05: 使用 yield* 对 Sagas 进行排序

可以使用内置的 `yield*`操作符来组合多个 Sagas, 使得它们保持顺序.

```js
function* game() {
  const score1 = yield* play1();
  const score2 = yield* play2();
  const score3 = yield* play3();
  yield put(showScore(score1));
  yield put(showScore(score2));
  yield put(showScore(score3));
}
```

### 04-06: 组合 Sagas

虽然使用 `yield*`是提供组合 Sagas 的惯用方式, 但这个方法也有一些局限性:

- 如果想要单独测试嵌套的 Generator, 这导致了一些重复的测试代码和重复执行的开销.
- `yield*`只允许任务顺序组合, 所以一次只能 `yield*`一个 Generator.

所以使用 `all`/ `race`等组合 API 可以更加自由的组合各种 saga.

```js
function* mainTask() {
  const scores = yield all([call(task1), call(task2), call(task1)]);
  yield put({ type: 'SCORES', scores });
}
```

```js
function* game() {
  let finished = false;
  while (!finished) {
    yield take('GAME_START');

    const { score, timeout } = yield race({
      score: call(play),
      timeout: delay(5000),
    });

    if (!timeout) {
      finished = true;
      yield put({ type: 'GAME_STOP' });
      yield put({ type: 'SHOW_SCORE', score });
    } else {
      yield put({ type: 'GAME_RESTART' });
    }
  }
}
```

### 04-07: 取消任务

一旦任务被 fork , 可以使用 `yield cancel(task)`来中止任务的执行. 

#### 取消传播

要注意的是取消消息是会不断的往下传播的(相对的, 被回传的值和没有捕捉的错误是不断往上). 

```js
function* task1() {
  try {
    yield call(task2);
  } finally {
    if (yield cancelled()) {
      yield put({ type: 'task1 canceled' });
    }
  }
}

function* task2() {
  try {
    while (true) {
      yield delay(1000);
    }
  } finally {
    if (yield cancelled()) {
      yield put({ type: 'task2 canceled' });
    }
  }
}

function* task() {
  yield take('START_TASK');
  const { task, cancel } = yield race({
    task: call(task1),
    cancel: take('CANCEL_TASK'),
  });
}
```

当触发 `CANCEL_TASK`时, task1 被取消的同时, task2 也会触发取消.

#### 测试 fork effect

```bash
npm i -D @redux-saga/testing-utils
```

```js
import { forkFn, task2 } from './sagas';
import { cancel, fork, take } from 'redux-saga/effects';
import { createMockTask } from '@redux-saga/testing-utils';

test('forkFn', () => {
  const gen = forkFn();

  expect(gen.next().value).toEqual(take('START_FORK'));
  expect(gen.next().value).toEqual(fork(task2));

  const mockTask = createMockTask(); // 创建一个 mockTask, 用来测试取消的情况.

  expect(gen.next(mockTask).value).toEqual(take('CANCEL_FORK'));

  const cancelYield = cancel(mockTask);
  expect(gen.next().value).toEqual(cancelYield);
});
```

#### 自动取消

除了手动调用 `cancel`取消任务之外, 还有一些情况也会自动触发取消.

1. 在 `race`Effect 中, 所有参与 race 的任务, 除了最先完成的任务, 其他任务都会被取消.
2. 并行的 `all`Effect, 一旦其中任何一个任务被拒绝(抛出 Error), 并行的其他未完成的 Effect 都将被自动取消.

### 04-08: redux-saga 的 fork model

在 redux-saga 中, 有 2 个 Effects 可以在后台动态地 fork task.

- `fork`用来创建 attached forks
- `spawn`用来创建 detached forks

#### (一) fork

##### 行为

```js
function* attached() {
  yield take('ATTACHED_START');
  const task1 = yield fork(fetchResource, 'users');
  const task2 = yield fork(fetchResource, 'comments');
  yield delay(500);
  yield put({ type: 'ATTACHED_END' });
}
```

attached 的完整结束其实意味着 3 个 effect 都被成功执行并完成了.

所以以上这种写法也可以用 `all`替换

```js
function* attached() {
    yield all([
        call(fetchResource, 'users'),
        call(fetchResource, 'comments'),
        delay(500)
    ]);
}
```

所以被附加的 fork 与平行的 Effect 共享相同的语意:

- 在平行情况下执行 task
- 在所有被执行的 task 结束后, parent effect 才算是结束

##### Error 传播

```js
function* attachedErr() {
  yield take('ATTACHED_START_1');
  const task1 = yield fork(fetchResource, 'users', 10);
  const task2 = yield fork(fetchResource, 'comments');
  const take3 = yield fork(errorR, 'error_1', 50);
  yield delay(500);
  yield put({ type: 'ATTACHED_END' });
}
```

和 `all`的行为类似, 当 fork 中的一个任务抛出错误后, 其他所有未执行完成的任务都会被取消. (要注意的, 已经完成的任务是无法得知任务被取消的)

##### Cancellation

当 main task 被 `cancel`后, 其他 fork 的正在运行中的任务也会被取消. (**与文档冲突**)

#### (二) spawn

```js
function* detached() {
  yield take('DETACHED');
  const task1 = yield spawn(fetchResource, 'users', 10);
  const task2 = yield spawn(fetchResource, 'comments');
  const take3 = yield spawn(errorR, 'error_1', 50);
  yield delay(500);
  yield put({ type: 'DETACHED_END' });
}
```

使用 spawn 执行的是被分离到它们本身执行上下文的任务. 该任务不会因为父任务的原因而被终止. 所以 spawn 的任务抛出的错误不会冒泡到父任务而导致其他分离的任务被取消. (如果需要取消, 必须明确的手动去取消它们).

简单来说, 被分离的任务, 更像是直接使用 `middleware.run`API 启动的 root Saga.

### 04-09: 并发

之前使用过辅助函数 `takeEvery`和 `takeLatest`effect 来管理 Effects 之间的并发.

现在看看如何使用低阶 Effects 来实现这些辅助函数.

#### takeEvery

```js
const takeEvery = (pattern, saga, ...args) =>
  fork(function* () {
    while (true) {
      const action = yield take(pattern);
      yield fork(saga, ...args.concat(action));
    }
  });
```

#### takeLatest

```js
const takeLatest = (pattern, saga, ...args) =>
  fork(function* () {
    let lastTask;
    while (true) {
      const action = yield take(pattern);
      if (lastTask) {
        yield cancel(lastTask); // 如果任务已经结束, cancel 为空操作
      }
      lastTask = yield fork(saga, ...args.concat(action));
    }
  });
```

### 04-10: 测试 Sagas

有两种主要的测试 Sagas 的方式:

- 一步一步测试 saga generator function
- 执行整个 saga 并断方 side effects

#### 测试 Saga generator function

```js
export function* changeColorSaga() {
  const action = yield take(CHOOSE_COLOR);
  yield put(changeUI(action.payload.color));
}
```

一步一步地测试, 因为 saga 使用声明式的 effect, 所以每一步 yield 其实都是一个可以预测的 plain object:

```js
test('test changeColorSaga', () => {
  const gen = changeColorSaga();
  expect(gen.next().value).toEqual(take(CHOOSE_COLOR));

  const color = 'red';
  expect(gen.next(chooseColor(color)).value) //
    .toEqual(put(changeUI(color)));

  expect(gen.next().done).toEqual(true);
});
```

#### Branching Saga

有时候 saga 可能会有不同的结果, 为了测试不同的 branch 而不重复所有的流程, 可以使用 `cloneableGenerator`(在 `@redux-saga/testing-utils` 中)

```js
export function* doStuffThenChangeColor() {
  yield put(doStuff());
  yield put(doStuff());
  const action = yield take(CHOOSE_NUMBER);
  if (action.payload.number % 2 === 0) {
    yield put(changeUI('red'));
  } else {
    yield put(changeUI('blue'));
  }
}
```

测试 `action.payload.number % 2 === 0`, 可以使用 `cloneableGenerator`, 在流程中间 clone 不同的 gen 用来测试不同的逻辑分支.

```js
const gen = cloneableGenerator(doStuffThenChangeColor)();
  expect(gen.next().value).toEqual(put(doStuff()));
  expect(gen.next().value).toEqual(put(doStuff()));
  expect(gen.next().value).toEqual(take(CHOOSE_NUMBER));
  let clone = gen.clone(); 
  expect(clone.next(chooseNumber(0)).value).toEqual(put(changeUI('red')));
  clone = gen.clone();
  expect(clone.next(chooseNumber(1)).value).toEqual(put(changeUI('blue')));
```

#### 测试完整的 Saga

使用 `runSaga`自定义 put / select 等等的行为, 可以脱离 store 测试完整的 Saga. (见 04-11)

### 04-11: 连接 Sagas 至外部输入和输出

我们已经看到, `take`Effect 的作用是等待 action 被发起到 Store (resolved). `put`Effect 的作用是发起一个 action 来解决问题的, action 会被作为参数传给 Store.

当 Saga 启动后(不管是初始启动, 还是稍后动态启动), middleware 会自动将它的 `take`/ `put`连接至 store. 这2个 Effect 可以被看作是一种 Saga 的输入/输出 (Input/Output).

redux-saga 提供了一种方式在 redux middleware 环境外部运行 Saga, 并可以连接至自定义的输入输出 (Input/Output)

```js
import { runSaga } from 'redux-saga'

function* saga() {}

runSaga({
    dispatch: action => {
        // put 的 action
    },
    getState: () => {
        // 自定义 select 得到的 store
        return {
            state: 'hello world'
        };
    }
}, saga);
```

### 04-12: 使用 Channels

目前为止, 我们使用了 `take`和 `put`来与 Redux Store 进行通信. 而 Channels 则是可以被用来处理这些 Effects 与外部事件源或 Sagas 之间的通信的. 它们还可以用于在 Store 中对特定的 actions 进行排序.

- 使用 `yield actionChannel`Effect 缓存特定的 action.
- 使用 `eventChannel`factory function 连接 `take`Effects 至外部的事件来源.
- 使用通用的 `channel`factory function 创建 `channel`, 并在 `take`/ `put`Effects 中使用它来让两个 Saga 之间通信.

#### 使用 `actionChannel`Effect

```js
function* watchRequests() {
    while(true) {
        const { payload } = yield take('REQUEST');
        yield fork(handleRequest, payload);
    }
}
```

这个例子演示了经典的 watch-and-fort 模式. watchRequests 使用 fork 来避免阻塞, 因此它不会错过任何来自 store 的 action. 但是如果并发产生多个 REQUEST action, 则 handleRequest 会有多个同时执行.

假设我们的需求如下: 每次只处理一个 REQUEST action. 比如有 4 个 REQUEST action 发起了, 但我们想一个个处理, 处理完成第一个 action 之后再处理第二个.

此时我们就需要有一个队列 (queue), 来保存所有未处理的 action. 每当我们处理完当前的 handleRequest 之后, 就可以队列中获取下一个.

Redux-Saga 提供了一个 helper Effect `actionChannel` 就可以为作为这样的一个队列.

```js
function* watchRequests() {
  // 1. 为 REQUEST actions 创建一个 channel
  const requestChan = yield actionChannel('REQUEST');
  while (true) {
    // 2. take from the channel
    const { url } = yield take(requestChan);
    // 3. 这里使用 call 阻塞调用, 所以只有完成了 handleRequest, 才会处理后一个
    yield call(handleRequest, url);
  }
}
```

默认情况下, `actionChannel`会无限制缓存所有传入的消息. 如果想要更多地控制缓存, 可以提供一个 Buffer 参数给 `actionChannel`. Redux-Saga 提供了一些常用的 buffers (none, dropping, sliding), 当然也可以自己实现.

如果只想要处理最近的五个项目(缓存池最多缓存5个, 消费掉后可以继续往里面加):

```js
import { buffers } from 'redux-saga';
import { actionChannel } from 'redux-saga/effects';

function* watchRequests() {
    const requestChan = yield actionChannel('REQUEST', buffers.sliding(5));
    // ...
}
```

#### 使用 `eventChannel`factory 连接外部的事件

`eventChannel`是一个 factory function, 不是一个 Effect. 它可以为 Redux Store 以外的事件来源创建一个 Channel.

每秒发生一个数字:

```js
import { eventChannel, END } from 'redux-saga';
function countdown(secs) {
  return eventChannel((emitter) => {
    const iv = setInterval(() => {
      secs -= 1;
      if (secs > 0) {
        emitter(secs);
      } else {
        emitter(END); // 这里会导致 channel 关闭
      }
    }, 1000);
    return () => {
      clearInterval(iv);
    };
  });
}
```

```js
export function* countdownSaga() {
  const chan = yield call(countdown, 5);
  try {
    while (true) {
      const seconds = yield take(chan);
      yield put({ type: 'SECOND', seconds });
    }
  } finally {
    yield put({ type: 'SECOND_END' });
  }
}
```

通过 `yield call(countdown)`创建一个 `eventChannel`.

通过 `yield take(chan)`获取自定义的事件源中的消息. (这里是每秒接收到一次).

要注意 countdown 函数最后返回了一个函数, 这个是订阅者模式常见的返回一个 `unsubscribe`函数, 该函数用来在事件完成之后处理一些清理工作.

另外, 如果想要在 saga 中主动关闭 channel, 可以使用 `chan.close()`来关闭.

```diff
export function* countdownSaga() {
  const chan = yield call(countdown, 5);
  try {
    while (true) {
      const seconds = yield take(chan);
      yield put({ type: 'SECOND', seconds });
    }
  } finally {
    yield put({ type: 'SECOND_END' });
+   if (yield cancelled()) {
+     chan.close(); // 主动关闭
+   }
  }
}
```

> 注意: eventChannel 上的消息默认不会被缓存, 如果需要缓存, 请手动指定 `eventChannel(subscriber, buffer)`

#### 使用 channels 在 Sagas 之间沟通

```js
export function* channelWatchRequests() {
  // 创建一个 channel 队列
  const chan = yield call(channel);

  // 创建 3 个 worker threads
  for (let i = 0; i < 3; i++) {
    yield fork(handleRequest, chan);
  }

  while (true) {
    const { payload } = yield take('CHANNEL_REQUEST');
    yield put(chan, payload);
  }
}

function* handleRequest(chan) {
  const name = 'NAME_' + ++_name;
  while (true) {
    const payload = yield take(chan); // 从 channel 中获取
    yield delay(payload.time);
    yield put({
      type: 'SUCC_' + name,
      payload,
    });
  }
}
```

上面的例子, 将创建三个 handleRequest 任务, 每次接收到 CHANNEL_REQUEST 消息, 三个 worker 中的一个会被分配去处理请求. 注意在这个机制中, 这 3 个 worker 会有一个自动的负载均衡, 所以快的 worker 不会被慢的 worker 拖慢.

## 05: 技巧

### 05:01: 节流 (Throttling)

```js
function* logInputSaga() {
    while(true) {
        const action = yield take('INPUT');
        yield call(logInput, action);
    }
}
```

上面的 saga 会响应每次 INPUT 事件, 如果想要不这么频繁响应, 可以使用 `throttle`节流.

```js
function* logInputSaga() {
    yield throttle(500, 'INPUT', logInput);
}
```

使用 `throttle`后, 每 500ms 之内, 只有最新的 INPUT 会被 logInput 处理.(第一次响应时可以理解为已经等待500ms了, 所以接收到的第一个 INPUT 就会响应, 后面的则是收集 500ms 内所有的 INPUT action, 最后仅响应最新的那个)

> 注意, 节流不需要 `while(true)`

