module.exports = {
  presets: [
    ['mobx'],
    ['@babel/preset-env', { targets: { node: 'current' } }], //
    ['@babel/preset-typescript'],
  ],
};
