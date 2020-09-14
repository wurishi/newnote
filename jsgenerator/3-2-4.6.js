function chain(...generatorFuncs) {
  if (generatorFuncs.length < 1) {
    throw new Error('至少需要1个参数');
  }
  let genObj = generatorFuncs[generatorFuncs.length - 1]();
  genObj.next();
  for (let i = generatorFuncs.length - 2; i >= 0; i--) {
    const genFunc = generatorFuncs[i];
    genObj = genFunc(genObj);
    genObj.next();
  }
  return genObj;
}

const createReadStream = require('fs').createReadStream;

function readFile(fileName, target) {
  const readStream = createReadStream(fileName, {
    encoding: 'utf8',
    bufferSize: 1024,
  });
  readStream.on('data', (buffer) => {
    const str = buffer.toString('utf8');
    target.next(str);
  });
  readStream.on('end', () => {
    target.return();
  });
}

function* splitLines(target) {
  let previous = '';
  try {
    while (true) {
      previous += yield; // 从 readStream 获得数据流
      let eolIndex;
      while ((eolIndex = previous.indexOf('\n')) >= 0) {
        const line = previous.slice(0, eolIndex);
        target.next(line); // 传给 numberLines
        previous = previous.slice(eolIndex + 1);
      }
    }
  } finally {
    if (previous.length > 0) {
      target.next(previous);
    }
    target.return();
  }
}

function* numberLines(target) {
  try {
    for (let lineNo = 0; ; lineNo++) {
      let line = yield; // 从 splitLines 获得 line
      target.next(`${lineNo}: ${line}`);
    }
  } finally {
    target.return();
  }
}

function* printLines() {
  while (true) {
    let line = yield; // 从 numberLines 获得 lineNo: line
    console.log(line);
  }
}

const fileName = process.argv[2] || '3-2-4.6.js';
readFile(fileName, chain(splitLines, numberLines, printLines));
