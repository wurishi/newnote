import { autorun, observable, untracked } from 'mobx';

const person = observable({
  firstName: 'Xu',
  lastName: 'Leon',
});

autorun(() => {
  console.log(
    person.lastName,
    ',',
    // 在不建立依赖的情况下返回 person.firstName
    untracked(() => person.firstName)
  );
});
// 输出: Leon , Xu

person.firstName = 'G.G.';
// 不输出

person.lastName = 'Sheldon';
// 输出: Sheldon , G.G.