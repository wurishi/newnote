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