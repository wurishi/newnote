[link](https://jestjs.io/docs/zh-Hans/getting-started)

```
logHeapUsage
coverage
```

# 1. 介绍

## 1.1 开始

### 安装

```bash
npm i -D jest
```

sum.js

```js
function sum(a, b) {
    return a + b;
}
module.exports = sum;
```

sum.test.js

```js
const sum = require('./sum');
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});
```

在 package.json 中添加

```json
{
    "scripts": {
        "test": "jest"
    }
}
```

最后运行测试命令

```bash
npm test
```

### 在命令行运行

如果通过 `npm i jest -G`全局安装了 jest, 则可以通过命令行直接运行 jest.

下面演示了如何对能匹配到 my-test 的文件运行 jest, 并使用 config.json 作为配置文件, 并在运行完成后显示一个原生的操作系统通知.

```bash
jest my-test --notify --config=config.json
```

### 更多配置

#### 生成一个基础配置文件

```bash
jest --init
```

#### 使用 Babel

```bash
npm i -D babel-jest @babel/core @babel/preset-env
```

#### 使用 webpack

Jest 可以使用 webpack 来管理资源, 样式和编译项目. 具体参考 *Using with webpack*.

#### 使用 TypeScript

```bash
npm i -D @babel/preset-typescript
```

babel.config.js

```js
module.exports = {
  presets: [
    ['@babel/preset-env', { targets: { node: 'current' } }], //
    ['@babel/preset-typescript'],
  ],
};
```

使用 babel 支持 TypeScript 还是有一些问题, 因为 Jest 会先使用 Babel 将代码转换, 这将导致无法使用类型检查. 如果要使用类型检查, 请使用 ts-jest

```bash
npm i -D typescript ts-jest @types/jest
```

## 1.2 使用匹配器 (Matchers)

Jest 使用"匹配器"让你可以使用各种方式测试你的代码.

### 普通匹配器

最简单的测试值的方法是看是否精确匹配:

```js
test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});
```

#### toBe

使用 `Object.is`来测试精确相等. 如果想要检查对象的值, 请使用 `toEqual`.

#### toEqual

递归检查对象或数组的每个字段.

### 真实性 (Truthiness)

测试时, 有时候需要明确区分 `undefined`, `null`和 `false`, 有时候又不需要.

#### toBeNull

只匹配 `null`

#### toBeUndefined

只匹配 `undefined`

#### toBeDefined

与 `toBeUndefined`相反

#### toBeTruthy

匹配任何 `if`语句为真

#### toBeFalsy

匹配任何 `if`语句为假

### 数字

大多数的比较数字有等价的匹配器

#### toBeGreaterThan

大于

#### toBeGreaterThanOrEqual

大于等于

#### toBeLessThan

小于

#### toBeLessThanOrEqual

小于等于

#### toBe / toEqual

相等

#### toBeCloseTo

对于浮点数相等, 因为精度问题, 一般是使用 `toBeCloseTo`而非 `toEqual`

### 字符串

#### toMatch

使用正则表达式检查字符串

```js
expect('team').not.toMatch(/I/);
expect('Christoph').toMatch(/stop/);
```

### 数组和迭代

#### toContain

使用 `toContain`来检查一个数组或可迭代对象中是否包含某个特定项.

### 错误

toThrow

判断是否抛出错误.

## 1.3 测试异步代码

在 JavaScript 中执行异步代码是很常见的. 当要测试异步代码时, Jest 需要知道当前它测试的代码是否已经完成, 然后 Jest 才会转移到另一个测试. Jest 有若干方法来处理这种情况.

### 回调

最常见的异步模式是回调函数, 使用参数 `done`, Jest 会等到 `done`执行时才结束测试.

```js
test('the data is peanut butter', done => {
    function callback(data) {
        try {
            expect(data).toBe('peanut butter');
            done();
        } catch (error) {
            done(error);
        }
    }
    fetchData(callback);
});
```

若 `done()`未被调用, 测试用例会显示超时错误.

若 `expect`执行失败, 它会抛出一个错误, 后面的 `done(error)`将会被执行. 如果执行成功能, 则 `done()`执行表示测试用例执行完成.

### Promise

返回一个 Promise, 如果 resolve 被调用, 表示测试用例执行完成. 如果 reject 被调用, 则表示测试失败.

```js
test('the data is peanut butter', () => {
    return fetchData().then(data => {
        expect(data).toBe('peanut butter');
    });
});
```

另外可以使用 `expect.assertions`来验证该测试用例至少有一定数量的断言被执行了. 

```js
test('the data is peanut butter', () => {
    expect.assertions(1); // 断言至少要调用一次
    return fetchData()
        .then(data => {
        	expect(data).toBe('peanut butter');
    	})
    	.catch(e => expect(e).toMatch('error')); // 因为断言必须调用一次, 所以 catch 中也需要执行一次断言
});
```

### .resolves / .rejects

也可以在 expect 语句中使用 `.resolves`匹配器, Jest 会等待此 Promise.

```js
test('the data is peanut butter', () => {
    return expect(fetchData()).resolves.toBe('peanut butter');
});
```

### async / await

可以直接在测试用例中使用 `async`和 `await`

```js
test('the data is peanut butter', async () => {
    expect.assertions(1);
    try {
        const data = await fetchData();
        expect(data).toBe('peanut butter');
    } catch (e) {
        expect(e).toMatch('error');
    }
});
```

也可以组合使用 `async / await`和 `.resolves / .rejects`

## 1.4 Setup and Teardown

写测试时经常需要在运行测试之前做一些准备工作, 并在运行测试后进行一些整理工作. Jest 提供了辅助函数来处理这个问题.

### 为多次测试重复设置

如果有一些要为多个测试重复设置的工作, 可以使用 `beforeEach` 和 `afterEach`.

```js
beforeEach(() => {
    initializeCityDatabase();
});
afterEach(() => {
    clearCityDatabase();
});
test('city database has Vienna', () => {
    expect(isCity('Vienna')).toBeTruthy();
});
```

`beforeEach`和 `afterEach`能够通过与异步代码测试相同的方式处理异步代码, 可以使用 `done`参数或者返回一个 promise.

### 一次性设置

如果需要在测试开始前只做一次设置. 可以使用 `beforeAll`和 `afterAll`处理这种情况.

### 作用域

默认情况下, before 和 after 的块可以应用到文件中的每个测试. 此外可以通过 `describe`块来将测试分组, 在 `describe`块内部的 before 和 after, 将只适用于 `describe`块内的测试.

```js
describe('matching cities to foods', () => {
    beforeEach(() => {
        return initializeFoodDatabase();
    });
    test('Vienna <3 sausage', () => {
        expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
    });
});
```

### describe 和 test 块的执行顺序

Jest 会在所有真正的测试开始之前先执行测试文件中所有的 describe 的处理程序(即 describe 中的代码). 所以任何准备和整理工作都应该放在 before 和 after 里面, 而不是直接扔在 describe 里面. 在准备工作执行后, Jest 会执照 test 出现的顺序依次执行所有的测试.

```js
describe('outer', () => {
  console.log('describe outer-a');

  describe('describe inner 1', () => {
    console.log('describe inner 1');
    test('test 1', () => {
      console.log('test for describe inner 1');
      expect(true).toEqual(true);
    });
  });

  console.log('describe outer-b');

  test('test 1', () => {
    console.log('test for describe outer');
    expect(true).toEqual(true);
  });

  describe('describe inner 2', () => {
    console.log('describe inner 2');
    test('test for describe inner 2', () => {
      console.log('test for describe inner 2');
      expect(false).toBeFalsy();
    });
  });
  console.log('describe outer-c');
});

// describe outer-a
// describe inner 1
// describe outer-b
// describe inner 2
// describe outer-c
// test for describe inner 1
// test for describe outer
// test for describe inner 2
```

### 通用建议

如果测试失败, 第一件要检查的事就是, 当仅运行这条测试时, 它是否仍然失败.

如果有一个测试, 它作为一个更大的用例中的一部分时, 经常运行失败. 但是如果单独运行它时, 并不会失败. 则需要考虑其他测试对这个测试的影响. 通过可以通过修改 `beforeEach`来清除一些共享的状态来修改这种问题.

## 1.5 Mock Functions

Mock 函数允许测试代码之间的连接, 包括: 擦除函数的实际实现, 捕获对函数的调用(以及在这些调用中传递的参数), 在使用 `new`实例化时捕获构造函数的实例, 允许测试时配置返回值等.

有两种方法可以模拟函数: 要么在测试代码中创建一个 mock 函数, 要么编写一个手动 mock 来覆盖模块依赖.

### 使用 mock 函数

假设我们要测试函数 `forEach`的内部实现, 这个函数为传入的数组中的每个元素调用一次回调函数.

```js
function forEach(items, callback) {
    for(let index = 0; index < items.length; index++) {
        callback(items[index]);
    }
}
```

为了测试此函数, 我们可以使用一个 mock 函数, 然后检查 mock 函数的状态来确保回调函数如期望地调用.

```js
const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);

expect(mockCallback.mock.calls.length).toBe(2); // mock 函数被调用了两次

expect(mockCallback.mock.calls[0][0]).toBe(0); // 第一次调用函数时的第一个参数是 0

expect(mockCallback.mock.calls[1][0]).toBe(1); // 第二次调用函数时的第一个参数是 1

expect(mockCallback.mock.results[0].value).toBe(42); // 第一次函数调用的返回值是 42
```

#### .mock 属性

所有的 mock 函数都有这个特殊的 `.mock`属性, 它保存了关于此函数如何被调用, 调用时的返回值信息. `.mock`属性还追踪了每次调用时 `this`的值.

```js
const myMock = jest.fn();

const a = new MyMock();
const b = {};
const bound = myMock.bind(b);
bound();

console.log(myMock.mock.instances);
// [ <a>, <b> ]
```

#### Mock 的返回值

Mock 函数也可以用于在测试期间将测试值注入代码:

```js
const myMock = jest.fn();
console.log(myMock());
// undefined

myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);

console.log(myMock(), myMock(), myMock(), myMock());
// 10, 'x', true, true
```

### 模拟模块

假定有一个 API 是使用 axios 从后端请求数据的, 在测试时, 一般不实际去调用后端(否则会导致测试缓慢与脆弱), 此时可以用 `jest.mock(...)`函数自动模拟 axios 模块.

```js
import axios from 'axios';
import Users from './users';

jest.mock('axios');

test('should fetch users', () => {
    const users = [{name: 'Bob'}];
    const resp = {data: users};
    axios.get.mockResolvedValue(resp); // 为 .get 提供一个 mockResolvedValue
    
    return Users.all().then(data => expect(data).toEqual(users));
});
```

### Mock 实现

除了让 mock 函数模拟返回值外, 有时候还可以模拟具体的函数实现. 使用 `mockImplementation`模拟 mock 实现.

```js
// foo.js
module.exports = function() {
    
};

// test.js
jest.mock('../foo');
const foo = require('../foo');

foo.mockImplementation(() => 42);
foo();
// 42
```

另外可以使用 `mockImplementationOnce`多次模拟函数.

```js
const myMockFn = jest
.fn()
.mockImplementationOnce(cb => cb(null, true))
.mockImplementationOnce(cb => cb(null, false));

myMockFn((err, val) => console.log(val));
// true

myMockFn((err, val) => console.log(val));
// false
```

```js
const myMockFn = jest
.fn(() => 'default')
.mockImplementationOnce(() => 'first call')
.mockImplementationOnce(() => 'second call');

console.log(myMockFn(), myMockFn(), myMockFn(), myMockFn());
// 'first call', 'second call', 'default', 'default'
```

另外有一个 `.mockReturnThis()`用来返回 `this`

```js
const myObj = {
    myMethod: jest.fn().mockReturnThis(),
};

// 等价于
const otherObj = {
    myMethod: jest.fn(function() {
        return this;
    });
}
```

### Mock 名称

可以设置 mock 函数的名称, 这个名字会在测试出错时打印, 方便查找问题.

```js
const myMockFn = jest
.fn()
.mockReturnValue('default')
.mockImplementation(scalar => 42 + scalar)
.mockName('add42');
```

### Mock 匹配器

```js
expect(mockFunc).toHaveBeenCalled(); // mock 函数至少被调用过一次

expect(mockFunc).toHaveBeenCalledWith(arg1, arg2); // mock 至少被指定的参数 arg1, arg2 调用过一次

expect(mockFunc).toHaveBeenLastCalledWith(arg1, arg2); // mock 最后一次是被参数 arg1, arg2 调用的.

expect(mockFunc).toMatchSnapshot(); // mock 的所有调用都会被写入快照
```

## 1.6 Jest Platform

### jest-changed-files

识别 git/hg 仓库中被修改过的文件.

```js
const {getChangedFilesForRoots} = require('jest-changed-files');

// 打印出当前目录最后修改过的一组文件
getChangedFilesForRoots(['./'], {lastCommit: true})
.then(result => console.log(result.changedFiles));
```

### jest-diff

比较差异

```js
const diff = require('jest-diff').default;

const a = {a: {b: {c: 5}}};
const b = {a: {b: {c: 6}}};

const result = diff(a, b);

console.log(result);
```

### jest-docblock

用于提取和解析 JavaScript 文件顶部的注释.

```js
const {parseWithComments} = require('jest-docblock');

const parsed = parseWithCommens(code);

console.log(parsed);
```

### jest-get-type

标识所有 JavaScript 的类型.

```js
const getType = require('jest-get-type');

const array = [1, 2, 3];
const nullValue = null;
const undefinedValue = undefined;

console.log(getType(array)); // array
console.log(getType(nullValue)); // null
console.log(getType(undefinedValue)); // undefined
```

### jest-validate

用于验证用户提交的配置.

### jest-worker

用于任务并行化的模块.

```js
const JestWorker = require('jest-worker').default;

async function main() {
  const worker = new JestWorker(require.resolve('./1.6.work.js'));
  const result = await Promise.all([
    worker.hello('Bob'), //
    worker.getWorkerId(),
  ]);
  console.log(result);
}

main();
```

### jest-format

格式化代码

# 2. 指南

## 2.1 快照测试

快照测试对于确保 UI 不会有意外的改变会非常有用.

### 用 Jest 进行快照测试

```js
it('snap correctly', () => {
  const tree = `<div>
  <h1>标题</h1>
  </div>`;
  expect(tree).toMatchSnapshot();
});

test('snap test', () => {
  const tree = `<div>
  <h2>Hell world</h2>
  </div>`;
  expect(tree).toMatchSnapshot();
});
```

第一次运行此测试时, Jest 会创建一个快照文件.

在随后的测试运行时, Jest 会将渲染的输出与先前的快照进行比较. 如果它们匹配, 测试将通过. 如果不匹配, 则会提示错误. (或者, 如果实现已经修改, 则快照也需要更新).

#### 更新快照

如果实现已经修改, 则需要执行命令更新快照.

```bash
npx jest --updateSnapshot
```

如果要限制重新生成哪些快照测试用例, 则可以传递一个附加的 `--testNamePattern`标志来针对那些与模式匹配的测试用例重新记录快照. 比如:

```bash
npx jest --updateSnapshot --testNamePattern test.ts
```

#### 互动快照模式

```bash
npx jest --watch
```

可能通过快捷键 `u`在 `--watch`模式下更新快照.

#### 内联快照

内联快照的行为与外部快照(.snap文件)相同, 但快照值会自动写回源代码.

```
该功能由 Prettier(https://prettier.io/) 提供支持. 如果 Prettier 安装在 Jest 找不到的位置, 使用配置 prettierPath 告知 Jest 如何找到 Prettier.
```

```js
test('snap test2', () => {
  const tree = '<hr />';
  expect(tree).toMatchInlineSnapshot();
});
```

首先运行后, 快照会直接写回源代码:

```diff
test('snap test2', () => {
  const tree = '<hr />';
- expect(tree).toMatchInlineSnapshot();
+ expect(tree).toMatchInlineSnapshot(`<hr />`);
});
```

#### 属性匹配

快照对象中某些字段(例如 ID, Date)等是会不断变化的, 所以直接使用快照将会导致每次运行测试都失败.

对于这种情况, Jest 允许为属性提供匹配器, 在写入或测试快照之前, 会将匹配器的内容保存到快照文件中, 而不是实际的值.

### 最佳实践

#### 1. 将快照视为代码.

#### 2. 测试应该是确定性.

#### 3. 快照名称应该始终是描述预期快照内容的.

## 2.2 Timer Mocks

原生的定时器函数(如: setTimeout, setInterval, clearTimeout, clearInterval) 因为程序需要等待对应的延迟, 所以并不是很方便测试.

```js
// timerGame.js
export function timerGame(callback) {
  console.log('Ready....go!');

  setTimeout(() => {
    console.log("Time's up -- stop!");
    callback && callback();
  }, 1000);
}

// timerGame.test.js
beforeEach(() => {
  jest.useFakeTimers(); // 模拟定时器函数
});

test('waits 1 second before ending the game', () => {
  timerGame();

  expect(setTimeout).toHaveBeenCalledTimes(1);
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});
```

### Run All Timers

```js
test('calls the callback after 1 second', () => {
    const timerGame = require('../timerGame');
    const callback = jest.fn();
    
    timerGame(callback);
    
    expect(callback).not.toBeCalled(); // 此时, 回调未执行
    
    jest.runAllTimers(); // 快进时间使得所有定时器回调被执行
    
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
    // 此时回调函数已经被调用了
});
```

### Run Pending Timers

在某些场景下, 可能还会有在定时器的回调函数中再设置一个新的定时器的情况. 对于这种情况, 如果让定时器一直运行下去可能会造成死循环. 所以此时不能再使用 `jest.runAllTimers()`, 而是使用 `jest.runOnlyPendingTimers()`

```js
// infiniteTimerGame.js
export function infiniteTimerGame(callback) {
  console.log('Ready...go!');

  setTimeout(() => {
    console.log("Time's up! 10 seconds before the next game starts...");
    callback && callback();

    setTimeout(() => {
      infiniteTimerGame(callback);
    }, 10000);
  }, 1000);
}
// test.js
describe('infiniteTimerGame', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  test('schedule a 10-second timer after 1 second', () => {
    const callback = jest.fn();

    infiniteTimerGame(callback);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);

    expect(callback).not.toBeCalled();

    jest.runOnlyPendingTimers();

    expect(callback).toBeCalled();

    expect(setTimeout).toHaveBeenCalledTimes(2);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 10000);
  });
});
```

### Advance Timers by Time

另一种可选方式是使用 `jest.advancertimersbytime(msToRun)`, 该 API 执行后, 将模拟所有 timers 执行了 `msToRun`毫秒. 所有通过 `setTimeout`或 `setInterval`而处于任务队列中等待中的宏任务和其他一切应该在本时间片中被执行的任务都会执行完毕. 包括了在宏任务中新添加的宏任务, 直到任务队列中不再有应该在 `msToRun`时间内运行的宏任务为止.

```js
test('ad test', () => {
    const callback = jest.fn();
    timerGame(callback);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(1000); // 快进 1000 毫秒

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
```

另外可以在测试用例执行完毕之后使用 `jest.clearAllTimers()`进行清理工作.

## 2.3 手动 Mock

### 模拟用户模块

手动模拟用户模块是通过将模块写在对应需要模拟的模块相邻的 `__mocks__`目录下实现的. 比如想要模拟的模块 `user`是放在 `models`目录下的, 则 mock 模块应该是 `models/__mocks__/user.js`.

> 注意: `__mocks__`文件夹区分大小写

### 模拟 Node.js 模块

如果要模拟的是类似 `lodash`这样的 Node 模块, 则应该将 mock 代码放在与 `node_modules`目录相邻的目录 `__mocks__`中.

另外如果要模拟的模块有作用域, 那么 `__mocks__`中的目录结构应该是与作用域对应的, 即如果要模拟的作用域模块为 `@scope/project-name`, 那么模拟的模块路径就应该是这样的: `__mocks__/@scope/project-name.js`.

## 2.4 模拟 ES6 类

例如有如下二个类:

```js
// sound-player.js
export default class SoundPlayer {
    constructor() {
        this.foo = 'bar';
    }
    playSoundFile(fileName) {
        console.log('Playing sound file ' + fileName);
    }
}
// sound-player-consumer.js
export default class SoundPlayerConsumer {
    constructor() {
        this.soundPlayer = new SoundPlayer();
    }
    playSomethingCool() {
        const coolSoundFileName = 'song.mp3';
        this.soundPlayer.playSoundFile(coolSoundFileName);
    }
}
```

有四种方式来创建 ES6 模拟类

### 自动 Mock

直接使用 `jest.mock`

```js
import SoundPlayer from './sound-player';
import SoundPlayerConsumer from './sound-player-consumer';

jest.mock('./sound-player');

test('check class constructor', () => {
  new SoundPlayerConsumer(); // mock 的 soundplayer 被调用了一次

  expect(SoundPlayer).toHaveBeenCalledTimes(1);
});
```

### 手动 Mock

在 `__mocks__`目录中添加手动 mock 的代码.

### 调用 `jest.mock()`时提供模块工厂方法

```js
import SoundPlayer from './sound-player';
const mockPlaySoundFile = jest.fn();
jest.mock('./sound-player', () => {
    return jest.fn().mockImplementation(() => {
        return {playSoundFile: mockPlaySoundFile};
    });
});
```

使用工厂方法有一个局限, 因为 `jest.mock()`的调用会被提升到文件的顶部, 所以除了以 `'mock'`开头的变量也会被自动提升到顶部之外, 其他变量并不会提升到顶部, 这就有可能导致 mock 中的工厂方法访问未初始化的变量, 比如:

```js
import SoundPlayer from './sound-player';
const fakePlaySoundFile = jest.fn();
jest.mock('./sound-player', () => {
    return jest.fn().mockImplementation(() => {
        return {playSoundFile: fakePlaySoundFile}; // 出错, 因为 mock 被提升到文件顶部了, 但 fakePlaySoundFile 此时可能尚未定义.
    });
});
```

另外要注意, 工厂方法必须返回的是一个构造函数, 也就是说不能返回箭头函数(因为不能 new 箭头函数). 除非代码是通过 `@babel/preset-env`已经全部编译成 ES5 的代码了.

### 使用 `mockImplementation()`或 `mockImplementationOnce()`

```js
import SoundPlayer from './sound-player';
jest.mock('./sound-player');
beforeAll(() => {
    SoundPlayer.mockImplementation(() => {
        return {
            playSoundFile: () => {
                // mock method
                return 'A'
            }
        }
    });
});
test('test', () => {
    const soundPlayerConsumer = new SoundPlayerConsumer();
    expect(() => soundPlayerConsumer.playSomethingCool()).toBe('A');
});
```

如果有多个测试用例, 可以在 `beforeEach()`中调用 `mockClear()`用来清理模拟方法的记录信息.

## 2.5 跳过模块模拟

在 Jest 中可以模拟整个模块, 但有时候在某些测试用例中还是会遇到想使用原始版本而非模拟版本的情况.

此时, 你可以使用 `jest.requireAcual`

```diff
  jest.mock('node-fetch');
- import fetch, {Response} from 'node-fetch';
+ import fetch from 'node-fetch';
+ const {Response} = jest.requireActual('node-fetch'); 
```

## 2.6 ECMAScript 模块

在 ESM 中使用 Jest 需要这样:

```js
import {jest, test} from '@jest/globals';
```

## 2.7 与 webpack 一起使用 (Using with webpack)

### Webpack 示例

webpack.config.js

```js
module.exports = {
    module: {
        loaders: [
            {loader: 'babel', test: /\.jsx?$/, exclude: ['node_modules']},
            {loader: 'style-loader!css-loader', test: /\.css$/},
            {loader: 'url-loader', test: /\.gif$/},
            {loader: 'file-loader', test: /\.(ttf|eot|svg)$/}
        ]
    },
    resolve: {
        alias: {
            config$: './configs/app-config.js',
            react: './vendor/react-master',
        },
        extensions: ['', 'js', 'jsx'],
        modules: [
            'node_modules',
            'bower_components',
            'shared',
            '/shared/vendor/modules'
        ]
    }
};
```

### 处理静态文件

接下来配置 Jest 使其优雅地处理资源文件, 如样式表和图像. 通常这些文件在测试中无足轻重, 因此我们可以安全地 mock 他们. 当然, 如果使用了 CSS 模块, 那么最好给类名查找模拟一个代理.

package.json

```json
{
    "jest": {
        "moduleNameMapper": {
            "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "<rootDir>/__mocks__/styleMock.js"
        }
    }
}
```

mock 文件:

```js
// __mocks__/styleMock.js
module.exports = {};

// __mocks__/fileMock.js
module.exports = 'test-file-stub';
```

### 模拟 CSS 模块

可以使用 ES6 Proxy 来模拟一个 CSS

```bash
npm i -D identity-obj-proxy
```

package.json

```json
{
    "jest": {
        "moduleNameMapper": {
            "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
      "\\.(css|less)$": "identity-obj-proxy"
        }
    }
}
```

### 配置 Jest 来查找文件

通过 `moduleDirectories`和 `moduleFileExtensions`选项来告诉 Jest 如何查找文件.

package.json

```json
{
    "jest": {
        "moduleFileExtensions": ["js", "jsx"],
        "moduleDirectories": ["node_modules", "bower_components", "shared"]
    }
}
```

## 2.8 Using with puppeteer

## 2.9 Using with MongoDB

## 2.10 Using with DynamoDB

## 2.11 监听插件

Jest 提供了监听插件, 使得 Jest 运行时可以根据行为运行一些自定义的行为.

```js
class MyWatchPlugin {
    apply(jestHooks) {}
    getUsageInfo(globalConfig) {}
    run(globalConfig, updateConfigAndRun) {}
}
```

jest.config.js

```js
module.exports = {
    watchPlugins: ['path/to/yourWatchPlugin']
}
```

# 3. 框架指南

