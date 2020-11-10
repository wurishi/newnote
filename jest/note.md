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