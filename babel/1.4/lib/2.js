"use strict";

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

const generator = {
  [Symbol.iterator]: function* () {
    let pre = 0,
        cur = 1;

    while (true) {
      [pre, cur] = [cur, pre + cur];
      yield cur;
    }
  }
};

for (const n of generator) {
  if (n > 1000) break;
  console.log(n);
}

const target = {};
const handler = {
  get: function get(receiver, name) {
    return "Hello, ".concat(name);
  }
};
const p = new Proxy(target, handler);
console.log(p.world);