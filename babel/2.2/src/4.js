const foo = '_foo';
const bar = '_bar';

// const obj = {
//   ['x' + foo]: 'heh',
//   ['y' + bar]: 'noo',
//   foo,
//   bar,
// };

// console.log(obj);

var _obj;
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true,
    });
  } else {
    obj[key] = value;
  }
  return obj;
}
var obj =
  ((_obj = {}),
  _defineProperty(_obj, 'x' + foo, 'heh'),
  _defineProperty(_obj, 'y' + bar, 'noo'),
  _defineProperty(_obj, 'foo', foo),
  _defineProperty(_obj, 'bar', bar),
  _obj);

console.log(obj);
