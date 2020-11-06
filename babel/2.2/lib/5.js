const z = {
  a: 100,
  name: 'Z'
};
const { ...x
} = z;
const y = { ...z
};
const {
  name
} = z;
z.a = 200;
console.log(x);
console.log(y);
console.log(name);