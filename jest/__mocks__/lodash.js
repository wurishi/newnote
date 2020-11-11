const m = jest.createMockFromModule('lodash');
m.add = function (a, b) {
  return a + '' + b;
};

module.exports = m;
