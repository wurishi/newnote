import { autorun, observable, transaction } from 'mobx';

const numbers = observable([]);

autorun(() => {
  console.log(numbers.length);
});

transaction(() => {
  transaction(() => {
    numbers.push(1);
    numbers.push(2);
  });
  numbers.push(3);
});

// 输出:
// 0
// 3