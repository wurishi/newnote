module.exports = {
  files: {
    javascripts: {
      joinTo: 'app.js',
    },
    stylesheets: {
      joinTo: 'app.css',
    },
  },
  modules: {
    autoRequire: {
      'app.js': ['app'],
    },
  },
};
