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
