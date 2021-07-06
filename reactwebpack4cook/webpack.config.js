const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurifyCSS = require('purifycss-webpack');
const glob = require('glob-all');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
const HappyPack = require('happypack');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = webpack({
  mode: 'production',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    main: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: 'http://cdn.com/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_module/,
        // use: 'babel-loader',
        use: 'happypack/loader?id=threadBabel',
      },
      {
        test: /\.(css|scss|sass)$/,
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader,
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
              implementation: require('sass'),
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              outputPath: 'images/',
              limit: 10 * 1024,
            },
          },
        ],
      },
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
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 最终创建的文件名
      template: path.join(__dirname, 'index.template.html'), // 指定模板
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        BASE_URL: JSON.stringify('http://localhost:9000'),
      },
    }),
    new PurifyCSS({
      paths: glob.sync([
        path.resolve(__dirname, './src/*.html'),
        path.resolve(__dirname, './src/*.js'),
        path.resolve(__dirname, './src/*.jsx'),
        path.resolve(__dirname, './index.template.html'),
      ]),
    }),
    new AddAssetHtmlWebpackPlugin({
      filepath: path.resolve(__dirname, 'dll', 'jquery.dll.js'),
    }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, 'dll', 'jquery-manifest.json'),
    }),
    new HappyPack({
      id: 'threadBabel',
      loaders: ['babel-loader?cacheDirectory'],
      threads: 2,
    }),
    new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  devServer: {
    open: true,
    hot: true,
    contentBase: path.join(__dirname, 'dist'),
    // host: '0.0.0.0',
    port: 9000,
    historyApiFallback: true, // 所有 404 都连接到 index.html
    proxy: {
      // 拦截所有 api 开头的请求地址, 代理到其他地址
      '/api': 'http://localhost:3000',
    },
  },
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
    },
  },
}).options;
