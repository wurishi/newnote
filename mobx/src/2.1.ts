import { autorun, isObservableArray, observable, remove } from 'mobx';

const arr = observable([1, 2, 3]);

autorun(() => {
  console.log(arr.toJSON());
});

remove(arr, 1);
