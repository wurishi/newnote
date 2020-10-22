const webpack = require('webpack');
const HP = require('html-webpack-plugin');
const path = require('path');

module.exports = webpack({
  entry: './1.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new HP({
      template: path.resolve(__dirname, '../template.html'),
    }),
  ],
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist',
  },
  externals: ['pixi.js'],
  devServer: {
    open: true,
    port: 9000,
    contentBase: path.join(__dirname, '../'),
  },
}).options;
