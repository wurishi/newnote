import lodash from 'lodash';
import deprecate from '@d-fischer/deprecate';
const getUser = require('./user').getUser;

export function fn1(a, b) {
  return lodash.add(a, b);
}

export function fn2() {
  deprecate('fn2', '已弃用');
}

export function fn3() {
  return getUser();
}
