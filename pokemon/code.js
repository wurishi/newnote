const fs = require('fs');
const path = require('path');

const codeStr = fs.readFileSync(path.join(__dirname, 'code.csv'), 'utf-8');
const codeJSON = {};
codeStr.split('\n').forEach((line) => {
  const arr = line.split(',');
  const len = arr.length;
  for (let i = 0; i < len; i += 4) {
    const id = arr[i + 0];
    const chName = (arr[i + 1] + '').replace('\r', '').trim();
    const enName = (arr[i + 2] + '').replace('\r', '').trim();
    if (!id) {
      continue;
    }
    const num = Number(id.substring(1));
    if (!num) {
      console.log(id);
    }
    codeJSON[num] = {
      ch: chName,
      en: enName,
    };
  }
});
fs.writeFileSync(
  path.join(__dirname, 'code.json'),
  JSON.stringify(codeJSON),
  'utf-8'
);
