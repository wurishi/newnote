function* callee() {
  try {
    yield 'b';
    yield 'c';
  } finally {
    console.log('finally callee');
  }
}
function* caller() {
  try {
    yield 'a';
    yield* callee();
    yield 'd';
  } catch (e) {
    console.log('[caller] ' + e);
  } finally {
    console.log('finally caller');
  }
}

const genObj = caller();
genObj.next(); // value: 'a'
genObj.next(); // value: 'b'
console.log(genObj.throw(new Error('Problem!')));

const [x, y] = caller();
console.log(x, y);

const [z] = caller();
console.log(z);

console.log('-------------------');

function fp(value) {
  return new Promise((r) => {
    setTimeout(() => r(value), 100);
  });
}

function* genFun() {
  const r = yield Promise.all([fp('a'), fp('b'), fp('c')]);
  console.log(r);
}

for (let x of genFun()) {
  console.log('x', x);
}
