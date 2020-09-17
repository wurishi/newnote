[webpack 指南](https://www.webpackjs.com/guides/installation/)

# 1. 安装

## 1.1 前提条件

Node.js 请使用最新的长期支持版本(LTS)

## 1.2 本地安装

```bash
npm install --save-dev webpack
# 如果使用 webpack 4+ 版本, 还需要安装 CLI
npm i -D webpack-cli
```

对于大多数项目, 建议本地安装. 因为不同项目可能使用的 webpack 版本是不同的. 这样可以按需针对项目进行必要的升级.

通常, webpack 通过运行一个或多个 npm scripts:

```javascript
// package.json
{
    ...
    "scripts": {
        "start": "webpack --config webpack.config.js"
    }
}
```

## 1.3 全局安装

也可以通过 npm 全局安装, 让 webpack 在全局环境下可用:

```bash
npm i -g webpack
```

> 不推荐全局安装 webpack. 这会让项目中的 webpack 锁定到指定版本, 并且在使用不同的 webpack 版本的项目中, 可能会导致构建失败.

## 1.4 最新体验版本

```bash
npm i webpack@beta
npm i webpack/webpack#<tagname/branchname>
```

> 最新版本 v5.0.0-beta.30 (截止到2020/9/17)

# 2. 起步

webpack 用于编译 JavaScript 模块, 和其他打包器对比:

| 特性                                                         | webpack/webpack                                              | jrburke/requirejs                        | substack/node-browserify                 | jspm/jspm-cli                                                | rollup/rollup                            | brunch/brunch            |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------- | ---------------------------------------- | ------------------------------------------------------------ | ---------------------------------------- | ------------------------ |
| 附加模块按需加载                                             | yes                                                          | yes                                      | no                                       | System.import                                                | no                                       | no                       |
| AMD `define`                                                 | yes                                                          | yes                                      | deamdify                                 | yes                                                          | rollup-plugin-amd                        | yes                      |
| AMD `require`                                                | yes                                                          | yes                                      | no                                       | yes                                                          | no                                       | yes                      |
| AMD `require`按需加载                                        | yes                                                          | 手动配置                                 | no                                       | yes                                                          | no                                       | no                       |
| CommonJS `exports`                                           | yes                                                          | 只包含在 define 中                       | yes                                      | yes                                                          | commonjs-plugin                          | yes                      |
| CommonJS `require`                                           | yes                                                          | 只包含在 define 中                       | yes                                      | yes                                                          | commonjs-plugin                          | yes                      |
| CommonJS `require.resolve`                                   | yes                                                          | no                                       | no                                       | no                                                           | no                                       |                          |
| require 中拼接 `require('./fi' + 'le')`                      | yes                                                          | no♦                                      | no                                       | no                                                           | no                                       |                          |
| 调试支持                                                     | SourceUrl, SourceMaps                                        | 不需要                                   | SourceMaps                               | SourceUrl, SourceMaps                                        | SourceUrl, SourceMaps                    | SourceMaps               |
| 依赖                                                         | 19MB / 127 个程序包                                          | 11MB / 118 个程序包                      | **1.2MB / 1 个程序包**                   | 26MB / 131 个程序包                                          | ?MB / 3 个程序包                         |                          |
| ES2015 `import`/ `export`                                    | yes (webpack 2)                                              | no                                       | no                                       | yes                                                          | yes                                      | yes, 通过 es6 模块转换器 |
| require(guided) 中的表达式 `require('./templates/' + template)` | **yes (包括所有匹配的文件)**                                 | no♦                                      | no                                       | no                                                           | no                                       | no                       |
| require(free) 中的表达式 `require(moduleName)`               | 手动配置                                                     | no♦                                      | no                                       | no                                                           | no                                       |                          |
| 生成单独包                                                   | yes                                                          | yes♦                                     | yes                                      | yes                                                          | yes                                      | yes                      |
| 间接的 require `var r = require; r('./file')`                | yes                                                          | no♦                                      | no                                       | no                                                           | no                                       |                          |
| 分别加载每个文件                                             | no                                                           | yes                                      | no                                       | yes                                                          | no                                       | no                       |
| 损坏的路径名                                                 | yes                                                          | no                                       | 部分                                     | yes                                                          | 不需要 (路径名称不在包中)                | no                       |
| 压缩                                                         | uglify                                                       | uglify, closure compiler                 | uglifyify                                | yes                                                          | uglify-plugin                            | UglifyJS-brunch          |
| 用 common bundle 构建多页                                    | 手动配置                                                     | yes                                      | 手动配置                                 | 使用包算法                                                   | no                                       | no                       |
| 多个 bundle                                                  | yes                                                          | 手动配置                                 | 手动配置                                 | yes                                                          | no                                       | yes                      |
| Node.js 内置 libs `require('path')`                          | yes                                                          | no                                       | yes                                      | yes                                                          | node-resolve-plugin                      |                          |
| Node.js 其他                                                 | process, __dir/filename, global                              | -                                        | process, __dir/filename, global          | process, __dir/filename, global for cjs                      | global (commonjs-plugin)                 |                          |
| 插件                                                         | yes                                                          | yes                                      | yes                                      | yes                                                          | yes                                      | yes                      |
| 预处理                                                       | **loaders, transforms**                                      | loaders                                  | transforms                               | plugin translate                                             | plugin transforms                        | compilers, optimizers    |
| 浏览器替换                                                   | web_modules, .web.js, package.json field, alias config option | alias option                             | package.json field, alias option         | package.json, alias option                                   | no                                       |                          |
| 可 require 文件                                              | 文件系统                                                     | web                                      | 文件系统                                 | 通过插件                                                     | 文件系统或通过插件                       | 文件系统                 |
| 执行时(runtime)开销                                          | **243B + 20B 每个模块 + 4B 每个依赖**                        | 14.7kB + 0B 每个模块 + (3B + X) 每个依赖 | 415B + 25B 每个模块 + (6B + 2X) 每个依赖 | 5.5kB for 自执行 bundle, 38kB 全部 loader 和 polyfill, 0 普通模块, 293B CJS, 139B ES2015 System.register before gzip | none for ES2015 modules (可能有其他格式) |                          |
| 开发文件监听(watch)模式                                      | yes                                                          | 不需要                                   | watchify                                 | 开发不需要                                                   | rollup-watch                             | yes                      |

♦ 在生产模式 ( 在开始模式中相反)

X 是路径字符串的长度

## 2.1 基本安装

project

```diff
  |- package.json
+ |- index.html
+ |- /src
+   |- index.js
```

src/index.js

```javascript
function component() {
  const element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());
```

index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <title>起步</title>
    <script src="https://unpkg.com/lodash@4.16.6"></script>
  </head>
  <body>
    <script src="./src/index.js"></script>
  </body>
</html>
```

在这个示例中, `<script>`标签之间存在隐式依赖关系, `index.js`要执行必须保证 `lodash`已经被加载并且有一个全局变量 `_`.

使用这种方式去管理 JavaScript 项目会有一些问题:

- 脚本的执行依赖于外部扩展库 (external library).
- 如果依赖不存在, 或者引入顺序错误, 程序将无法正常运行.
- 如果依赖被引入但是并没有使用, 浏览器将被迫下载无用代码.

接下来使用 webpack 来管理这些脚本.

## 2.2 创建一个 bundle 文件

project

```diff
|- package.json
+ |- /dist
+   |- index.html
- |- index.html
  |- /src
    |- index.js
```

要在 `index.js`中打包 `lodash`依赖, 需要本地安装 `lodash`.

```bash
npm i lodash
```

> 安装一个要打包到生产环境的安装包, 应该使用 `npm install --save` 或 `npm i`, 如果安装一个用于开发环境的安装包 (例如: linter, 测试库), 应该使用 `npm install --save-dev`或 `npm i -D`(注意 D 必须大写)

现在, 在 `index.js`中 import `lodash`

```diff
+ import _ from 'lodash';
+
  function component() {
    var element = document.createElement('div');

-   // Lodash, currently included via a script, is required for this line to work
+   // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    return element;
  }

  document.body.appendChild(component());
```

因为现在是通过 `import`引入 `lodash`, 所以将 `lodash`的 `<script>`删除, 然后修改另一个 `<script>`标签它用来加载 bundle, 而不是原始的 /src 下的文件.

```diff
  <!doctype html>
  <html>
   <head>
     <title>起步</title>
-    <script src="https://unpkg.com/lodash@4.16.6"></script>
   </head>
   <body>
-    <script src="./src/index.js"></script>
+    <script src="main.js"></script>
   </body>
  </html>
```

最后使用 npx 运行 webpack. Node 8.2+ 版本提供的 `npx`命令, 可以运行在初始安装的 webpack 包中的二进制文件 (`./node_modules/.bin/webpack`).

```bash
npx webpack
```

