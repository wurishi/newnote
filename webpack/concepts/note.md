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

