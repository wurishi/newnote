import { autorun, observable } from 'mobx';

const obj = {
  a: '100',
  b: '200',
  arr: [[], 1, 2, 3],

  hi() {
    console.log(this.a, this.b, this.arr[0].length);
  },
};

const o = observable(obj, { arr: observable.ref });

autorun(() => {
  o.hi();
});

o.a = 'str';

(o.arr[0] as any[]).push(0);

o.b = 'world';
