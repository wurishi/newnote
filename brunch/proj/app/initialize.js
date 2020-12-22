import 'babel-polyfill';

document.addEventListener('DOMContentLoaded', () => {
  // do your setup here
  console.log('Initialized app');

  for (const str of gFn()) {
    console.log(str);
  }
});

// async function fc() {
//   await new Promise((r) => setTimeout(r, 1000));
//   console.log('hehe');
// }

function* gFn() {
  yield 'hello';
  yield 'world';
}
