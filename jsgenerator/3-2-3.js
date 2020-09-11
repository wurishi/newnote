function* genFuncWithReturn() {
  yield 'a';
  yield 'b';
  return 'The result';
}
function* logReturned(genObj) {
  let result = yield* genObj;
  console.log(result);
}
const arr = [...logReturned(genFuncWithReturn())];
console.log(arr);

class BinaryTree {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  *[Symbol.iterator]() {
    yield this.value;
    if (this.left) {
      yield* this.left;
    }
    if (this.right) {
      yield* this.right;
    }
  }
}

let tree = new BinaryTree(
  'a',
  new BinaryTree('b', new BinaryTree('c'), new BinaryTree('d')),
  new BinaryTree('e')
);
for (let x of tree) {
  console.log(x);
}
