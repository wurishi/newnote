import { autorun } from 'mobx';
import { fromResource } from 'mobx-utils';
import * as mobxUtils from 'mobx-utils';

function createObservableUser(name = 'NAME') {
  let timer;

  return fromResource(
    (sink) => {
      sink(name);
      timer = setInterval(() => {
        sink(name + Math.random());
      }, 1000);
    },
    () => {
      timer && clearInterval(timer);
    }
  );
}

const myUser = createObservableUser();

const start = Date.now();

autorun(() => {
  console.log(myUser.current());
  console.log((mobxUtils.now() - start) / 1000);
});
