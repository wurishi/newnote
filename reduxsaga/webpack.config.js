const webpack = require('webpack');
const HP = require('html-webpack-plugin');
const path = require('path');

module.exports = webpack({
  entry: {
    '01-01': './01-01/main.js',
  },
  devServer: {
    open: true,
    port: 9000,
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dist/dll/main.manifest.json'),
    }),
    new HP({
      template: './index.html',
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}).options;
