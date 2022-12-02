const fs = require('fs');
const path = require('path');

const canStr = fs.readFileSync(path.join(__dirname, 'can.txt'), 'utf-8');

const canJSON = {};
canStr.split('\n').forEach((line) => {
  if (line.startsWith('[Encounter')) {
    const arr = line.split(' ');
    const id = arr.find((word) => word.endsWith('#'));
    if (id) {
      canJSON[id.substring(0, id.length - 1)] = true;
    }
  }
});

fs.writeFileSync(
  path.join(__dirname, 'can.json'),
  JSON.stringify(canJSON),
  'utf-8'
);
