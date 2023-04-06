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
  const outputs = [];
  const files = await createNodePromise(fs.readdir, searchFolder, 'utf-8');
  for (let i = 0, len = files.length; i < len; i++) {
    const file = files[i];
    if (!file.includes('_')) {
      const arr = file.split('.');
      const newName = arr[0] + '_' + crc32(arr[0]) + '.json';
      let exist = true;
      try {
        await createNodePromise(
          fs.access,
          path.join(targetFolder, newName),
          fs.constants.F_OK
        );
      } catch (error) {
        exist = false
      }
      if (exist) {
        continue;
      }
      await createNodePromise(
        fs.copyFile,
        path.join(searchFolder, file),
        path.join(targetFolder, newName)
      );
      const raw = await createNodePromise(
        fs.readFile,
        path.join(searchFolder, file),
        'utf-8'
      );
      const json = JSON.parse(raw);
      outputs.push(`'${arr[0]}': \`${json?.info?.name}\``);
    }
  }
  if (outputs.length > 0) {
    console.log(outputs.join(',\n'));
  } else {
    console.log('没有找到新的配置文件');
  }

}

main();
