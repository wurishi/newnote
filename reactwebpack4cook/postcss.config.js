const autoprefixer = require('autoprefixer');
module.exports = {
  plugins: [
    autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'not ie <= 10'],
    }),
  ],
};
