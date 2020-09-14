function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`);
  console.log(`2. ${yield}`);
  return 'result';
}

const genObj = dataConsumer();
genObj.next();
genObj.next('a');
console.log(genObj.next('b'));

function coroutine(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}

const wrapped = coroutine(function* () {
  while (true) {
    const x = yield;
    if (x === 'DONE') {
      return x;
    }
    console.log('input: ' + x);
  }
});

const it = wrapped();
console.log(it.next('Hello'));
console.log(it.next('World'));
console.log(it.next('DONE'));
console.log(it.next('DONE'));

// !(function () {
//   const fn = function* () {
//     const x = 'Hello' + yield;
//   };
// })();

!(function () {
  console.log('return--------');

  function* genFunc1() {
    try {
      console.log('Started');
      yield;
      console.log('A Exiting');
    } finally {
      console.log('B Exiting');
    }
  }

  const genObj1 = genFunc1();
  console.log(genObj1.next());
  console.log(genObj1.return('Result'));

  function* genFunc2() {
    try {
      console.log('Started');
      yield;
    } finally {
      yield 'Not done, yet!';
    }
  }
  const genObj2 = genFunc2();
  console.log(genObj2.next());
  console.log(genObj2.return('Result'));
  console.log(genObj2.next());

  function* genFunc() {}
  console.log(genFunc().return('yes'));
})();

!(function () {
  console.log('Error');

  function* genFunc2() {
    console.log('Started');
    yield;
  }

  const genObj2 = genFunc2();
  console.log(genObj2.next());
  console.log(genObj2.throw(new Error('Problem!')));
})();
