const webpack = require('webpack');
const HP = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const { options } = webpack({
  // entry: ['./1.js', './2.js'],
  entry: {
    1: './1.js',
    2: './2.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HP(), //
  ],
});

module.exports = options;
