"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

const iterator = {
  [Symbol.iterator]() {
    let pre = 0,
        cur = 1;
    return {
      next() {
        [pre, cur] = [cur, pre + cur];
        return {
          done: false,
          value: cur
        };
      }

    };
  }

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
  apply: function apply(receiver) {
    return 'I am the proxy';
  }
};
const p = new Proxy(target, handler);
console.log(p());

function factorial(n) {
  let acc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  if (n <= 1) return acc;
  return factorial(n - 1, n * acc);
}

console.log(factorial(1000000));