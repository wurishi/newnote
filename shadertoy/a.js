const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'subs'), (err, files) => {
  // files.forEach((f) => {

  // });
  const file = path.join(__dirname, 'subs', files[0]);
  fs.readFile(file, 'utf-8', (err, fc) => {
    let index = fc.indexOf('sort() {');
    if (index >= 0) {
      index = fc.indexOf('return ', index);
      if (index > 0) {
        const li = fc.indexOf(';', index);
        let sort = +fc.substring(index + 7, li);
        if(sort>100 && sort<=200) {
          // fs.copyFile
        }
      }
    }
  });
});
