[link](https://www.webpackjs.com/configuration/)

# 1. 配置

webpack 是需要传入一个配置对象(configuration object). 取决于你如何使用 webpack, 可以通过两种方式之一: 终端或 Node.js.

[参考](./1/webpack.config.js)

# 2. 使用不同语言进行配置 (configuration languages)

webpack 接受以多种编程和数据语言编写的配置文件. 支持的文件扩展名列表, 可以在 node-interpret 包中找到. 使用 node-interpret, webpack 可以处理许多不同类型的配置文件.

## 2.1 TypeScript

为了使用 TypeScript 书写 webpack 的配置文件, 必须先安装相关依赖:

```bash
npm i -D typescript ts-node @types/node @types/webpack
```

webpack 版本 >= 2.7, 或者, 在 `tsconfig.json`文件中, 具有 `esModuleInterop`和 `allowSyntheticDefaultImports`这两个新的编译器选项的较新版本的 TypeScript.

### 问题

注意, 还需要核对 `tsconfig.json`文件. 如果 `tsconfig.json`中的 `compilerOptions`中的 module 字段是 `commonjs`, 则配置正确. 因为 `ts-node`仅支持 `commonjs`模块语法.

#### 解决方案一: 修改 tsconfig.json

打开 `tsconfig.json`文件并查找 `compilerOptions`. 将 `target`设置为 `"ES5"`, 以及将 `module`设置为 `"CommonJS"`(或者完全移除 `module`选项).

#### 解决方案二: 使用 tsconfig-paths

如果不能修改 `tsconfig.json`, 则可以安装 `tsconfig-paths`包:

```bash
npm i -D tsconfig-paths
```

然后, 为 webpack 专门创建一个单独的 TypeScript 配置:

tsconfig-for-webpack-config.json

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "target": "es5"
    }
}
```

> `ts-node`可以使用 `tsconfig-path`提供的环境变量来解析 `tsconfig.json`文件

然后设置 `tsconfig-path`提供的环境变量 `process.env.TS_NODE_PROJECT`:

package.json

```json
{
    "scripts": {
        "build": "TS_NODE_PROJECT=\"tsconfig-for-webpack-config.json\" webpack"
    }
}
```

## 2.2 CoffeeScript

```bash
npm i -D coffee-script
```

## 2.3 Babel and JSX

首先安装依赖:

```bash
npm i -D babel-register jsxobj babel-preset-es2015
```

.babelrc

```json
{
    "presets": ["es2015"]
}
```

webpack.config.babel.js

```jsx
import jsxobj from 'jsxobj';

const CustomPlugin = config => ({
    ...config,
    name: 'custom-plugin'
});

export default (
	<webpack target="web" watch mode="production">
    	<entry path="src/index.js" />
        <resolve>
        	<alias {...{
                    react: 'preact-compat',
                    'react-dom': 'preact-compat'
                }} />
        </resolve>
        <plugins>
        	<uglify-js opts={{
                    compression: true,
                    mangle: false
                }} />
            <CustomPlugin foo="bar" />
        </plugins>
    </webpack>
)
```

> 如果你在其他地方也使用了 Babel 并且把 `模块(modules)`设置为了 `false`, 那么你要么同时维护两份单独的 `.babelrc`文件, 要么使用 `const jsxobj = require('jsxobj');` 并且使用 `module.exports`而不是新版本的 `import`和 `export`语法. 这是因为尽管 Node.js 已经支持了许多 ES6 的新特性, 然而还无法支持 ES6 模块语法.

# 3. 多种配置类型 (configuration types)

除了导出单个配置对象, 还有一些方式满足其他需求.

## 3.1 导出为一个函数

从 webpack 配置文件中导出一个函数. 该函数在调用时, 会传入两个参数.

- 环境对象(environment): 包含了相关 CLI 的环境选项. (具体请查看 CLI 文档的环境选项)
- 选项 map(argv): 描述了传递给 webpack 的选项, 并且具有 `output-filename`和 `optimize-minimize`等 key.

```js
module.exports = function (env, argv) {
  env = env || {};

  // argv['optimize-minimize'] === true 只有传入 -p 或 --optimize-minimize

  return {
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-maps' : 'eval',
    entry: './index.js',
  };
};

```

## 3.2 导出一个 Promise

webpack 将运行由配置文件导出的函数, 并且等待 Promise 返回. 便于异步地加载所需的配置变量.

```js
module.exports = () => {
    return new Promise((resolve, reject) => {
        // ...
    })
}
```

## 3.3 导出多个配置对象

从 webpack 3.1.0 开始, 支持导出多个配置对象. webpack 会对所有的配置对象一一对应进行构建.

```js
module.exports = [
    {
        output: {
            filename: './dist-amd.js',
            libraryTarget: 'amd'
        }
    },
    {
        output: {
            filename:'./dist-commonjs.js',
            libraryTarget: 'commonjs'
        }
    }
]
```

# 4. 入口和上下文 (entry and context)

entry 对象是用于 webpack 查找启动并构建 bundle. 其上下文是入口文件所处的目录的绝对路径的字符串.

## 4.1 context

`string`

基础目录, 绝对路径, 用于从配置中解析入口起点 (entry point) 和 loader.

默认使用当前目录, 但是推荐在配置中传递一个值. 这使得你的配置独立于 CWD(current working directory)当前执行路径.

```js
context: path.resolve(__dirname, 'app')
```

## 4.2 entry

`string | [string] | object{<key>: string | [string]} | (function: () => string | [string] | object{<key>: string | [string]})`

起点或是应用程序的起点入口. 从这个起点开始, 应用程序启动执行. 如果传递一个数组, 那么数组的每一项都会执行.

动态加载的模块不是入口起点.

简单规则:

- 每个 HTML 页面都有一个入口起点.
- **单页应用(SPA)**: 一个入口起点.
- **多页应用(MPA)**: 多个入口起点.

```js
entry: {
    home: './home.js',
    about: './about.js',
    contact: './contact.js' 
}
```

## 4.3 命名

如果传入一个字符串或字符串数组, chunk 会被命为 `main`. 如果传入一个对象, 则每个键(key)会是 chunk 的名称, 该值描述了 chunk 的入口起点.

## 4.4 动态入口

```js
entry: () => './demo'
// 或
entry: () => new Promise(resolve => resolve(['./demo', './demo2']))
```

当结合 `output.library`选项时: 如果传入数组, 则只导出最后一项.

# 5. 输出 (output)

output 位于对象最顶级键(key), 包括了一组选项, 指示 webpack 如何去输出, 以及在哪里输出你的 bundle, asset 和其他你所打包或使用 webpack 载入的任何内容.

## 5.1 output.auxiliaryComment

`string | object`

在和 `output.library`和 `output.libraryTarget`一起使用时, 此选项允许用户向导出容器(export wrapper)中插入注释. 要为 `libraryTarget`每种类型都插入相同的注释, 可以直接将 `auxiliaryComment`设置为一个字符串:

```js
output: {
    library: 'comeLibName',
    libraryTarget: 'umd',
    filename: 'someLibName.js',
    auxiliaryComment: 'Test Comment'
}
```

将会生成如下:

```js
(function webpackUniversalModuleDefinition(root, factory) {
   // Test Comment
    if(typeof exports === 'object' && typeof module === 'object')
        module.exports = factory(require('lodash'));
    // Test Comment
    //...
});
```

要对 `libraryTarget`每种类型的注释进行更粒度地控制, 可以传入一个对象:

```js
auxiliaryComment: {
    root: 'Root Comment',
    commonjs: 'CommonJS Comment',
    commonjs2: 'CommonJS2 Comment',
    amd: 'AMD Comment'
}
```

## 5.2 output.filename

`string | function`

此选项决定了每个输出 bundle 的名称. 这些 bundle 将写入到 `output.path`选项指定的目录下.

对于单个入口起点, filename 会是一个静态名称.

```js
filename: 'bundle.js'
```

然而, 当通过多个入口起点(entry point), 代码拆分(code splitting)或各种插件(plugin)创建多个 bundle, 应该使用以下一种替换方式, 来赋予每个 bundle 一个唯一的名称.

- 使用入口名称

  ```js
  filename: '[name].bundle.js'
  ```

- 使用内部 chunk id

  ```js
  filename: '[id].bundle.js'
  ```

- 使用每次构建过程中, 唯一的 hash 生成

  ```js
  filename: '[name].[hash].bundle.js'
  ```

- 使用基于每个 chunk 内容的 hash

  ```js
  filename: '[chunkhash].bundle.js'
  ```

注意, 此选项被称为文件名, 但是你还是可以使用像 `"js/[name]/bundle.js"`这样的文件夹结构.

此选项不会影响那些 *按需加载 chunk* 的输出文件. 对于这些文件, 请使用 `output.chunkFilename`选项来控制输出. 通过 loader 创建的文件也不受影响. 在这种情况下, 你必须尝试 loader 特定的可用选项.

可以使用以下模板字符串 (通过 webpack 内容的 `TemplatedPathPlugin`):

| 模板        | 描述                                       |
| ----------- | ------------------------------------------ |
| [hash]      | 模块标识符 (module identifier) 的 hash     |
| [chunkhash] | chunk 内容的 hash                          |
| [name]      | 模块名称                                   |
| [id]        | 模块标识符 (module identifier)             |
| [query]     | 模块的 query, 例如, 文件名 `?`后面的字符串 |

`[hash]`和 `[chunkhash]`的长度可以使用 `[hash:16]`(默认为20)来指定. 或者, 通过指定 `output.hashDigestLength`的全局配置长度.

如果将这个选项设为一个函数, 函数将返回一个包含上面表格中替换信息的对象.

在使用 `ExtractTextWebpackPlugin`时, 可以用 `[contenthash]`来获取提取文件的 hash (即不是 `[hash]`也不是 `[chunkhash]`)

## 5.3 output.chunkFilename

`string | function`

此选项决定了非入口(non-entry) chunk 文件的名称. 有关可取的值的详细信息, 请查看 `output.filename`选项.

注意, 这些文件名需要在 runtime 根据 chunk 发送的请求去生成. 因此, 需要在 webpack runtime 输出 bundle 值时, 将 chunk id 的值对应映射到占位符(如 `[name]`和 `[chunkhash]`). 这会增加文件大小, 并且在任何 chunk 的占位符值修改后, 都会使 bundle 失效.

默认使用 `[id].js` 或从 `output.filename`中推断出的值 (`[name]`会被预先替换为 `[id]`或 `[id].`)

## 5.4 output.chunkLoadTimeout

`integer`

chunk 请示到期之间的毫秒数, 默认为 120000. 从 webpack 2.6.0 开始支持此选项.

## 5.5 output.crossOriginLoading

`boolean | string`

只用于 `target`是 `web`, 使用了通过 script 标签的 JSONP 来按需加载 chunk.

启用 `cross-origin 属性`加载 chunk. 以下是可以接收的值:

- `false`: 禁用跨域加载 (默认)
- `"anonymous"`: 不带凭据(credential)启用跨域加载
- `"use-credentials"`: 带凭据(credential)启用跨域加载 with credentials

## 5.6 output.jsonpScriptType

`string`

允许自定义 `script`的类型, webpack 会将 `script`标签注入到 DOM 中以下载异步 chunk, 可以使用以下选项:

- `"text/javascript"`: 默认
- `"module"`: 与 ES6 代码一起使用

## 5.7 output.devtoolModuleFilenameTemplate

`string | function(info)`

此选项仅在 `devtool`使用了需要模块名称的选项时使用.

自定义每个 source map 的 `sources`数组中使用的名称. 可以通过传递模板字符串(template string)或者函数来完成. 例如, 当使用 `devtool: 'eval'`, 默认值是:

```js
devtoolModuleFilenameTemplate: 'webpack://[namespace]/[resource-path]?[loaders]'
```

模板字符串(template string)接收以下替换 (通过 webpack 内部的 `ModuleFilenameHelpers`):

| 模板                     | 描述                                                         |
| ------------------------ | ------------------------------------------------------------ |
| [absolute-resource-path] | 绝对路径文件名                                               |
| [all-loaders]            | 自动和显式的 loader, 并且参数取决于第一个 loader 名称        |
| [hash]                   | 模块标识符的 hash                                            |
| [id]                     | 模块标识符                                                   |
| [loaders]                | 显式的 loader, 并且参数取决于第一个 loader 名称              |
| [resource]               | 用于解析文件的路径和用于第一个 loader 的任意查询参数         |
| [resource-path]          | 不带任何查询参数, 用于解析文件的路径                         |
| [namespace]              | 模块命名空间. 在构建成为一个 library 之后, 通常也是 library 名称, 否则为空 |

当使用一个函数时, 同样的选项要通过 `info`参数并使用驼峰式(camel-cased)访问:

```js
devtoolModuleFilenameTemplate: info => {
    return `webpack://${info.resourcePath}?${info.loaders}`
}
```

如果多个模块产生相同的名称, 使用 `output.devtoolFallbackModuleFilenameTemplate`来代替这些模块.

## 5.8 output.devtoolFallbackModuleFilenameTemplate

`string | function(info)`

当模块字符串或函数产生重复时使用的备用内容

## 5.9 ~~output.devtoolLineToLine~~

`boolean | object`

已废弃, 很快将删除.

## 5.10 output.devtoolNamespace

`string`

此选项确定 `output.devtoolModuleFilenameTemplate`使用的模块名称空间. 未指定时的默认值为: `output.library`. 在加载多个通过 webpack 构建的 library 时, 用于防止 sourcemap 中源文件路径冲突.

例如, 如果你有两个 library, 分别使用命名空间 `library1`和 `library2`, 并且都有一个文件 `./src/index.js` (可能具有不同的内容), 它们最终会被暴露为 `webpack://library1/./src/index.js`和 `webpack://library2/./src/index.js`

## 5.11 output.hashDigest

在生成 hash 时使用的编码方式, 默认为 `'hex'`. 支持 Node.js `hash.digest`的所有编码.

## 5.12 output.hashDigestLength

散列摘要的前缀长度, 默认为 20

## 5.13 output.hashFunction

`string | function`

散列算法, 默认为 `'md5'`. 支持 Node.js `crypto.createHash`的所有功能. 从 4.0.0-alpha2 开始, `hashFunction`支持返回一个自定义 hash 的构建函数. 出于性能原因, 你可以提供一个不加密的哈希函数 (non-crypto hash function)

```js
hashFunction: require('metrohash').MetroHash64
```

确保 hash 函数有可访问的 `update`和 `digest`方法.

## 5.14 output.hashSalt

可选值, 通过 Node.js 的 `hash.update`来更新哈希.

## 5.15 output.hotUpdateChunkFilename

`string | function`

自定义热更新 chunk 的文件名. 可选值的详细信息, 请查看 `output.filename`选项.

占位符只能是 `[id]`和 `[hash]`, 默认值是:

```js
hotUpdateChunkFilename: '[id].[hash].hot-update.js'
```

## 5.16 output.hotUpdateFunction

`function`

只在 `target`是 web 时使用, 用于加载热更新(hot update)的 JSONP 函数.

JSONP 函数用于异步加载(async load)热更新(hot-update) chunk.

详情可查看 `output.jsonpFunction`

## 5.17 output.hotUpdateMainFilename

`string | function`

自定义热更新的主文件名(main filename). 可选的值可参考 `output.filename`.

占位符只能是 `[hash]`, 默认值是:

```js
hotUpdateMainFilename: '[hash].hot-update.json'
```

## 5.18 output.jsonpFunction

`string`

只在 `target`是 web 时使用, 用于按需加载(load on-demand) chunk 的 JSONP 函数.

JSONP 函数用于异步加载(async load) chunk, 或者拼接多个初始 chunk(CommonsChunkPlugin, AggressiveSplittingPlugin).

如果在同一网页中使用了多个 (来自不同编译过程(compilation)的) webpack runtime, 则需要修改此选项.

如果使用了 `output.library`选项, library 名称会自动追加.

## 5.19 output.library

`string | object`

从 webpack 3.1.0 开始支持 object, 用于 `libraryTarget: "umd"`

`output.library`值的作用, 取决于 `output.libraryTarget`选项的值. 要注意的是, `output.libraryTarget`的默认选项是 `var`, 所以如果使用以下配置:

```js
output: {
    library: 'MyLibrary'
}
```

如果生成的输出文件, 是在 HTML 页面中作为一个 script 标签引入, 则变量 `MyLibrary`将与入口文件的返回值绑定.

注意, 如果将数组作为 entry, 那么只会暴露数组中的最后一个模块. 如果将对象作为 entry, 还可以使用数组暴露.

有关 `output.library`以及 `output.libraryTarget`详细信息, 请查看 *创建 library 指南*

## 5.20 output.libraryExport

`string | string[]`

webpack 3.0.0 开始支持 `string[]`

当使用 `libraryTarget`时, 默认情况下 webpack 会把 library 放到一个名为 `_entry_return_`的命名空间下, 它有以下取值:

- `libraryExport: "default"`: 默认情况下

  ```js
  // 假设导出名为 "MyDefaultModule"
  var MyDefaultModule = _entry_return_.default;
  ```

- `libraryExport: "MyModule"`: 

  ```js
  var MyModule = _entry_return_.MyModule;
  ```

- `libraryExport: ["MyModule", "MySubModule"]`: 

  ```js
  var MySubModule = _entry_return_.MyModule.MySubModule;
  ```

## 5.21 output.libraryTarget

`string`

默认值: `"var"`

配置如何暴露 library. 可以使用下面的选项中的任意一个. 注意, 此选项与分配给 `output.library`的值一同使用. 对于下面的示例, 都假定将 `output.library`的值配置为 `MyLibrary`

> 注意, 下面的示例代码中的 `_entry_return_`是入口起点返回的值. (参考 `output.libraryExport`)

### 暴露为一个变量

会将入口起点的返回值, 在 bundle 包所引入的位置, 赋值给 `output.library`提供的变量名.

`libraryTarget: "var"` - 默认值. 当 library 加载完成, 入口起点的返回值将分配给一个变量:

```js
var MyLibrary = _entry_return_;

MyLibrary.doSomething();
```

**当使用此选项时, 如果将 `output.library`设置为空, 会因为没有变量导致无法赋值.**

`libraryTarget: "assign"` - 将产生一个隐含的全局变量, 可能会潜在地重新分配到全局中已经存在的值(可能会覆盖全局变量, 所以要谨慎使用).

```js
MyLibrary = _entry_return_;
```

如果 `MyLibrary`在作用域中未在前面的代码中定义, 则 library 将被设置到全局作用域内.

**当使用此选项时, 如果将 `output.library`设置为空, 将产生一个破损的输出 bundle**