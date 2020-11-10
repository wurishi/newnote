/// <reference path="../node_modules/@types/jest/index.d.ts" />

it('snap correctly', () => {
  const tree = `<div>
  <h1>标题 title</h1>
  </div>`;
  expect(tree).toMatchSnapshot();
});

test('snap test', () => {
  const tree = `<div>
  <h2>Hello World</h2>
  </div>`;
  expect(tree).toMatchSnapshot();
});

// test('snap test2', () => {
//   const tree = '<hr />';
//   expect(tree).toMatchInlineSnapshot();
// });

test('snap Math.random', () => {
  const obj = {
    name: 'Bee',
    id: Math.random(),
  };
  expect(obj).toMatchSnapshot({
    id: expect.any(Number),
  });
});
