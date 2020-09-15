const { readFile } = require('fs');

const fileNames = process.argv.slice(2);

console.log(fileNames, readFile);

function run(genFunc) {
  const genObj = genFunc();

  genObj.next();

  const nextFunc = createNextFunction(genObj);
  genObj.next(nextFunc);
}

/**
 * Node.js 回调约定 (error, result) => {}
 * @param {*} genObj 
 */
function createNextFunction(genObj) {
  return function (error, result) {
    if (error) {
      genObj.throw(error);
    } else {
      genObj.next(result);
    }
  };
}

run(function* () {
  const next = yield;
  try {
    for (let f of fileNames) {
      const contents = yield readFile(f, { encoding: 'utf8' }, next);
      console.log('---------------', f);
      console.log(contents);
    }
  } catch (error) {
    console.log('ERR:', error);
  }
});
