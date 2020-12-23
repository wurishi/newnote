module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'app.js': /^app/,
        'vendor.js': /^(?!app)/,
      },
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
