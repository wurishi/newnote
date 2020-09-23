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

file-loader 和 url-loader 可以接收并加载任何文件, 然后将其输出到构建目录中. 这就是说, 可以将它们用于任何类型的文件, 包括**字体**. 

webpack.config.js

```diff
+       {
+         test: /\.(woff|woff2|eot|ttf|otf)$/,
+         use: [
+           'file-loader'
+         ]
+       }
```

project

```diff
  |- package.json
  |- webpack.config.js
  |- /dist
    |- bundle.js
    |- index.html
  |- /src
+   |- gigi.ttf
    |- icon.svg
    |- style.css
    |- index.js
  |- /node_modules
```

此时就可以使用 `@font-face`引入字体, 本地的 `url(...)`指令会被 webpack 处理, 就像处理图片资源一样:

src/style.css

```css
@font-face {
  font-family: 'MyFont';
  src: url('./gigi.ttf');
  font-weight: 300;
  font-style: normal;
}
```

## 3.4 加载数据

此外, 可以加载的有用资源还包括数据. 如 JSON 文件, CSV, TSV 和 XML等. 类似于 NodeJS, JSON 支持实际上是内置的. 也就是说 `import Data from './data.json'`默认将正常运行. 要导入 CSV, TSV 和 XML, 可以使用 csv-loader 和 xml-loader.

```bash
npm i -D csv-loader xml-loader
```

project

```diff
  |- /src
+   |- data.xml
+   |- data.csv
```

现在, 可以直接使用 `import`加载四种类型的数据(JSON, CSV, TSV, XML)中的任何一种, 导入的数据将会是一个直接可以使用的已经解析的 JSON.

## 3.5 全局资源

以上述方式加载资源的好处是, 你可以以直观的方式将模块和资源组合在一起. 无需依赖于含有全部资源的 `/assets`目录, 而是将资源与代码组合在了一起.

```diff
- |- /assets
+ |– /components
+ |  |– /my-component
+ |  |  |– index.jsx
+ |  |  |– index.css
+ |  |  |– icon.svg
+ |  |  |– img.png
```

这种配置方式会使代码更具备可移植性. 因为现有的统一放置的方式会造成所有资源紧密耦合在了一起. 如果想在另一个项目中使用 `/my-component`, 只需要将整个文件夹复制过去. 在确保安装了任何扩展依赖(external dependencies), 并且已经在配置中定义过相同的 loader, 那么项目应该能够良好运行.

但是, 如果你无法使用新的开发方式, 只能固定于旧有的开发方式. 或者有一些多个组件之间共享的资源. 你仍然可以将这些资源存储在公共目录(base directory)中, 甚至配合使用 alias 来使它们更方便 `import 导入`.

# 4. 管理输出

目前为止, 我们在 `index.html`文件中手动引入所有资源, 然而随着应用程序的增长, 并且一旦开始对文件名使用 hash 并输出多个 bundle时, 手动对 `index.html`文件进行管理将会变得困难起来. 此时可以通过一些插件使这个过程更容易操控.

## 4.1 设定 HtmlWebpackPlugin

首先安装插件:

```bash
npm i -D html-webpack-plugin
```

调整 webpack.config.js:

```diff
  const path = require('path');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
+   plugins: [
+     new HtmlWebpackPlugin({
+       title: 'Output Management'
+     })
+   ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

之时再使用 webpack 构建, `dist/index.html`将会被 `HtmlWebpackPlugin`生成的 `index.html`文件覆盖. 所有的 bundle 会自动添加到插件生成的新的 html中.

## 4.2 清理 `/dist`文件夹

`/dist`文件夹会随着时间的推移变的相当杂乱, 通常在每次构建前都会先清理 `/dist`文件夹, 这是比较推荐的做法. clean-webpack-plugin 是一个比较普及的管理插件.

```bash
npm i -D clean-webpack-plugin
```

webpack.config.js

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
+ const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;

  module.exports = {
    entry: {
      app: './src/index.js',
      print: './src/print.js'
    },
    plugins: [
+     new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'Output Management'
      })
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

## 4.3 Manifest

webpack 及其插件是通过 manifest 来对 「你的模块映射到输出 bundle 的过程」保持追踪的.

通过使用 WebpackManifestPlugin 可以直接将数据提到到一个 json 文件, 以供使用.

```bash
npm i -D webpack-manifest-plugin
```

# 5. 开发

> 这一节使用的工具仅限用于开发环境, **不要**在生产环境中使用它们.

## 5.1 使用 source map

在 webpack 打包源代码时, 可能会很难追踪到错误和警告在源代码中的原始位置. 例如: 如果将三个源文件(`a.js`, `b.js`和 `c.js`)打包到一个 bundle (`bundle.js`)中, 而其中一个源文件包含一个错误, 那么堆栈跟踪就会简单地指向到 `bundle.js`. 这通常并没有太多帮助, 因为你可能需要准确地知道错误来自于哪个源文件.

为了更容易地追踪错误和警告, JavaScript 提供了 source map 功能, 将编译后的代码映射回原始源代码. 如果一个错误来自于 `b.js`, source map 就会明确的告诉你.

source map 有很多不同的选项可用.

开发环境中我们使用 `inline-source-map`选项.

webpack.config.js

```diff
+   devtool: 'inline-source-map',
```

src/print.js

```diff
  export default function printMe() {
-   console.log('I get called from print.js!');
+   cosnole.error('I get called from print.js!');
  }
```

此时在最终生成的页面中, 点击按钮, 控制台中的错误将包含发生错误的文件(`print.js`)和行号(2)信息.

## 5.2 选择一个开发工具

> 一些文本编辑器具有"安全写入"功能, 可能会干扰以下某些工具.

每次要编译代码时, 手动输入命令并运行就会变得很麻烦.

webpack 中有几个不同的选项, 可以在代码发生变化后自动编译代码:

1. webpack's Watch Mode
2. webpack-dev-server
3. webpack-dev-middleware

## 5.3 使用观察模式 (Watch Mode)

你可以指示 webpack "watch" 当目录中有文件被更新时, 代码将重新编译.

```bash
npx webpack --watch
```

此时, 修改项目目录下的文件, webpack 将自动重新编译.

> 目前有二个情况待解决:
>
> 1. clean-webpack-plugin 只在第一次执行时触发, 后续的自动重新编译并不会清理 dist 目录.(这个其实也正常, 在开发过程中并不需要频繁清理)
> 2. html-webpack-plugin 生成的 html, 在后续自动重新编译时被清理了???

这时, 有一个缺点就是如果要查看修改后的效果, 还需要刷新浏览器. 这时候就可以尝试使用 webpack-dev-server, 它会自动刷新浏览器.

## 5.4 使用 webpack-dev-server

webpack-dev-server 提供了一个简单的 web 服务器, 并且能够实时重新加载 (live reloading)

```bash
npm i -D webpack-dev-server
```

修改 webpack.config.js 告诉开始服务器(dev server), 在哪里查找文件.

```diff
+   devServer: {
+     contentBase: './dist'
+   },
```

在命令行中运行:

```bash
npx webpack-dev-server --open
```

此时浏览器会自动加载页面, 如果修改并保存任意源文件, web 服务器就会自动重新加载编译后的代码.

## 5.5 使用 webpack-dev-middleware

`webpack-dev-middleware`是一个容器(wrapper), 它可以把 webpack 处理后的文件传递给一个服务器(server). `webpack-dev-server`在内部使用了它. 同时, 它也可以作为一个单独的包使用, 以便进行更多自定义设置来实现更多需求. 接下来是一个 `webpack-dev-middleware`配合 `express`的示例.

```bash
npm i -D express webpack-dev-middleware
```

webpack.config.js

```diff
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
+     publicPath: '/'
    }
```

增加 publicPath 会在服务器脚本中用到.

server.js

```javascript
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config');
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath, // 这里就是在 webpack.config.js 中指定的publicPath
  })
);

app.listen(3456, () => {
  console.log('Express listening on port 3456!\n');
});

```

最后执行:

```bash
node server.js
```

此时 express 创建的服务器将会输出 webpack 编译后的内容. 此时修改源代码, webpack 也会自动重新编译. 刷新浏览器后就能看到变化.

## 5.6 调整文本编辑器

使用自动编译代码时, 可能会在保存文件时遇到一些问题. 某些编辑器具有"安全写入"功能, 可能会影响重新编译.

- **Sublime Text 3**: 在用户首选项(user preferences)中添加 `atomic_save: "false"`.
- **IntelliJ**: 在首选项(preferences)中使用搜索, 查找到 "safe write"并且禁用它.
- **Vim**: 在设置(settings)中增加 `:set backupcopy=yes`.
- **WebStorm**: 在 `Preferences > Appearance & Behavior > System Settings`中取消选中 Use "safe write".

# 6. 模块热替换

模块热替换(Hot Module Replacement 或 HMR)是 webpack 提供的最有用的功能之一. 它允许在运行时更新各种模块, 而无需进行完全刷新.

> HMR 不适用于生产环境.

## 6.1 启用 HMR

启用此功能实际上相当简单, 就是更新 webpack-dev-server 的配置, 和使用 webpack 内置的 HMR 插件.

> 如果使用了 webpack-dev-middleware, 而没有使用 webpack-dev-server, 请使用 ***webpack-hot-middleware*** package 包, 以在你的自定义服务或应用程序上使用 HMR.

webpack.config.js

```diff
  const path = require('path');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const webpack = require('webpack');

  module.exports = {
    entry: {
-      app: './src/index.js',
-      print: './src/print.js'
+      app: './src/index.js'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
+     hot: true
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Hot Module Replacement'
      }),
+     new webpack.NamedModulesPlugin(), // 已经废弃
+     new webpack.HotModuleReplacementPlugin()
    ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };
```

index.js

```diff
  import _ from 'lodash';
  import printMe from './print.js';

  function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
  }

  document.body.appendChild(component());
+
+ if (module.hot) {
+   module.hot.accept('./print.js', function() {
+     console.log('Accepting the updated printMe module!');
+     printMe();
+   })
+ }
```

运行

```bash
npx webpack-dev-server --open
```

之后, 修改 `print.js` 文件, 将会触发 `index.js`中相关的更新方法(`module.hot.accept(...)`).

## 6.2 通过 Node.js API

当同时使用 webpack dev server 和 Node.js API 时, 不要将 dev server 选项放在 webpack 配置对象(webpack config object)中. 而是, 在创建选项时, 将其作为第二个参数传递.

```javascript
new WebpackDevServer(compiler, options);
```

想要启用 HMR, 还需要修改 webpack 配置对象, 使其包含 HMR 入口起点. `webpack-dev-server`package 中具有一个叫做 `addDevServerEntrypoints`的方法, 可以通过这个方法来实现.

## 6.3 问题

之前模块热替换只是加载了新的代码, 但是点击页面上的按钮, 会发现控制台输出的还是旧的功能. 这是因为按钮的 `onclick`事件仍然绑定在旧的函数上. 为了让它与 HMR 正常工作, 还需要在 `module.hot.accept`中更新绑定到新的函数上.

index.js

```diff
  import _ from 'lodash';
  import printMe from './print.js';

  function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;  // onclick 事件绑定原始的 printMe 函数上

    element.appendChild(btn);

    return element;
  }

- document.body.appendChild(component());
+ let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
+ document.body.appendChild(element);

  if (module.hot) {
    module.hot.accept('./print.js', function() {
      console.log('Accepting the updated printMe module!');
-     printMe();
+     document.body.removeChild(element);
+     element = component(); // 重新渲染页面后，component 更新 click 事件处理
+     document.body.appendChild(element);
    })
  }
```

## 6.4 HMR 修改样式表

借助于 `style-loader`的帮助, CSS模块热替换实际上是相当简单的. 当更新 CSS 依赖模块时, 此 loader 会在后台使用 `module.hot.accept`来修补(patch) `<style>`标签.

## 6.5 其他代码和框架

- [React Hot Loader](https://github.com/gaearon/react-hot-loader): 实时调整 react 组件.
- [Vue Loader](https://github.com/vuejs/vue-loader): 此 loader 支持用于 vue 组件的 HMR, 提供开箱即用体验.
- [Elm Hot Loader](https://github.com/fluxxu/elm-hot-loader): 支持用于 Elm 程序语言的 HMR.
- [Redux HMR](https://survivejs.com/webpack/appendices/hmr-with-react/#configuring-hmr-with-redux): ~~无需 loader 或插件, 只需对 main store 文件进行简单的修改.~~(已合并到 React Hot Loader)
- [Angular HMR](https://github.com/PatrickJS/angular-hmr): 没有必要使用 loader! 只需对主要的 NgModule 文件进行简单的修改, 由 HMR API 完全控制.