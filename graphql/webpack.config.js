const webpack = require('webpack');
const HP = require('html-webpack-plugin');

module.exports = webpack({
  entry: './1.js',
  plugins: [new HP()],
}).options;
