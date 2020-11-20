module.exports = {
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          'style',
          'css',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('dart-sass'),
            },
          },
        ],
      },
    ],
  },
};
