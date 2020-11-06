const z = {
  a: 100,
  name: 'Z'
};
const x = Object.assign({}, z);
const y = { ...z
};
const name = z.name;
z.a = 200;
console.log(x);
console.log(y);
console.log(name);