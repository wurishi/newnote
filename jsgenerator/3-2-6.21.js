function coroutine(genFunc) {
  return function (...args) {
    const genObj = genFunc(...args);
    genObj.next();
    return genObj;
  };
}

function send(iterable, receiver) {
  for (let x of iterable) {
    receiver.next(x);
  }
  receiver.return();
}

const logItems = coroutine(function* () {
  try {
    while (true) {
      const item = yield;
      console.log(item);
    }
  } finally {
    console.log('DONE');
  }
});

const tokenize = coroutine(function* (receiver) {
  try {
    while (true) {
      let ch = yield;
      if (isWordChar(ch)) {
        let word = '';
        try {
          do {
            word += ch;
            ch = yield;
          } while (isWordChar(ch));
        } finally {
          receiver.next(word);
        }
      }
    }
  } finally {
    receiver.return();
  }
});

function isWordChar(ch) {
  return /^[A-Za-z0-9]$/.test(ch);
}

const extractNumbers = coroutine(function* (receiver) {
  try {
    while (true) {
      let word = yield;
      if (/^[0-9]+$/.test(word)) {
        receiver.next(Number(word));
      }
    }
  } finally {
    receiver.return();
  }
});

const addNumbers = coroutine(function* (receiver) {
  let result = 0;
  try {
    while (true) {
      result += yield;
    }
  } finally {
    receiver.next(result);
    receiver.return();
  }
});

send(
  '2 apples and 5 oranges.',
  tokenize(extractNumbers(addNumbers(logItems())))
);
