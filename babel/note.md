[link](https://www.babeljs.cn/docs/)

# 1. 指南

## 1.1 Babel 是什么?

### Babel 是一个 JavaScript 编译器

Babel 是一个工具链, 主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法, 以便能够运行在当前和旧版本的浏览器或其他环境中. 下面列出的是 Babel 能够做的事情:

- 语法转换
- 通过 Polyfill 方式在目标环境中添加缺失的特性(通过 `@babel/polyfill` 模块)
- 源码转换 (codemods)
- 更多!

```js
// Babel 输入: ES2015 箭头函数
[1, 2, 3].map((n) => n + 1);

// Babel 输出: ES5 语法实现的同等功能
[1, 2, 3].map(function(n) {
    return n + 1;
});
```

### ES2015 及更新版本

Babel 通过语法转换器来支持新版本的 JavaScript 语法.

### JSX 与 React

Babel 能够转换 JSX 语法! 具体参考 `@babel/preset-react`.  通过和 babel-sublime 一起使用还可以把语法高亮的功能提升到一个新的水平.

```bash
npm i -D @babel/preset-react
```

并将 `@babel/preset-react`添加到 Babel 配置文件中.

### 类型注释 (Flow 和 TypeScript)

Babel 可以删除类型注释! 要注意的是 Babel 不做类型检查, 你仍然需要安装 Flow 或 TypeScript 来执行类型检查的工作.

安装 flow preset

```bash
npm i -D @babel/preset-flow
```

安装 typescript preset

```bash
npm i -D @babel/preset-typescript
```

### 插件化

Babel 构建在插件之上. 使用现有的或者自己编写的插件可以组成一个转换管道. 通过使用或创建一个 preset 即可轻松使用一组插件.

使用 astexplorer.net 可以立即创建一个插件, 或者使用 generator-bable-plugin 生成一个插件模板.

### 可调试

由于 Babel 支持 Source map, 因此你可以轻松调试编译后的代码.

### 符合规范

Babel 尽最大可能遵循 ECMAScript 标准. 不过, Babel 还提供了特定的选项来对标准和性能做权衡.

### 代码紧凑

Babel 尽可能用最少的代码并且不依赖太大量的运行环境.

有些情况是很难达成这一愿望的, 因此 Babel 提供了 "loose" 参数, 用以在特定的转换情况下在符合规范, 文件大小和速度之间做折中.

## 1.2 使用指南

Babel 工具链中有很多工具可以让你使用 Babel 时更方便.

### 总览

演示如果将 ES2015+ 的语法编译成当前浏览器可用的 JavaScript 代码. 主要涉及语法转换和 polyfilling(填充)缺少的功能.

1. 安装

   ```bash
   npm i -D @babel/core @babel/cli @babel/preset-env
   npm i @babel/polyfill
   ```

2. 创建 babel.config.json 配置

   ```json
   {
     "presets": [
       [
         "@babel/env",
         {
           "targets": {
             "edge": "17",
             "firefox": "60",
             "chrome": "67",
             "safari": "11.1"
           },
           "useBuiltIns": "usage"
         }
       ]
     ]
   }
   ```

   可以按自己的需求修改支持浏览器的版本.

3. 使用命令编译 src 目录下的代码到 lib 目录

   ```bash
   npx babel src --out-dir lib
   ```

### CLI 的基本用法

#### 核心 library

Babel 的核心功能位于 `@babel/core` 模块中.

```bash
npm i -D @babel/core
```

然后就可以直接在 JavaScript 中 `require` 它.

```js
const babel = require('@babel/core');
babel.transform('code', optionsObject);
```

当然了, 一般情况下我们不会直接使用 babel 的 API, 更多的是安装其他的工具(如 `webpack`), 一起协同使用.

#### CLI 工具

`@babel/cli` 允许你从终端使用 babel. 安装与用法示例:

```bash
npm i -D @babel/core @babel/cli
npx src --out-dir lib
# 或者
./node_modules/.bin/babel src --out-dir lib
```

### 插件 (plugins) 和预设 (presets)

代码转换是以插件的形式出现的, 这些插件其实就是一段 JavaScript 程序, 它们用来指示 Babel 如何进行代码转换. 如果有需要, 你也可以自己编写插件按你的需求转换代码.

以下演示一个官方插件 `@babel/plugin-transform-arrow-functions`, 用来将所有箭头函数转换成 ES5 兼容的函数表达式.

```bash
npm i -D @babel/plugin-transform-arrow-functions
npx babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions
```

我们往往需要非常多的插件才能完成所有 ES2015+ 的代码转换. 这时候我们可以使用一个 preset(预设), 它包含了一组预先设定好的插件. 

和插件一样, 我们也可以自己创建预设来设置所有我们需要的插件. 一般而言, 会使用一个官方的预设, 名为 env:

```bash
npm i -D @babel/preset-env
npx babel src --out-dir lib --presets=@babel/env
```

以上都是在终端使用 CLI 传递预设选项的, 更合理的情况是将选项放到配置中.

### 配置

根据需要, 有好几种使用配置文件的方法. 具体请参考 *1.3 配置 Babel*.

babel.config.json

```json
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage"
      }
    ]
  ]
}
```

此时, env 预设将仅加载目标浏览中不提供的功能转换插件.

### Polyfill

> 从 Babel 7.4.0 开始不建议使用 `core-js/stable`(用来 polyfill ECMAScript 功能) 和 `regenerator-runtime/runtime`(用来转换 Generator 函数)

`@babel/polyfill`模块包含了 `core-js`和自定义的 `regenerator runtime`用来模拟完整的 ES2015+ 环境.

意味着你可以使用 `Promise`或 `WeakMap`, 静态方法比如 `Array.from`或 `Object.assign`, 实例方法如 `Array.prototype.includes`以及生成器函数. 另外 polyfill 还会增加全局作用域的类型如 `String`.

这些功能有时候对于使用者来说可能会太多了. 比如你其实并不一定需要 `Array.prototype.includes`, 这时候你可以使用 `transform runtime`插件来代替 `@babel/polyfill`

首先你需要先从 `core-js`中获取你需要 polyfill 的功能.

然后安装 `@babel/polyfill`

```bash
npm i @babel/polyfill --save
```

要注意的是这样使用的是 `--save`而非 `--save-dev`. 因为 polyfill 需要在你的源代码之前先运行.

幸运的是, 我们可以直接在 `env`预设的配置中使用 `"useBuiltIns"`选项, 并设置为 `"usage"`. 它会自动应用一个优化, Babel 会检查所有的代码, 以了解目标环境中缺少的功能, 并且仅 `require`需要的 polyfill.

例如:

```js
Promise.resolve().finally();
```

因为在 Edge 17 中没有, 所以会转换成这样:

```js
require("core-js/modules/es7.promise.finally");
// ...
Promise.resolve().finally();
```

## 1.3 配置 Babel

### 根据你的项目需求可以使用不同的配置.

- 使用了 monorepo

- 想要编译 `node_modules`

  > 使用 `babel.config.json`

- 仅项目中的某个单一部分

  > 使用 `.babelrc.json`

`babel.config.json`

可以使用 json 配置, 或者使用 JavaScript 代码形式(最好将文件名改为 `babel.config.js`, json 文件和 js 文件 babel 都会去识别, 但同一目录下仅能存在两者之一 )

`babel.config.js`

```js
module.exports = function (api) {
  api.cache(true);

  const presets = [];
  const plugins = ['@babel/plugin-transform-arrow-functions'];

  return {
    presets,
    plugins,
  };
};
```

`.babelrc.json`

可以针对项目中的某一部分配置 babel.

`package.json`

另外, 还可以直接将 babel 的配置写在 `package.json`中, 使用 `babel`作为键即可:

package.json:

```json
{
    "name": "my-package",
    "version": "1.0.0",
    "babel": {
        "presets": [],
        "plugins": []
    }
}
```

### JavaScript 配置文件

在 `babel.config.json`和 `.babelrc.json`文件中可以使用 JavaScript.

如果使用了 JavaScript , 那么还支持使用 Node.js 的 API, 比如:

```js
const presets = [];
const plugins = [];

if(process.env['ENV'] === 'prod') {
    plugins.push('@babel/plugin-transform-arrow-functions');
}

module.exports = {
    presets,
    plugins,
};
```

