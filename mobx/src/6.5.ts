import { autorun } from 'mobx';
import { fromPromise } from 'mobx-utils';

const fetch = (url: string) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(url);
    }, 3000);
  });

const fetchResult = fromPromise(fetch('www.baidu.com'));

fetchResult.case({
  pending(stateValue) {
    return stateValue || '';
  },
  fulfilled(value) {
    return value;
  },
  rejected(error) {
    return error;
  },
});

autorun(() => {
  console.log(fetchResult.state, fetchResult.value);
});
