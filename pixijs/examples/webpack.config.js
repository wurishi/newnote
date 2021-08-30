const webpack = require('webpack');
const HP = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');

const { options } = webpack({
  entry: path.join(__dirname, 'src', 'index.ts'),
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
      template: path.resolve(__dirname, 'template.html'),
    }),
  ],
  output: {
    filename: 'bundle.js',
    // path: path.resolve(__dirname, 'dist') + '/[name]',
  },
  externals: ['pixi.js'],
  devServer: {
    open: true,
    port: 9000,
    contentBase: path.resolve(__dirname, 'dist'),
  },
  mode: 'production',
});

module.exports = options;
