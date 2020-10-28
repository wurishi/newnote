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
