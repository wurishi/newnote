module.exports = function (api) {
  api.cache(true);

  const presets = [];
  const plugins = [
    // ['@babel/plugin-transform-arrow-functions', { spec: true }], //
    // ['@babel/plugin-transform-block-scoping', { tdz: true }],
    ['@babel/plugin-transform-classes', { losse: true }],
  ];
  // const plugins = [];

  return {
    presets,
    plugins,
  };
};
