function* tokenize(chars) {
  let iterator = chars[Symbol.iterator]();
  let ch = '';
  do {
    ch = getNextItem(iterator);
    if (isWordChar(ch)) {
      let word = '';
      do {
        word += ch;
        ch = getNextItem(iterator);
      } while (isWordChar(ch));
      yield word;
    }
  } while (ch !== END_OF_SEQUENCE);
}

const END_OF_SEQUENCE = Symbol();
function getNextItem(iterator) {
  const item = iterator.next();
  return item.done ? END_OF_SEQUENCE : item.value;
}
function isWordChar(ch) {
  return typeof ch === 'string' && /^[A-Za-z0-9]$/.test(ch);
}

function* extractNumbers(words) {
  for (let word of words) {
    if (/^[0-9]+$/.test(word)) {
      yield Number(word);
    }
  }
}

function summarize(numbers) {
  let result = 0;
  for (let n of numbers) {
    result += n;
  }
  return result;
}

console.log(summarize(extractNumbers(tokenize('2 apples and 5 oranges.'))));
