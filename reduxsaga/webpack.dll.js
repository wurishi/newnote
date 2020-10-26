const webpack = require('webpack');
const path = require('path');

module.exports = webpack({
  entry: ['redux', 'react', 'redux-saga', 'react-dom'],
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_dll_[hash]',
      path: path.join(__dirname, 'dist', 'dll', '[name].manifest.json'),
    }),
  ],
  output: {
    filename: '[name].dll.js',
    path: path.join(__dirname, 'dist', 'dll'),
    library: '[name]_dll_[hash]',
  },
}).options;
