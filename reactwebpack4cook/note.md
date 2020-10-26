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

