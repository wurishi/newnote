[link](https://juejin.im/post/6844903862898262024?utm_source=gold_browser_extension#heading-32)

# 一. 基础配置

## 1. init 项目

```bash
npm init
```

## 2. 安装 webpack

```bash
npm i -D webpack@4 webpack-cli@3 webpack-dev-server@3
```

webpack.config.js

```js
const webpack = require('webpack');
const path = require('path');

module.exports = webpack({
  mode: 'development',
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {},
  plugins: [],
  devServer: {},
}).options;
```

## 3. 安装 react 并编写代码

```bash
npm i react react-dom
```

## 4. babel 编译 ES6, JSX 等

```bash
npm i -D babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime @babel/preset-react
```

| 插件名                          | 作用                                     |
| ------------------------------- | ---------------------------------------- |
| @babel/core                     | babel 核心模块                           |
| @babel/preset-env               | 编译 ES6 等                              |
| @babel/preset-react             | 转换 JSX                                 |
| @bable/plugin-transform-runtime | 避免 polyfill 污染全局变量, 减小打包体积 |

```bash
npm i @babel/polyfill @babel/runtime
```

webpack.config.js

```diff
const webpack = require('webpack');
const path = require('path');

module.exports = webpack({
  mode: 'development',
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
+	rules: 
+	[
+		{
+			test: /\.jsx?$/,
+			exclude: /node_module/,
+			use: 'babel-loader',
+		},
+	],
  },
  plugins: [],
  devServer: {},
}).options;

```

新建 .babelrc 文件

```json
{
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": ["@babel/plugin-transform-runtime"]
}
```

## 5. 按需引入 polyfill

在 `./src/index.js`中全局引入 `@babel/polyfill`, 并写入 ES6 语法, 但是这样有一个缺点:

全局引入 `@babel/polyfill`可能会导入代码中不需要的 polyfill, 从而导致包体积过大.

更改 `.babelrc`, 只转译使用到的 ES6 语法:

```bash
npm i core-js@2 @babel/runtime-corejs2
```

.babelrc

```diff
{
  "presets": [
-	"@babel/preset-env",
+	["@babel/preset-env", { "useBuiltIns": "usage" }],
    "@babel/preset-react"
  ],
  "plugins": ["@babel/plugin-transform-runtime"]
}

```

## 6. 插件 CleanWebpackPlugin

使用插件清理 `./dist`目录下的旧版本文件.

```bash
npm i -D clean-webpack-plugin
```

webpack.config.js

```diff
  const webpack = require('webpack');
  const path = require('path');
+ const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = webpack({
  mode: 'development',
  entry: ['./src/index.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_module/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
+	new CleanWebpackPlugin()
  ],
  devServer: {},
}).options;
```

