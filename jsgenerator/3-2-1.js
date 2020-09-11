function* objectEntries(obj) {
  const propKeys = Reflect.ownKeys(obj);

  for (let key of propKeys) {
    yield [key, obj[key]];
  }
}

for (const [key, value] of objectEntries({ first: 1, last: 2 })) {
  console.log(key, value);
}
