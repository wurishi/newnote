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

