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

我们一般在命令行中使用 Rollup. 你也可以提供一份配置文件来简化命令行操作，同时还能启用 Rollup 的高级特性。

## 4.1 配置文件

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

## 4.2 命令行的参数

配置文件中的许多选项和命令行的参数是等价的。如果你使用这里的参数，那么将重写配置文件。想了解更多的话，仔细查阅 *8. 大选项列表*。

```
-i, --input <filename>  要打包的文件 (必须)
-o, --file <output>     输出的文件 (如果没有这个参数，则直接输出到控制台)
-f, --format <format>   输出的文件类型 (amd, cjs, esm, iife, umd)
-e, --external <ids>    将模块 ID 的逗号分隔列表排除
-g, --globals <pairs>   以 'module ID:Global' 键值对的形式，用逗号分隔开 任何定义在这里模块 ID 定义添加到外部依赖

-n, --name <name>       生成 UMD 模块的名字
-h, --help              输出 help 信息
-m, --sourcemap         生成 sourcemap (`-m inline` for inline map)
--amd.id                AMD 模块的 ID, 默认是个匿名函数
--amd.define            使用 Function 来代替 'define'
--no-strict             在生成的包中省略`"use strict";`
--no-conflict           对于 UMD 模块来说，给全局变量生成一个无冲突的方法
--intro                 在打包好的文件的块的内部(wrapper内部)的最顶部插入一段内容
--outro                 在打包好的文件的块的内部(wrapper内部)的最底部插入一段内容
--banner                在打包好的文件的块的外部(wrapper外部)的最顶部插入一段内容
--footer                在打包好的文件的块的外部(wrapper外部)的最顶部插入一段内容
--interop               包含公共的模块 (这个选项是默认添加的)
```

此外，还可以使用以下参数：

`-h/--help`

打印帮助文档。

`-v/--version`

打印已安装的 Rollup 版本号。

`-w/--watch`

监听源文件是否有改动，如果有改动，重新打包。

`--slient`

不要将警告打印到控制台。

# 5. JavaScript API

Rollup 提供 JavaScript 接口那样可以通过 Node.js 来使用。你可以很少使用，而且很可能使用命令行接口，除非你想扩展 Rollup 本身，或者用于一些难懂的任务，例如用代码把文件束生成出来。

## 5.1 rollup.rollup

该函数返回一个 `Promise`，它解析了一个 `bundle` 对象，此对象带有不同的属性及方法，如下：

```js
const rollup = require('rollup');

// see below for details on the options
const inputOptions = {...};
const outputOptions = {...};

async function build() {
    // create a bundle
    const bundle = await rollup.rollup(inputOptions);

    console.log(bundle.imports); // an array of external dependencies
    console.log(bundle.exports); // an array of names exported by the entry point
    console.log(bundle.modules); // an array of module objects

    // generate code and a sourcemap
    const { code, map } = await bundle.generate(outputOptions);

    // or write the bundle to disk
    await bundle.write(outputOptions);
}

build();
```

### a. 输入参数 (inputOptions)

`inputOptions` 对象包含下列属性。查看 *8. 大选项列表* 以获得这些参数更详细的资料：

```js
const inputOptions = {
    // 核心参数
    input, // 唯一必填参数
    external,
    plugins,

    // 高级参数
    onwarn,
    cache,

    // 危险参数
    acorn,
    context,
    moduleContext,
    legacy
};
```

### b. 输出参数 (outputOptions)

`outputOptions` 对象包括下列属性：

```js
const outputOptions = {
    // 核心参数
    file, // 若有 bundle.write 必填
    format, // 必填
    name,
    globals,

    // 高级参数
    paths,
    banner,
    footer,
    intro,
    outro,
    sourcemap,
    sourcemapFile,
    interop,

    // 危险区域
    exports,
    amd,
    indent,
    strict
};
```

## 5.2 rollup.watch

Rollup 也提供了 `rollup.watch` 函数，当它检测到磁盘上单个模块已经改变，它会重新构建你的文件束。当你通过命令行运行 Rollup, 并带上 `--watch` 标记时，此函数会被内部使用。

```js
const rollup = require('rollup');

const watchOptions = {...};
const watcher = rollup.watch(watchOptions);

watcher.on('event', event => {
    // event.code 会是下面其中一个：
    // START        - 监听器正在启动 (重启)
    // BUNDLE_START - 构建单个文件束
    // BUNDLE_END   - 完成文件束构建
    // END          - 完成所有文件束构建
    // ERROR        - 构建时遇到错误
    // FATAL        - 遇到无可修复的错误
});

// 停止监听
watcher.close();
```

### a. 监听参数 (watchOptions)

`watchOptions` 参数是一个你会从一个配置文件中导出的配置 (或一个配置数据)。

```js
const watchOptions = {
    ...inputOptions,
    output: [outputOptions],
    watch: {
        chokidar,
        include,
        exclude
    }
};
```

# 6. Rollup 与其他工具集成

## 6.1 npm packages

在某些时候，你的项目很可能依赖于从 npm 安装到你的 `node_module` 文件夹中的软件包。与 Webpack 和 Browserify 这样的其他捆绑包不同，Rollup 不知道如何打破常规去处理这些依赖。我们需要添加一些配置。

让我们添加一个简单的依赖 [the-answer](https://www.npmjs.com/package/the-answer).

```sh
npm install the-answer # or `npm i the-answer`
```

如果修改我们的 `src/main.js` 入口文件：

```js
// src/main.js
import answer from 'the-answer';

export default function() {
    console.log('the answer is ' + answer);
}
```

然后执行 Rollup

```sh
npm run build
```

我们将会看到下面这些警告：

```
(!) Unresolved dependencies
https://github.com/rollup/rollup/wiki/Troubleshooting#treating-module-as-external-dependency
the-answer (imported by main.js)
```

打包后的 `bundle.js` 仍然会在 Node.js 中工作，因为 `import` 声明转变成了 CommonJS 中的 `require`语句，但是 `the-answer`不包含在包中。因此，我们需要一个插件。

### a. rollup-plugin-node-resolve

[rollup-plugin-node-resolve](https://github.com/rollup/rollup-plugin-node-resolve) 这个插件可以告诉 Rollup 如何查找外部模块。安装它：

```sh
npm install --save-dev rollup-plugin-node-resolve
```

将它加入到你的配置文件中：

```js
// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    },
    plugins: [ resolve() ]
};
```

这次，当你运行 `npm run build`，再没有警告输出 - 打包文件 bundle 包含了引用的模块。

### b. rollup-plugin-commonjs

一些库导出成你可以正常导入的 ES6 模块 - `the-answer` 就是一个这样的模块。但是目前，npm 中的大多数包都是以 CommonJS 模块的形式出现的。在它们更改之前，我们需要将 CommonJS 模块转换为 ES2015 供 Rollup 处理。

这个 [rollup-plugin-commonjs](https://github.com/rollup/rollup-plugin-commonjs)插件就是用来将 CommonJS 转换成 ES2015 模块的。

请注意，`rollup-plugin-commonjs` 应该用在其他插件转换你的模块之前 - 这是为了防止其他插件的改变破坏 CommonJS 的检测。

## 6.2 Peer dependencies

假设你正在构建一个具有对等依赖关系 (peer dependency) 的库，例如 React 或 Lodash. 如果你如上所述设置外部引用 (externals). 你的 Rollup 将把所有 `imports` 的模块打包在一起：

```js
import answer from 'the-answer';
import _ from 'lodash';
```

你可以微调哪些导入是想要打包的，哪些是外部的引用 (externals)。对于这个例子，我们认为 `lodash`是外部的引用，而不是 `the-answer`.

这是配置文件：

```js
// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    },
    plugins: [ resolve({
        // 将自定义选项传递给解析插件
        customResolveOptions: {
            moduleDirectory: 'node_modules'
        }
    }) ],
    // 指出应将哪些模块视为外部模块
    external: ['lodash']
}
```

这样，`lodash` 现在将被视为外部的，不会与你的库打包在一起。

`external`接受一个模块名称的数组或一个接受模块名称的函数，如果它被视为外部引用 (externals) 则返回 `true`。例如：

```js
export default {
    // ...
    external: id => /lodash/.test(id)
}
```

如果你使用 [babel-plugin-lodash](https://github.com/lodash/babel-plugin-lodash)来最优选择 lodash 模块，在这种情况下，Babel 将转换你的导入语句，如下所示：

```js
import _merge from 'lodash/merge';
```

`external` 的数组形式不会处理通配符，所以这个导入只会以函数的形式被视作外部依赖/引用。

## 6.3 Babel

许多开发人员在他们的项目中使用 Babel, 以便他们可以使用未被浏览器和 Node.js 支持的将来版本的 JavaScript 特性。

使用 Babel 和 Rollup 的最简单方法是使用 [rollup-plugin-babel](https://github.com/rollup/rollup-plugin-babel)。安装它：

```js
// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
    input: 'src/main.js',
    output: {
        file: 'bundle.js',
        format: 'cjs'
    },
    plugins: [
        resolve(),
        babel({
            exclude: 'node_modules/**' // 只编译我们的源代码
        })
    ]
};
```

在 Babel 实际编译代码之前，需要进行配置。创建一个新文件 `src/.babelrc`:

```json
{
    "presets": [
        ["latest", {
            "es2015": {
                "modules": false
            }
        }]
    ],
    "plugins": ["external-helpers"]
}
```

这个设置有一些不寻常的地方。首先，我们设置 `"modules": false`，否则 Babel 会在 Rollup 有机会做处理之前，将我们的模块转成 CommonJS，导致 Rollup 的一些处理失败。

其次，我们使用 `external-helpers` 插件，它允许 Rollup 在包的顶部只引用一次 `helpers`，而不是每个使用它们的模块中都引用一遍 (这是默认行为)。

第三，我们将 `.babelrc`文件放在 `src`中，而不是根目录下。这允许我们对于不同的任务有不同的 `.babelrc`配置，比如像测试，如果我们以后需要的话 - 通常为单独的任务单独配置会更好。

现在，在我们运行 rollup 之前，我们需要安装 `latest`preset 和 `external-helpers`插件：

```sh
npm i -D babel-preset-latest babel-plugin-external-helpers
```

运行 Rollup 现在将创建一个 bundle 包。实际上我们并没有使用任何 ES2015 特性。我们来改变一下，编辑 `src/main.js`：

```js
// src/main.js
import answer from 'the-answer';

export default () => {
    console.log(`the answer is ${answer}`);
}
```

运行 Rollup `npm run build`，检查打包后的 bundle:

```js
'use strict';

var index = 42;

var main = (function () {
    console.log('the answer is ' + index);
});

module.exports = main;
```

## 6.4 Gulp

Rollup 返回 gulp 能明白的 `promises`，所以集成很容易。

语法和配置文件非常相似，但属性分为两个不同的操作，对应于 JavaScript API:

```js
const gulp = require('gulp');
const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript');

gulp.task('build', async function() {
    const bundle = await rollup.rollup({
        input: './src/main.ts',
        plugins: [
            rollupTypescript()
        ]
    });

    await bundle.write({
        file: './dist/library.js',
        format: 'umd',
        name: 'library',
        sourcemap: true
    });
});
```

# 7. ES 模块语法

以下内容旨在对 [ES2015 规范](https://www.ecma-international.org/ecma-262/6.0/) 中定义的模块行为做一个轻量级的参考，因为对导入和导出语句的正确理解对于成功使用 Rollup 是至关重要的。

## 7.1 导入 (Importing)

导入的值不能重新分配，尽管导入的对象和数组可以被修改 (导出模块，以及任何其他的导入，都将受到该修改的影响)。在这种情况下，它们的行为与 const 声明类似。

### a. 命名导入 (Named Imports)

从源模块导入其原始名称的特定项目。

```js
import { something } from './module.js';
```

从源模块导入特定项，并在导入时指定自定义名称。

```js
import { something as somethingElse } from './module.js';
```

### b. 命名空间导入 (Namespace Imports)

将源模块中的所有内容作为对象导入，将所有源模块的命名导出公开为属性和方法。默认导出被排除在此对象之外。

```js
import * as module from './module.js'
```

上面的 'something' 的例子将被附加到作为属性的导入对象上。"module.something"。

### c. 默认导入 (Default Import)

导入源模块的默认导出：

```js
import something from './module.js';
```

### d. 空的导入 (Empty Import)

加载模块代码，但不要创建任何新对象。

```js
import './module.js';
```

这对于 polyfills 是有用的，或者当导入的代码的主要目的是与原型有关的时候。

## 7.2 导出 (Exporting)

### a. 命名导出 (Named Exports)

导出以前声明的值：

```js
var something = true;

export { something };
```

在导出时重命名：

```js
export { something as somethingElse };
```

声明后立即导出：

```js
// 这可以与 'var', 'let', 'const', 'class', 'function' 配合使用
export var something = true;
```

### b. 默认导出 (Default Export)

导出一个值作为源模块的默认导出：

```js
export default something;
```

仅当源模块只有一个导出时，才建议使用此做法。

将默认和命名导出组合在同一模块中是不好的做法，尽管它是规范允许的。

## 7.3 绑定是如何工作的 (How bindings work)

ES 模块导出实时绑定，而不是值，所以值可以在最初根据这个示例导入后更改：

```js
// incrementer.js
export let count = 0;

export function increment() {
    count += 1;
}

// main.js
import { count, increment } from './incrementer.js';

console.log(count); // 0
increment();
console.log(count); // 1

count += 1; // Error 只有 incrementer.js 可以改变这个值。
```

# 8. 大选项列表

## 8.1 核心功能 (Core functionality)

### 输入 (input `-i/--input`)

`String`这个包的入口点 (例如：你的 `main.js, app.js, index.js`)

### 文件 (file `-o/--output.file`)

`String`要写入的文件。也可用于生成 `sourcemaps`，如果适用。

### 格式 (format `-f/--output.format`)

`String`生成包的格式。下列之一：

- `amd` - 异步模块定义，用于像 RequireJS 这样的模块加载器。
- `cjs` - CommonJS，适用于 Node 和 Browserify/Webpack。
- `esm` - 将软件包保存为 ES 模块文件，在现代浏览器中可以通过 `<script type="module">`标签引入。
- `iife` - 一个自动执行的功能，适合作为 `<script>`标签。如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。
- `umd` - 通用模块定义，以 `amd, cjs, iife`为一体。
- `system` - SystemJS 加载器格式。

### 生成包名称 (name `-n/--name`)

`String`变量名，代表你的 `iife/umd`包，同一页上的其他脚本可以访问它。

```js
// rollup.config.js
export default {
    ...,
    output: {
        file: 'bundle.js',
        format: 'iife',
        name: 'MyBundle'
    }
};

// -> var MyBundle = (function () {...
```

### 插件 (plugins)

插件对象数组 `Array`(或一个插件对象) - 有关详细信息请参阅插件入门。记住要调用导入的插件函数(即 `commonjs()`, 而不是 `commonjs`)。

```js
// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
    entry: 'main.js',
    plugins: [
        resolve(),
        commonjs()
    ]
}
```

### 外链 (external `-e/--external`)

两者任一：`Function`需要一个 `id`并返回 `true`(外部引用)或 `false`(不是外部引用)，或者 `Array`应该保留在 bundle 的外部引用的模块 ID. ID 应该是：

1. 外部依赖的名称。

2. 一个已被找到路径的 ID (像文件的绝对路径)。

```js
// rollup.config.js
import path from 'path';

export default {
    ...
    external: [
        'some-externally-required-library',
        path.resolve('./src/some-local-file-that-should-not-be-bundled.js')
    ]
}
```

当作为命令行参数给出时，它应该是以逗号分隔的 ID 列表：

```sh
rollup -i src/main.js ... -e foo,bar,bar
```

### 全局模块 (globals `-g/--globas`)

`Object`形式的 `id: name`键值对，用于 `umd/iife`包。例如：

```js
import $ from 'jquery';
```

我们想告诉 Rollup `jquery`模块的 id 等同于 `$`变量：

```js
// rollup.config.js
export default {
    ...,
    format: 'iife',
    name: 'MyBundle',
    globals: {
        jquery: '$'
    }
};

/*
var MyBundle = (function ($) {
    // 代码在这里
}(window.jQuery));
*/
```

或者，提供将外部模块 ID 转换为全局模块的功能。

当作为命令行参数给出时，它应该是一个逗号分隔的 "id: name" 键值对列表：

```sh
rollup -i src/main.js ... -g jquery:$,underscore:_
```

## 8.2 高级功能 (Advanced functionality)

### 路径 (paths)

`Function`, 它获取一个 ID 并返回一个路径, 或者 `id: path`对的 `Object`. 在提供的位置, 这些路径将被用于生成的包而不是模块 ID,从而允许您从 CDN 加载依赖关系:

```js
// app.js
import { selectAll } from 'd3';
selectAll('p').style('color', 'purple');

// rollup.config.js
export default {
    input: 'app.js',
    external: ['d3'],
    output: {
        file: 'bundle.js',
        format: 'amd',
        paths: {
            d3: 'https://d3js.org/d3.v4.min'
        }
    }
};

// bundle.js
define(['https://d3js.org/d3.v4.min'], function(d3) {
    d3.selectAll('p').style('color', 'purple');
});
```

### banner / footer

`String`字符串以 前置/追加 到文件束  (bundle). (注意: "banner" 和 "footer" 选项不会破坏 sourcemaps).

```js
// rollup.config.js
export default {
    ...,
    banner: '/* my-library version ' + version + ' */',
    footer: '/* follow me on Twitter! @rich_harris */'
}
```

### intro / outro

`String`类似于 `banner`和 `footer`, 除了代码在内部任何特定格式的包装器 (wrapper).

```js
export default {
    ...,
    intro: 'var ENVIRONMENT = "production";'
}
```

### 缓存 (cache)

`Object`以前生成的包. 使用它来加速后续的构建 - Rollup 只会重新分析已经更改的模块.

### onwarn

`Function`将拦截警告信息. 如果没有提供, 警告将被复制并打印到控制台.

警告是至少有一个 `code`和 `message`属性的对象, 这意味着您可以控制如果处理不同类型的警告:

```js
onwarn (warning) {
    // 跳过某些警告
    if(warning.code === `UNUSED_XTERNAL_IMPORT`) return;
    
    // 抛出异常
    if(warning.code === 'NON_EXISTENT_EXPORT') throw new Error(warning.message);
    
    // 控制台打印一切警告
    console.warn(warning.message);
}
```

许多警告也有一个 `loc`属性和一个 `frame`, 你可以定位到警告的来源:

```js
onwarn({loc, frame ,message}) {
    // 打印位置 (如果适用)
    if(loc) {
        console.warn(`${loc.file} (${loc.line}:${loc.column}) ${message}`);
        if(frame) console.warn(frame);
    } else {
        console.warn(message);
    }
}
```

### sourcemap (`-m/--sourcemap`)

如果 `true`, 将创建一个单独的 sourcemap 文件. 如果 `inline`, sourcemap 将作为数据 URI 附加到生成的 `output`文件中.

### sourcemapFile

`String`生成的包的位置. 如果这是一个绝对路径, sourcemap 中的所有源代码路径都将相对于它. `map.file`属性是 sourcemapFile 的基本名称(basename), 因为 sourcemap 的位置被假定为与 bundle 相邻.

如果指定 `output`, `sourcemapFile`不是必须的, 在这种情况下, 将通过给 bundle 输出文件添加 ".map" 后缀来推断输出文件名.

### interop

`Boolean`是否添加 'interop块'. 默认情况下 (`interop: true`), 为了安全起见, 如果需要区分默认和命名导出, 则 Rollup 会将任何外部依赖项 "default" 导出到一个单独的变量. 这通常只适用于您的外部依赖关系 (例如 Babel) (如果您确定不需要它), 则可以使用 "interop: false" 来节省几个字节.

## 8.3 危险区域 (Danger zone)

你可能不需要使用这些选项, 除非你知道你在做什么!

### treeshake

是否应用 tree-shaking. 建议您省略此选项 (默认为 `treeshake: true`), 除非您发现由 tree-shaking 算法引起的 bug, 在这种情况下, 请使用 "treeshake: false".

### acorn

任何应该传递给 Acorn 的选项, 例如 `allowReserved: true`.

### context

默认情况下, 模块的上下文 - 即顶级的 `this`的值为 `undefined`. 在极少数情况下, 你可能需要将其更改为其他内容, 如 `'window'`.

### moduleContext

和 `options.context`一样, 但是每个模块可以是 `id: context`对的对象, 也可以是 `id => context`函数.

### legacy

为了增加对诸如 IE8 之类的旧版环境的支持, 通过剥离更多可能无法正常工作的现代化的代码, 其代价是偏离 ES6 模块环境所需的精确规范.

### exports

`String`使用什么导出模式. 默认为 `auto`, 它根据 `entry`模块导出的内容猜测你的意图:

- `default` - 如果你使用 `export default ... `仅仅导出一个东西, 那适合用这个.
- `named` - 如果你导出多个东西, 适合用这个.
- `none` - 如果你不导出任何内容 (例如, 你正在构建应用程序, 而不库), 则适合用这个

`default` 和 `named`之间的区别会影响其他人如何使用文件束(bundle). 如果您使用 `default`, 则 CommonJS 用户可以执行此操作:

```js
var yourLib = require('your-lib');
```

使用 `named`, 用户可以这样做:

```js
var yourMethod = require('your-lib').yourMethod;
```

有点波折就是如果你使用 `named`导出, 但是**同时**也有一个 `default`导出, 用户必须这样做才能使用默认的导出:

```js
var yourMethod = require('your-lib').yourMethod;
var yourLib = require('your-lib')['default'];
```

### amd (`--amd.id` and `--amd.define`)

`Object`可以包含以下属性:

**amd.id** `String`用于 AMD/UMD 软件包的 ID:

```js
// rollup.config.js
export default {
    ...,
    format: 'amd',
    amd: {
    	id: 'my-bundle'
	}
};

// -> define('my-bundle', ['dependency'], ...)
```

**amd.define** `String`要使用的函数名称, 而不是 `define`:

```js
// rollup.config.js
export default {
    ...,
    format: 'amd',
    amd: {
    	define: 'def'
    }
};

// -> def(['dependency'], ...)
```

### indent

`String`是要使用的缩进字符串, 对于需要缩进代码的格式 (`amd, iif, umd`). 也可以是 `false`(无缩进)或 `true`(默认 - 自动缩进)

```js
// rollup.config.js
export default {
    ...,
    indent: false
};
```

### strict

`true`或 `false` (默认为 `true`) - 是否在生成的非 ES6 软件包的顶部包含 'use strict' pragma. 严格来说, ES6 模块始终都是严格模式, 所以你应该没有很好的理由来禁用它.

## 8.4 Watch options

这些选项仅在运行 Rollup 时使用 `--watch`标志或使用 `rollup.watch`时生效.

### watch.chokidar

一个 `Boolean`值表示应该使用 [chokidar](https://github.com/paulmillr/chokidar) 而不是内置的 `fs.watch`, 或者是一个传递给 chokidar 的选项对象.

如果你希望使用它, 你必须单独安装 chokidar.

### watch.include

限制文件监控至某些文件:

```js
// rollup.config.js
export default {
    ...,
    watch: {
    	include: 'src/**'
    }
}
```

### watch.exclude

防止文件被监控:

```js
// rollup.config.js
export default {
    ...,
    watch: {
        exclude: 'node_modules/**'
    }
}
```

