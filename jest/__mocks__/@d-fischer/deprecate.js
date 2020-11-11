const m = jest.createMockFromModule('@d-fischer/deprecate');

m.deprecate = jest.fn().mockReturnValue('Hello');

export default m.deprecate;
