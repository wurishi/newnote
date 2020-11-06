module.exports = function (api) {
  api.cache(true);

  const presets = [];
  const plugins = [
    // ['@babel/plugin-transform-arrow-functions', { spec: true }], //
    // ['@babel/plugin-transform-block-scoping', { tdz: true }],
    // ['@babel/plugin-transform-classes', { loose: true }],
    // ['@babel/plugin-transform-duplicate-keys'],
    // ['@babel/plugin-transform-computed-properties'],
    // ['@babel/plugin-transform-destructuring', { useBuiltIns: true }],
    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
  ];
  // const plugins = [];

  return {
    presets,
    plugins,
  };
};
