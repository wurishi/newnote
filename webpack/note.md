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

## 2.3 模块

ES2015 中的 `import`和 `export`语句已经被标准化. 虽然大多数浏览器还无法支持它们, 但是 webpack 却能提供开箱即用般的支持.

事实上, webpack 会将代码 "转译", 以便旧版本浏览器可以执行. 除了 `import`和 `export`, webpack 还能够支持多种其他模块语法.

注意, webpack 不会更改代码中除 `import`和 `export`语句以上的部分, 如果使用了其它 ES2015 特性, 请确保 webpack 的 loader 系统中使用了一个像是 Babel 或类似的转译器.

## 2.4 使用一个配置文件

在 webpack 4 中, 可以无须任何配置使用, 然而大多数项目会需要很复杂的设置, 这就是为什么 webpack 仍然要支持配置文件.

```diff
  |- package.json
+ |- webpack.config.js
  |- /dist
    |- index.html
  |- /src
    |- index.js
```

```bash
npx webpack
# 或
npx webpack --config webpack.config.js
```

> 如果 `webpack.config.js`文件存在, 则 webpack 命令将默认选择使用它. 当然也可以使用 `--config` 选项指定其他任何名称的配置文件.

比起在终端中手动输入大量命令, 配置文件具有更多的灵活性. 可以通过配置方式指定 loader 规则(loader rules), 插件(plugins), 解析选项(resolve options), 以及许多其他增强功能.

## 2.5 NPM 脚本(NPM Scripts)

考虑到用 CLI 这种方式来运行本地的 webpack 不是特别方便, 我们可以设置一个快捷方式. 在 `package.json`中添加一个 npm 脚本.

package.json

```diff
  {
    "name": "webpack-demo",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1",
+     "build": "webpack"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
      "webpack": "^4.0.1",
      "webpack-cli": "^2.0.9",
      "lodash": "^4.17.5"
    }
  }
```

现在可以运行命令:

```bash
npm run build
```

> 通过向 `npm run build`命令和你的参数之间添加两个中横线, 可以将自定义参数传递给 webpack, 例如: `npm run build -- --colors`

# 3. 管理资源

在 webpack 出现之前, 前端开发人员会使用 grunt 或 gulp 等工具来处理资源, 并将它们从 `/src`文件夹移动到 `/dist`或 `/build`目录中. JavaScript 模块也是同样方式处理的. 但是像 webpack, 它是动态打包(dynamically bundle)所有依赖项(创建所谓的**依赖图(dependency graph)**). 因为每个模块都可以明确表述它自身的依赖, 这样将避免打包未使用的模块.

webpack 最出色的功能之一就是, 除了 JavaScript, 还可以通过 loader 引入任何其他类型的文件. 也就是说, 显式依赖 JavaScript 模块的优点, 同样也可以用来构建网站或 web 应用程序中的所有非 JavaScript 内容. 先从 CSS 开始起步.

## 3.1 加载 CSS

为了从 JavaScript 模块中 `import`一个 CSS 文件, 需要在 module 配置中安装并添加 style-loader 和 css-loader:

```bash
npm i -D style-loader css-loader
```

webpack.config.js

```diff
  const path = require('path');

  module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
+   module: {
+     rules: [
+       {
+         test: /\.css$/,
+         use: [
+           'style-loader',
+           'css-loader'
+         ]
+       }
+     ]
+   }
  };
```

> webpack 根据正则表达式, 来确定应该查找哪些文件, 并将其提供给指定的 loader. 在这里就是将 `.css`结尾的全部文件, 都提供给 `style-loader`和 `css-loader`

project

```diff
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- style.css
    |- index.js
  |- /node_modules
```

src/index.js

```javascript
...
import './style.css'
...
```

此时, 依赖的样式 `import './style.css`中的 CSS 字符串将在模块运行时, 被加入到 `<style>`标签, 并被插入到 html 文件的 `<head>`中.

## 3.2 加载图片

使用 file-loader, 可以轻松的将背景和图标等图片内容混合到 CSS 中.

```bash
npm i -D file-loader
```

webpack.config.js

```diff
...
module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
+       {
+         test: /\.(png|svg|jpg|gif)$/,
+         use: [
+           'file-loader'
+         ]
+       }
      ]
    }
```

project

```diff
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- icon.svg
    |- style.css
    |- index.js
  |- /node_modules
```

现在, 当使用 `import Icon from './icon.svg'`, 该图像将被处理并添加到指定的 `output`目录, 并且 `Icon`变量将包含该图像处理后的最终 url. 当使用 css-loader时, 在 CSS 中的 `url('./icon.svg')`会使用类似的过程去处理. loader 会识别这是一个本地文件, 并将 `'./icon.svg'`路径, 替换为处理后的最终路径. html-loader 会以相同的方式处理 `<img src="./icon.svg" />`

webpack 运行后会发现, img 和 背景图片指向的都是类似 `dabc8b293a64eba5a5ab0dabb31511eb.svg`一样的路径. 这意味着 webpack 在 `src`文件夹中找到了图片文件, 并成功处理了它.

> 下一步可以查看 image-webpack-loader 和 url-loader, 以了解更多关于图片压缩和优化功能.

## 3.3 加载字体

