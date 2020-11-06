@annotation
class MyClass {}

function annotation(target) {
  target.annotation = true;
  console.log(target);
}

const my = new MyClass();
console.log(my);
