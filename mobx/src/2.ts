import { autorun, observable } from 'mobx';

console.log('2.ts');

const obj = {
  a: 100,
  b: 200,
};

const tmp = observable(obj);

autorun(() => {
  console.log(tmp.a + tmp.b);
});

tmp.a = 200;

// let str = 'Hello';
// let tmpS = observable(str as any, { proxy: true });
// autorun(() => {
//   console.log('str:', str);
// });

// str = 'World';

const str = 'Hello';
const boxS = observable.box(str);
autorun(() => {
  console.log('str:', boxS.get());
});
boxS.set('World');
