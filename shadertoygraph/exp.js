const fs = require('fs');
const path = require('path');
const crc32 = require('crc32');

function createNodePromise(nodeFunction, ...args) {
  return new Promise((resolve, reject) => {
    nodeFunction.apply(null, [
      ...args,
      (err, files) => {
        if (err) {
          reject(err);
        }
        resolve(files);
      },
    ]);
  });
}

const searchFolder = path.join(__dirname, 'e');
const targetFolder = path.join(__dirname, 'export');

async function main() {
  try {
    fs.statSync(targetFolder);
  } catch (error) {
    fs.mkdirSync(targetFolder);
  }
  const files = await createNodePromise(fs.readdir, searchFolder, 'utf-8');
  for (let i = 0, len = files.length; i < len; i++) {
    const file = files[i];
    if (!file.includes('_')) {
      const arr = file.split('.');
      await createNodePromise(
        fs.copyFile,
        path.join(searchFolder, file),
        path.join(targetFolder, arr[0] + '_' + crc32(arr[0]) + '.json')
      );
    }
  }
}

main();
