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

## 7. 插件 HtmlWebpackPlugin

使用 `CleanWebpackPlugin` 插件后, 往往 `index.html`文件也会被清除, 所以使用 `HtmlWebpackPlugin`插件自动生成 `html`. 使用这个插件的好处是, webpack 会自动将打包好的 js 以 `<script>`的形式插入 html 文件中, 另外还可以指定模板来生成最终的 html 文件.

```bash
npm i -D html-webpack-plugin
```

webpack.config.js

```diff
  const webpack = require('webpack');
  const path = require('path');
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');

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
    new CleanWebpackPlugin(),
+	new HtmlWebpackPlugin({
+		filename: 'index.html', // 最终创建的文件名
+		template: path.join(__dirname, 'index.template.html'), // 指定模板
+	}),
  ],
  devServer: {},
}).options;

```

## 8. 使用 source-map, 对 devtool 进行优化

webpack.config.js

```js
devtool: 'cheap-module-eval-source-map', // 开发环境
devtool: 'cheap-module-source-map', // 线上环境
```

## 9. 使用 WebpackDevServer

```bash
npx webpack-dev-server
```

webpack.config.js

```js
devServer: {
    open: true, // 自动打开浏览器
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    // host: '0.0.0.0',
    port: 9000,
    historyApiFallback: true, // 所有 404 都连接到 index.html
    proxy: {
      // 拦截所有 api 开头的请求地址, 代理到其他地址
      '/api': 'http://localhost:3000',
    },
  }
```

## 10.1 使用 HotModuleReplacement (热模块替换 HMR)

使用了开发环境本地服务器后, 每次修改 `./src`下的内容, 网页会同步刷新, 但是页面的状态无法保存. 如果要实现更改了代码后, 页面仍然保存当前状态, 即实现局部更改, 首先需要用到 `HotModuleReplacementPlugin`插件.

webpack.config.js

```js
devServer: {
    hot: true, // 需要开启
}
plugins: [
    new webpack.HotModuleReplacementPlugin()
]
```

目前状态还没有保存, 还需要使用 react-hot-loader 插件.

## 10.2 react-hot-loader 记录 react 页面状态

```bash
npm i -D react-hot-loader
```

## 11. 编译 css  和 scss

使用 dart-sass 代替 node-sass

```bash
npm i -D css-loader style-loader sass-loader dart-sass
```

webpack.config.js

```js
{
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass'),
            },
          },
        ],
      }
```

## 12. 集成 postcss

```bash
npm i -D postcss-loader postcss-cssnext
```

webpack.config.js

```diff
{
        test: /\.(css|scss|sass)$/,
        use: [
          'style-loader',
          'css-loader',
+          {
+            loader: 'postcss-loader',
+            options: {
+              postcssOptions: {
+                plugins: [require('postcss-cssnext')()],
+              },
+            },
+          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass'),
            },
          },
        ],
      }
```

postcss-cssnext 包含 autoprefixer

cssnano css 压缩

## 13. 处理图片

```bash
npm i -D file-loader url-loader
```

webpack.config.js

```js
{
    test: /\.(png|jpg|jpeg|gif|svg)$/,
    use: [
            {
                loader: 'url-loader',
                options: {
                    outputPath: 'images/', // 图片输出路径
                    limit: 10 * 1024, // 小于这个大小时直接以 base64 编码
                },
            },
        ],
}
```

## 14. 处理字体

webpack.config.js

```js
{
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000,
              publicPath: 'fonts/',
              outputPath: 'fonts/',
            },
          },
        ],
}
```

# 二. webpack 优化

## 1. alias 对文件路径优化

1. extensions: 指定 extensions 后可以不用在 require 或 import 的时候加文件扩展名, webpack 会依次尝试添加扩展名进行匹配.
2. alias: 配置别名可以加快 webpack 查找模块的速度.

```js
resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
}
```

## 2. MiniCssExtractPlugin 抽取 css 文件

如果不做配置, css 是直接打包进 `js`里面, 如果希望单独生成 `css`文件, 就需要使用 `MiniCssExtractPlugin`插件.

```bash
npm i -D mini-css-extract-plugin
```

webpack.config.js

```diff
{
        test: /\.(css|scss|sass)$/,
        use: [
-         'style-loader',
+         MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('postcss-cssnext')()],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass'),
            },
          },
        ],
      }
      
...

plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 最终创建的文件名
      template: path.join(__dirname, 'index.template.html'), // 指定模板
    }),
    new webpack.HotModuleReplacementPlugin(),
+   new MiniCssExtractPlugin({
+     filename: '[name].css',
+     chunkFilename: '[id].css',
+   }),
  ]
```

## 3. 代码分割 (提取公共代码)

webpack.config.js

```js
 optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
```

## 4. 文件压缩

webpack4 只要在生产模式下, 代码就会自动压缩

```js
mode: 'production'
```

## 5. 暴露全局变量

```js
new webpack.ProvidePlugin({
      $: 'jquery', // 代码中, $ 等价于执行过 import $ from 'jquery'
})
```

## 6. 指定环境, 定义环境变量

```js
new webpack.DefinePlugin({
      'process.env': {
        BASE_URL: JSON.stringify('http://localhost:9000'),
      },
})
```

## 7. CSS Tree Shaking

```bash
npm i -D glob-all purify-css purifycss-webpack
```

webpack.config.js

```js
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');

new PurifyCSS({
      paths: glob.sync([
        path.resolve(__dirname, './src/*.html'),
        path.resolve(__dirname, './src/*.js'),
        path.resolve(__dirname, './src/*.jsx'),
        path.resolve(__dirname, './index.template.html'),
      ]),
})
```

## 8. JS Tree Shaking

清除代码中无用的 JS 代码, 只支持 import 引入.

另外, 只有 mode 为 production 时才会生效.

```js
optimization: {
    usedExports: true,
}
```

## 9. DllPlugin 插件打包第三方类库

webpack.dll.config.js

```js
const path = require('path');
const webpack = require('webpack');

const src = path.resolve(process.cwd(), 'src'); // 源码目录
const env =
  process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = webpack({
  mode: 'production',
  entry: {
    jquery: ['jquery'],
  },
  output: {
    path: path.resolve(__dirname, 'dll'),
    filename: '[name].dll.js',
    library: '[name]_[hash]',
    libraryTarget: 'this',
  },
  plugins: [
    new webpack.DllPlugin({
      context: process.cwd(),
      path: path.resolve(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]_[hash]',
    }),
  ],
}).options;
```

安装 `add-asset-html-webpack-plugin`插件, 将打包后的 dll 文件注入到 html 中.

```bash
npm i -D add-asset-html-webpack-plugin
```

webpack.config.js

```diff
+ const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

plugins: [
+   new AddAssetHtmlWebpackPlugin({
+     filepath: path.resolve(__dirname, 'dll', 'jquery.dll.js'),
+   }),
+	new webpack.DllReferencePlugin({
+     manifest: path.resolve(__dirname, 'dll', 'jquery-manifest.json'),
+   }),
]
```

## 10. 使用 happypack 并发执行任务

```bash
npm i -D happypack
```

webpack.config.js

```diff
+ const HappyPack = require('happypack');

rules: [
	{
        test: /\.jsx?$/,
        exclude: /node_module/,
-       use: 'babel-loader',
+       use: 'happypack/loader?id=threadBabel',
      },
]

plugins: [
+	new HappyPack({
+     id: 'threadBabel',
+     loaders: ['babel-loader?cacheDirectory'],
+     threads: 2,
+   })
]
```

## 11. PWA 优化策略

使用 ServiceWorker 将内容缓存, 以实现本地浏览. (一般只在生产环境使用)

```bash
npm i -D workbox-webpack-plugin
```

webpack.config.js

```diff
+ const WorkboxPlugin = require('workbox-webpack-plugin');

plugins: [
+	new WorkboxPlugin.GenerateSW({
+     clientsClaim: true,
+     skipWaiting: true,
+   })
]
```

src/index.js

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('service-worker registed', registration);
      })
      .catch((error) => {
        console.log('service-worker register error', error);
      });
  });
}
```



## 12. 使用静态资源路径 publicPath

```js
output: {
    publicPath: 'http://cdn.com/'
}
```

## 13. 合并提取 webpack 公共配置

一般使用 `webpack-merge` 将开发环境与生产环境相同的配置以及不同的配置分离开.

可参考 build 目录下的 webpack 配置.