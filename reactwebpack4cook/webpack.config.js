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
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_module/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [],
  devServer: {},
}).options;
