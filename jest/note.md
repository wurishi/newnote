[link](https://jestjs.io/docs/zh-Hans/getting-started)

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