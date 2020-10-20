[webpack 概念](https://www.webpackjs.com/concepts/entry-points/)

# 1. 概念

本质上, webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler). 当 webpack 处理应用程序时, 它会递归地构建一个依赖关系图(dependency graph), 其中包含应用程序需要的每个模块, 然后将所有这些模块打包成一个或多个 bundle.

从 webpack v4.0.0 开始, 可以不用引用一个配置文件. 然而, webpack 仍然还是高度可配置的. 在开始前需要先理解四个**核心概念**:

- 入口 (entry)
- 输出 (output)
- loader (module)
- 插件 (plugins)

## 1.1 入口 (entry)

**入口起点(entry point)**指示 webpack 应该使用哪个模块, 来作为构建其内部依赖图的开始. 进行入口起点后, webpack 会找出有哪些模块和库是入口起点(直接和间接)依赖的.

每个依赖项随即被处理, 最后输出到称之为 bundles 的文件中.

可以通过在 webpack 配置中配置 `entry`属性, 来指定一个入口起点(或多个入口起点). 默认值为 `./src`.

## 1.2 出口 (output)

`output` 属性告诉 webpack 在哪里输出它所创建的 bundles, 以及如何命名这些文件, 默认值为 `./dist`.基本上, 整个应用程序结构, 都会被编译到你指定的输出路径的文件夹中. 你可以通过在配置中指定一个 `output`字段, 来配置这些处理过程.

## 1.3 loader (module)

loader 让 webpack 能够去处理那些非 JavaScript 文件 (webpack 自身只理解 JavaScript). loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块, 然后你就可以利用 webpack 的打包能力, 对它们进行处理.

本质上, webpack loader 将所有类型的文件, 转换为应用程序的依赖图(和最终的 bundle)可以直接引用的模块.

> 注意, loader 能够 `import`导入任何类型的模块(例如 `.css`文件), 这是 webpack 特有的功能, 其他打包程序或任务执行器的可能并不支持. webpack 认为这种语言扩展是很有必要的, 因为这可以使开发人员创建出更准确的依赖关系图.

在 webpack 的配置中 loader 有两个目标:

1. `test`属性, 用于标识出应该被对应的 loader 进行转换的某个或某些文件.
2. `use`属性, 表示进行转换时, 应该使用哪个 loader.

```js
module: {
    rules: [
      {
        test: /\.txt$/,
        use: 'raw-loader',
      },
    ],
  },
```

以上配置中, 对一个单独的 module 对象定义了 `rules`属性, 里面包含了两个必须的属性: `test`和 `use`. 这告诉 webpack 编译器(compiler)如下信息:

> webpack 编译器, 当你碰到 「在 `require() / import`语句中被解析为 '.txt'的路径」时, 在你对它打包之前, 先使用 `raw-loader`转换一下.

## 1.4 插件 (plugins)

loader 被用于转换某些类型的模块, 而插件则可以用于执行范围更广的任务. 插件的范围包括, 从打包优化和压缩, 一直到重新定义环境中的变量. 插件接口功能极其强大, 可以用于处理各种各样的任务.

想要使用一个插件, 你只需要 `require()`它, 然后把它添加到 `plugins`数组中. 多数插件可以通过选项(option)自定义. 也可以在一个配置文件中因为不同目的而多次使用同一个插件, 这时需要通过使用 `new`操作符来创建它的一个实例.

## 1.5 模式 (mode)

通过选择 `development`或 `production`之中的一个, 来设置 `mode`参数, 你可以启用相应模式下的 webpack 内置的优化.

# 2. 入口起点 (entry points)

## 2.1 单个入口(简写)语法

用法: `entry: string|Array<string>`

```js
const config = {
    entry: './path/to/my/entry/file.js'
};
module.exports = config;
```

以上这种单个入口的语法, 是下面的简写:

```js
const config = {
    entry: {
        main: './path/to/my/entry/file.js'
    }
};
```

**当 `entry`传入一个数组时会发生什么?**

向 `entry`属性传入「文件路径(file path)数组」将创建"多**个主入口(multi-main entry)**". 如果想要多个依赖文件一起注入, 并且将它们的依赖导向(graph)到一个"chunk"时, 传入数组的方式就很有用.

简写方式适用于只有一个入口起点的应用程序或工具, 但会失去扩展配置时的灵活性.

## 2.2 对象语法

用法: `entry: {[entryChunkName: string]: string|Array<string>}`

```js
const config = {
    entry: {
        app: './src/app.js',
        vendors: './src/vendors.js'
    }
};
```

对象语法会比较繁琐. 然而, 这是应用程序中定义入口的最可扩展方式.

> **"可扩展的 webpack 配置"**是指, 可重用并且可以与其他配置组合使用. 这是一种流行的技术, 用于将关注点(concern)从环境(environment), 构建目标(build target), 运行时(runtime)中分离. 然后使用专门的工具(如 webpack-merge)将它们合并.

## 2.3 常见场景

### 2.3.1 分离 应用程序(app) 和 第三方库 (vendor) 入口

```js
const config = {
    entry: {
        app: './src/app.js',
        vendors: './src/vendors.js'
    }
};
```

**这是什么?**

从表面上看, 这告诉我们 webpack 从 `app.js`和 `vendor.js`开始创建依赖图(dependency graph). 这些依赖图是彼此完全分离, 互相独立的(每个 bundle 中都有一个 webpack 引导(bootstrap)). 这种方式比较常见于, 只有一个入口起点(不包括 vendor)的单面应用程序(single page application SPA)中.

**为什么?**

此设置允许你使用 `CommonsChunkPlugin`从「应用程序 bundle」中提取 vendor 引用(vendor reference)到 vendor bundle, 并把引用 vendor 的部分替换为 `__webpack_require__()`调用. 如果应用程序 bundle 中没有 vendor 代码, 那么你可以在 webpack 中实现被称为长效缓存(见: 指南 11.缓存)的通用模式.

### 2.3.2 多页面应用程序

```js
const config = {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
};
```

**这是什么?**

告诉 webpack 需要3个独立分离的依赖图.

**为什么?**

在多页应用中, 每次页面跳转都会获取一个新的 HTML 文档. 页面会重新加载文档, 并且资源会重新下载. 这给了我们特殊的机会去做很多事:

- 使用 `CommonsChunkPlugin`为每个页面间的应用程序共享代码创建 bundle. 由于入口起点增多, 多页应用能够复用这些共享代码/模块.

# 3. 输出 (output)

配置 `output`选项可以控制 webpack 如何向硬盘写入编译文件. 注意, 即使可以存在多个 `入口`起点, 但只能指定一个 `输出`配置.

## 3.1 用法 (Usage)

在 webpack 中配置 `output`属性的最低要求是, 将它的值设置为一个对象, 包括以下两点:

- `filename`用于输出文件的文件名.
- `path`目标输出目录(绝对路径)

## 3.2 多个入口起点

如果配置创建了多个单独的"chunk" (例如, 使用多个入口起点或使用像 CommonsChunkPlugin 这样的插件), 则应该使用占位符(substitutions)来确保每个文件具有唯一的名称.

```js
const config = {
    // ...
    entry: {
        app: './src/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    }
}
```

## 3.3 高级进阶

使用 CDN 和资源 hash 的复杂示例:

```js
const config = {
    // ...
    output: {
        path: '/home/proj/cdn/assets/[hash]',
        publicPath: 'http://cdn.example.com/assets/[hash]/'
    }
};
```

# 4. 模式 (mode)

提供 `mode`配置选项, 告知 webpack 使用相应模式的内置优化. `string`

## 4.1 用法

只在配置中提供 `mode`选项:

```js
module.exports = {
    mode: 'production'
};
```

或者从 CLI 参数中传递:

```bash
webpack --mode=production
```

支持以下字符串值:

| 选项          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| `development` | 会将 `process.env.NODE_ENV`的值设为 `development`. 启用 `NamedChunksPlugin` 和 `NamedModulesPlugin`. |
| `production`  | 会将 `process.env.NODE_ENV`的值设为 `production`. 启用 `FlagDependencyUsagePlugin`, `FlagIncludedChunksPlugin`, `ModuleConcatenationPlugin`, `NoEmitOnErrorsPlugin`, `OccurrenceOrderPlugin`, `SideEffectsFlagPlugin` 和 `UglifyJsPlugin`. |

> 注意: 只设置 `NODE_ENV`, 则不会自动设置 `mode`.

**mode: development**

```js
module.exports = {
    mode: 'development',
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("development")
        }),
    ]
}
```

**mode: production**

```js
module.exports = {
    mode: 'production',
    plugins: [
        new UglifyJsPlugin(/* ... */),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
}
```

# 5. loader

loader 用于对模块的源代码进行转换. loader 可以使你在 `import`或"加载"模块时预处理文件. 因此, loader 类似于其他构建工具中"任务(task)", 并提供了处理前端构建步骤的强大方法. loader 可以将文件从不同的语言(如 TypeScript)转换为 JavaScript, 或将内联图像转换为 data URL. loader 甚至允许你直接在 JavaScript 模块中 `import`CSS文件!

## 5.1 示例

可以使用 loader 告诉 webpack 加载 CSS 文件, 或者将 TypeScript 转为 JavaScript. 为此, 首先安装相对应的 loader:

```bash
npm i -D css-loader
npm i -D ts-loader
```

然后指示 webpack 对每个 `.css`使用 `css-loader`(一般还需要配合 `style-loader`), 以及对所有 `.ts`文件使用 `ts-loader`:

```js
module.exports = {
    module: {
        rules: [
            { test: /\.css$/, use: 'css-loader' },
            { test: /\.tsx?$/, use: 'ts-loader' }
        ]
    }
}
```

## 5.2 使用 loader

有三种使用 loader 的方式:

- 配置 (推荐): 在 webpack.config.js 文件中指定 loader.
- 内联: 在每个 `import`语句中显式指定 loader.
- CLI: 在 shell 命令中指定它们.

### 5.2.1 配置 (Configuration)

`module.rules`允许你在 webpack 配置中指定多个 loader. 这是展示 loader 的一种简明方式, 并且有助于使代码变得简洁. 同时让你对各个 loader 有个全局概览.

```js
const config = {
    // ...
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    }
};
```

### 5.2.2 内联

可以在 `import`语句或任何等效于"import"的方式中指定 loader. 使用 `!`将资源中的 loader 分开. 分开的每个部分都相对于当前目录解析.

```js
import Styles from 'style-loader!css-loader?modules!./styles.css';
```

通过前置所有规则及使用 `!`, 可以对应覆盖到配置中的任意 loader.

选项可以传递查询参数, 例如 `?key=value&foo=bar`, 或者一个 JSON 对象, 例如 `?{"key":"value", "foo":"bar"}`.

> 尽可能使用 `module.rules`. 因为这样可以减少源代码中的代码量, 并且可以在出错时, 更快地调试和定位 loader 中的问题.

### 5.2.3 CLI

通过 CLI 使用 loader:

```bash
webpack --module-bind jade-loader --module-bind 'css=style-loader!css-loader'
```

这会对 `.jade`文件使用 `jade-loader`, 对 `.css`文件使得 `style-loader`和 `css-loader`.

## 5.3 loader 特性

- loader 支持链式传递. 能够对资源使用流水线(pipeline). 一组链式的 loader 将按照相反的顺序执行. loader 链中的第一个 loader 返回值给下一个 loader. 在最后一个 loader, 返回 webpack 所预期的 JavaScript.
- loader 可以是同步的, 也可以是异步的.
- loader 运行在 Node.js 中, 并且能够执行任何可能的操作.
- loader 接收查询参数, 用于对 loader 传递配置.
- loader 也能够使用 `options`对象进行配置.
- 除了使用 `package.json`常见的 `main`属性, 还可以将普通的 npm 模块导出为 loader, 做法是在 `package.json`里定义一个 `loader`字段.
- 插件(plugin)可以为 loader 带来更多特性.
- loader 能够产生额外的任意文件.

loader 通过(loader)预处理函数, 为 JavaScript 生态系统提供了更多能力. 用户现在可以更加灵活地引入细粒度逻辑, 例如压缩, 打包, 语言翻译和其他更多.

## 5.4 解析 loader

loader 遵循标准的模块解析. 多数情况下, loader 将从模块路径(通常将模块路径认为是 `npm install`, `node_modules`)解析.

loader 模块需要导出为一个函数, 并且使用 Node.js 兼容的 JavaScript 编写. 通常使用 npm 进行管理, 但是也可以将自定义 loader 作为应用程序中的文件. 按照约定, loader 通常被命名为 `xxx-loader`(例如 `json-loader`).