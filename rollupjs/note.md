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

# 3. 教程

## 3.1 创建第一个 bundle (Creating your first bundle)

开始前，需要安装 Node.js, 这样才可以使用 npm; 还需要了解如何 [command line](https://www.codecademy.com/learn/learn-the-command-line?__cf_chl_captcha_tk__=pmd_gDzBer.m3akGBu913axwioM3fUQrlzPIeVTtbnEs5CY-1631250033-0-gqNtZGzNAxCjcnBszQcR).

使用 Rollup 最简单的方法是通过 Command Line Interface (CLI). 先全局安装 Rollup (之后会介绍如何在项目中进行安装，更便于打包，但现在不用担心这个问题)。在命令行中输入以下内容：

```sh
npm install rollup --global # or `npm i rollup -g` for short
```

现在可以运行 rollup 命令了。试试吧

```sh
rollup
```

由于没有传递参数，所以 Rollup 打印出了使用说明。这和运行 `rollup --help` 或 `rollup -h` 的效果一样。

我们来创建一个简单的项目：

```sh
mkdir -p my-rollup-project/src
cd my-rollup-project
```

首先，我们需要个入口。将以下代码粘贴到新建的文件 `src/main.js`中：

```js
// src/main.js
import foo from './foo.js';
export default function() {
    console.log(foo);
}
```

之后创建入口文件引用的 `foo.js` 模块：

```js
// src/foo.js
export default 'hello world!';
```

现在可以创建 bundle 了：

```sh
rollup src/main.js -f cjs
```

`-f` 选项 (`--output.format` 的缩写) 指定了所创建 bundle 的类型 - 这里是 CommonJS (在 Node.js 中运行)。由于没有指定输出文件，所以会直接打印在 `stdout` 中：

```js
'use strict';

var foo = 'hello world!';

var main = function () {
    console.log(foo);
}

module.exports = main;
```

也可以像下面一样将 bundle 保存为文件：

```sh
rollup src/main.js -o bundle.js -f cjs
```

你也可以用 `rollup src/main.js -f cjs > bundle.js`，但是我们之后会提到，这种方法在生成 sourcemap 时灵活性不高。

试着运行下面的代码：

```sh
node
> var myBundle = require('./bundle.js');
> myBundle();
'hello world!'
```

恭喜，你已经用 Rollup 完成了第一个 bundle.

## 3.2 使用配置文件 (Using config files)

上面的方式还不错，但是如果添加更多的选项，这种命令行的方式就显得麻烦了。

为此，我们可以创建配置文件来囊括所需的选项。配置文件由 JavaScript 写成，比 CLI 更加灵活。

在项目中创建一个名为 `rollup.config.js` 的文件，增加如下代码：

```js
// rollup.config.js
export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    }
}
```

我们用 `--config` 或 `-c` 来使用配置文件：

```sh
rm bundle.js # so we can check the command works!
rollup -c
```

同样的命令行选项将会覆盖配置文件中的选项：

```sh
rollup -c -o bundle-2.js # '-o' is short for '--output.file'
```

注意 Rollup 本身会处理配置文件，所以可以使用 `export default` 语法 - 代码不会经过 Babel 等类似工具编译，所以只能使用所用 Node.js 版本支持的 ES2015 语法。

如果愿意的话，也可以指定与默认 `rollup.config.js` 文件不同的配置文件：

```sh
rollup --config rollup.config.dev.js
rollup --config rollup.config.prod.js
```

## 3.3 使用插件 (Using plugins)

目前为止，我们通过相对路径，将一个入口文件和一个模块创建成了一个简单的 bundle. 随着构建更复杂的 bundle, 通常会需要更大的灵活性 - 引入 npm 安装的模块，通过 Babel 编译代码，和 JSON 文件打交道等。

为此，我们可以用插件(plugins) 在打包的关键过程中更改 Rollup 的行为。

此教程中，我们将使用 [rollup-plugin-json](https://github.com/rollup/rollup-plugin-json), 令 Rollup 从 JSON 文件中读取数据。

将 rollup-plugin-json 安装为开发依赖：

```sh
npm install --save-dev rollup-plugin-json
```

我们用的是 `--save-dev` 而不是 `--save`, 因为代码实际执行时不依赖这个插件，只是在打包时使用。

更新 `src/main.js` 文件，从 `package.json`而非 `src/foo.js` 中读取数据：

```js
import { version } from '../package.json';

export default function() {
    console.log('version ' + version);
}
```

编辑 `rollup.config.js`文件，加入 JSON 插件：

```js
// rollup.config.js
import json from 'rollup-plugin-json';

export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    },
    plugins: [ json() ]
};
```

`npm run build` 执行 Rollup. 结果如下：

```js
'use strict';

var version = "1.0.0";

var main = function() {
    console.log('version ' + version);
}

module.exports = main;
```

注意只有我们实际需要的数据 - name 和 devDependencies 和 package.json 中的其它数据被忽略了。这是 tree-shaking 起了作用。

# 4. 命令行

Rollup 的配置文件是可选的，但是使用配置文件的作用很强大，而且很方便，因此我们推荐你使用。

配置文件是一个 ES6 模块，它对外暴露一个对象，这个对象包含了一些 Rollup 需要的一些选项。通常，我们把这个配置文件叫做 `rollup.config.js`，它通常位于项目的根目录。

仔细查阅 *8. 大选项列表*，你可以根据你自己的需要把它配置到你的配置文件中

```js
// rollup.config.js
export default {
    // 核心选项
    input, // 必须
    external,
    plugins,

    // 额外选项
    onwarn,

    //danger zone
    acorn,
    context,
    moduleContext,
    legacy,

    output: { // 必须 (如果要输出多个，可以是一个数组)
        // 核心选项
        file, // 必须
        format, // 必须
        name,
        globals,

        // 额外选项
        paths,
        banner,
        footer,
        intro,
        outro,
        sourcemap,
        sourcemapFile,
        interop,

        // 高危选项
        exports,
        amd,
        indent,
        strict
    },
};
```

你必须使用配置文件才能执行以下操作：

- 把一个项目打包，然后输出多个文件

- 使用 Rollup 插件，例如 [rollup-plugin-node-resolve](https://github.com/rollup/rollup-plugin-node-resolve) 和 [rollup-plugin-commonjs](https://github.com/rollup/rollup-plugin-commonjs). 这两个插件可以让你加载 Node.js 里面的 CommonJS 模块。

如果你想使用 Rollup 的配置文件，记得在命令行里加上 `--config` 或 `-c`.

## 4.1 配置文件

## 4.2 命令行的参数

# 5. JavaScript API

## 5.1 rollup.rollup

## 5.2 rollup.watch

# 6. Rollup 与其他工具集成

## 6.1 npm packages

## 6.2 Peer dependencies

## 6.3 Babel

## 6.4 Gulp

# 7. ES 模块语法

## 7.1 导入

## 7.2 导出

## 7.3 绑定是如何工作的

# 8. 大选项列表

## 8.1 核心功能

## 8.2 高级功能

## 8.3 危险区域

## 8.4 Watch options