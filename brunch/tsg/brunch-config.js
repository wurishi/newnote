module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'js/app.js': /^app/,
        'js/vendor.js': /^(?!app)/,
      },
    },
    stylesheets: {
      joinTo: {
        'css/app.css': /^app/,
        'css/vendor.css': /^node_modules/,
      },
    },
  },
  modules: {
    autoRequire: {
      'js/app.js': ['babylonjs'],
    },
  },
  npm: {
    styles: {
      'hover.css': ['css/hover.css'],
    },
  },
};
