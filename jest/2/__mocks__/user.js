const m = jest.createMockFromModule('./user');

m.getUser = function getUser() {
  return {
    name: 'User',
    isMock: true,
  };
}

module.exports = m;