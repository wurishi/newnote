const webpack = require('webpack');
const HP = require('html-webpack-plugin');
const path = require('path');
const fs = require('fs');

const configList = [];

const { options } = webpack({
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
    path: path.resolve(__dirname, 'dist') + '/[name]',
  },
  externals: ['pixi.js'],
  devServer: {
    open: true,
    port: 9000,
    contentBase: __dirname,
  },
});

fs.readdirSync(__dirname).forEach((file) => {
  if (file.endsWith('.ts')) {
    const lastIndex = file.lastIndexOf('.ts');
    // entry[file.substr(0, lastIndex)] = path.join(__dirname, file);
    const name = file.substr(0, lastIndex);
    configList.push({
      ...options, //
      entry: path.join(__dirname, file),
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist', name),
      },
    });
  }
});
// console.log(entry);

// console.log(configList);

module.exports = configList;
