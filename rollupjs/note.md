[link](https://rollupjs.org/guide/zh)

# 1. 介绍

## 1.1 概述 (Overview)

Rollup 是一个 JavaScript 模块打包器，可以将小块代码编译成大块复杂的代码，例如 library 或应用程序。

Rollup 对代码模块使用新的标准化格式，这些标准都包含在 JavaScript 的 ES6 版本中，而不是以前的特殊解决方案，如 CommonJS 和 AMD。ES6 模块可以使你自由，无缝地使用你最喜爱的 library 中那些最有用独立函数，而你的项目不必携带其他未使用的代码。ES6 模块最终还是要由浏览器原生实现，但当前 Rollup 可以使你提前体验。

## 1.2 快速入门指南 (Quick start)

使用 `npm install --global rollup` 进行安装。 Rollup 可以通过命令行接口(command line interface)配合可选配置文件(optional configuration file)来调用，或者可以通过 JavaScript API 来调用。运行 `rollup --help` 可以查看可用的选项和参数。

> 查看 [rollup-starter-lib](https://github.com/rollup/rollup-starter-lib) 和 [rollup-starter-app](https://github.com/rollup/rollup-starter-app) 中那些使用 Rollup 的示例类库与应用项目。

这些命令假设应用程序入口起点的名称为 main.js，并且你想要所有 import 的依赖(all import) 都编译到一个名为 bundle.js 的单个文件中。

对于浏览器：

```sh
# compile to a <script> containing a self-executing function ('iife')
rollup main.js --file bundle.js --format iife
```

对于 Node.js:

```sh
# compile to a CommonJS module ('cjs')
rollup main.js --file bundle.js --format cjs
```

对于浏览器和 Node.js:

```sh
# UMD format requires a bundle name
rollup main.js --file bundle.js --format umd --name "myBundle"
```

## 1.3 为什么 (why)

如果你将项目拆分成小的单独文件中，这样开发软件通常会很简单，因为这通常会消除无法预知的相互影响(remove unexpected interaction)，以及显著降低了所要解决的问题的复杂度(complexity of the problem)，并且可以在项目最初时，就简洁地编写小的项目。不幸的是，JavaScript 以往并没有将此功能作为语言的核心功能。

## 1.4 Tree-shaking

除了使用 ES6 模块之外，Rollup 还静态分析代码中的 import，并将排除任何未实际使用的代码。这允许您架构于现有工具和模块之上，而不会增加额外的依赖或使项目的大小膨胀。

例如，在使用 CommonJS 时，必须导入(import)完整的工具(tool)或库(library)对象。

```js
// 使用 CommonJS 导入(import)完整的 utils 对象
var utils = require('utils');
var query = 'Rollup';
// 使用 utils 对象的 ajax 方法
utils.ajax('https://api.example.com?search=' + query).then(handleResponse);
```

但是在使用 ES6 模块时，无需导入整个 `utils` 对象，我们可以只导入(import)我们所需的 `ajax` 函数：

```js
// 使用 ES6 import 语句导入(import) ajax 函数
import { ajax } from 'utils';
var query = 'Rollup';
// 调用 ajax 函数
ajax('https://api.example.com?search=' + query).then(handleResponse);
```

因为 Rollup 只引入最基本最精简代码，所以可以生成轻量，快速，以及低复杂度的 library 和应用程序。因为这种基于显式的 `import` 和 `export` 语句的方式，它远比 “在编译后的输出代码中，简单地运行自动 minifier 检测未使用的变量” 更有效。

## 1.5 兼容性 (Compatibility)

### a. 导入 CommonJS (Importing CommonJS)

Rollup 可以通过插件导入已存在的 CommonJS 模块。

### b. 发布 ES6 模块 (Publishing ES6 Modules)

为了确保你的 ES6 模块可以直接与 “运行在 CommonJS (例如 Node.js 和 webpack) 中的工具(tool)” 使用，你可以使用 Rollup 编译为 UMD 或 CommonJS 格式，然后在 `package.json` 文件的 `main` 属性中指向当前编译的版本。如果你的 `package.json` 也具有 `module` 字段，像 Rollup 和 Webpack 2 这样的 ES6 感知工具(ES6-aware tools)将会直接导入 ES6 模块版本。

# 2. 常见问题

## 2.1 为什么 ES 模块比 CommonJS 更好？(Why are ES modules better than CommonJS modules?)

ES 模块是官方标准，也是 JavaScript 语言明确的发展方向，而 CommonJS 模块是一种特殊的传统格式，在 ES 模块被提出之前做为暂时的解决方案。ES 模块允许进行静态分析，从而实现像 tree-shaking 的优化，并提供诸如如循环引用和动态绑定等高级功能。

## 2.2 什么是 'tree-shaking'? (What is "tree-shaking"?)

Tree-shaking, 也被称为 "live code inclusion" 它是清除实际上并没有在给定项目中使用的代码的过程，但是它可以更加高效。词汇来源查看：[与清除无用代码相似](https://medium.com/@Rich_Harris/tree-shaking-versus-dead-code-elimination-d3765df85c80#.jnypozs9n).

## 2.3 我如何在 CommonJS 模块中使用 Rollup ? (How do i use Rollup in Node.js with CommonJS modules?)

Rollup 力图实现 ES 模块的规范，而不一定是 Node.js, npm, `require()`, CommonJS 的特性。因此，加载 CommonJS 模块和使用 Node 模块位置解析逻辑都被实现为可选插件，默认情况下不在 Rollup 内核中。你只需要执行 `npm install` 安装 [CommonJS](https://github.com/rollup/rollup-plugin-commonjs) 和 [node-resolve](https://github.com/rollup/rollup-plugin-node-resolve) 插件然后使用 `rollup.config.js` 配置文件启用他们，那你就完成了所有设置。

## 2.4 Rollup 是用来构建库还是应用程序？(Is ROllup meant for building libraries or applications?)

Rollup 已被许多主流的 JavaScript 库使用，也可用于构建绝大多数应用程序。但是 Rollup 还不支持一些特定的高级功能，尤其是用在构建一些应用程序的时候，特别是代码拆分和运行时态的动态导入 [dyamic imports at runtime](https://github.com/tc39/proposal-dynamic-import). 如果你的项目中更需要这些功能，那使用 Webpack 可能更符合你的需求。

## 2.5 谁制作了 Rollup 的 Logo。太可爱了！(Who made the Rollup logo? It's lovely.)

我就知道！是 [Julian Lloyd](https://twitter.com/jlmakes) 制作的。

