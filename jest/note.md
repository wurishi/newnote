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

