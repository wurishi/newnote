!(function () {
  function objectEntries(obj) {
    let index = 0;
    const propKeys = Reflect.ownKeys(obj); // IE 全系不支持
    // 与 Object.keys(obj) 一样, 并不会获取原型链上的属性

    return {
      [Symbol.iterator]() {
        return this;
      },
      next() {
        if (index < propKeys.length) {
          const key = propKeys[index++];
          return { value: [key, obj[key]] };
        } else {
          return { done: true };
        }
      },
    };
  }

  class TEST {
    a = 100;
    b = 200;
  }

  let obj = Object.create(new TEST());
  obj = { first: 'hello', last: 'world' };
  for (const [key, value] of objectEntries(obj)) {
    console.log(`${key}: ${value}`);
  }
})();

function take(n, iterable) {
  const iter = iterable[Symbol.iterator]();
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (n > 0) {
        n--;
        return iter.next();
      } else {
        return { done: true };
      }
    },
  };
}

function zip(...iterables) {
  const iterators = iterables.map((i) => i[Symbol.iterator]());
  let done = false;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (!done) {
        const items = iterators.map((i) => i.next());
        done = items.some((item) => item.done);
        if (!done) {
          return { value: items.map((i) => i.value) };
        }
        for (const iterator of iterators) {
          iterator.return && iterator.return();
        }
      }

      return { done };
    },
  };
}

function naturalNumbers() {
  let n = 0;
  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      return { value: n++ };
    },
  };
}

!(function () {
  const arr = ['a', 'b', 'c', 'd'];
  for (let x of take(2, arr)) {
    console.log(x);
  }

  const zipped = zip(['a', 'b', 'c'], [1, 2, 3, 4]);
  for (const x of zipped) {
    console.log(x);
  }
})();

!(function () {
  for (let x of naturalNumbers()) {
    if (x > 2) break;
    console.log(x);
  }

  const [a, b, c] = naturalNumbers();
  console.log(a, b, c);

  console.log('take and naturalNumbers');
  for (let x of take(3, naturalNumbers())) {
    console.log(x);
  }

  const zipped = zip(['一', '二', '三'], naturalNumbers());
  for (let x of zipped) {
    console.log(x);
  }
})();
