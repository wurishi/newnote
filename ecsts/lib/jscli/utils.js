function objectEntries(obj) {
  let index = 0;
  const propKeys = Reflect.ownKeys(obj || {});

  return {
    [Symbol.iterator]() {
      return this;
    },
    next() {
      if (index < propKeys.length) {
        const key = propKeys[index++];
        return { value: [key, obj[key]] };
      } else {
        return { done: true };
      }
    },
  };
}

function* g_objectEntries(obj) {
  const keys = Object.keys(obj);
  for (let i = 0, len = keys.length; i < len; i++) {
    const key = keys[i];
    yield [key, obj[key]];
  }
}

module.exports = {
  objectEntries,
  g_objectEntries,
};
