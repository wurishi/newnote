import { observable, makeObservable, autorun, makeAutoObservable } from 'mobx';

// const depcol = require('./depcol.ts');
// const d2 = require('./2.ts');
require('./6.3.ts');
class Todo {
  id = Math.random();
  @observable title = '';
  @observable finished = false;

  run() {
    this.title = this.id + '_' + Math.random();
  }
}

const todo = new Todo();

class Todo2 {
  id = Math.random();
  title = '';
  finished = false;

  constructor() {
    makeAutoObservable(this);
  }

  run() {
    this.title = this.id + '_' + Math.random();
  }
}

const todo2 = new Todo2();

// setInterval(() => {
//   todo.run();
//   todo2.run();
// }, 1000);

// autorun(() => {
//   console.log(todo.title);
//   console.log(todo2.title);
// });

// const str = observable('abc');
// console.log(str == 'abc');
