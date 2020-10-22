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
    contentBase: path.resolve(__dirname, 'dist'),
  },
});

const links = [];

fs.readdirSync(path.join(__dirname, 'src')).forEach((file) => {
  if (file.endsWith('.ts')) {
    const lastIndex = file.lastIndexOf('.ts');
    // entry[file.substr(0, lastIndex)] = path.join(__dirname, file);
    const name = file.substr(0, lastIndex);
    configList.push({
      ...options, //
      entry: path.join(__dirname, 'src', file),
      output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist', name),
      },
    });
    links.push(`./${name}/index.html`);
  }
});
// console.log(entry);

fs.writeFile(
  path.join(__dirname, 'dist', 'index.html'),
  `
<html></html>
<body>${links
    .map((link) => '<a href="' + link + '" >' + link + '</a>')
    .join('<br />')}</body>
`,
  () => {}
);

// console.log(configList);

module.exports = configList;
