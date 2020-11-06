const iterator = {
  [Symbol.iterator]() {
    let pre = 0,
      cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return { done: false, value: cur };
      },
    };
  },
};

for (const n of iterator) {
  if (n > 1000) break;
  console.log(n);
}

const str = '\u{20BB7}';

console.log(str.codePointAt(0));

const set = new Set();
set.add('A').add('B');

const target = () => 'I am the target';
const handler = {
  apply: (receiver, ...args) => 'I am the proxy',
};
const p = new Proxy(target, handler);
console.log(p());

function factorial(n, acc = 1) {
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc);
}
console.log(factorial(1000000));
