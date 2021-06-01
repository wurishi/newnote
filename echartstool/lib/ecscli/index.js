const init = require('./init');
const generate = require('./generate');
const create = require('./create');

module.exports = {
  init(namespace, type) {
    init.run(namespace, '-t', type);
  },
  generate() {
    generate.run();
  },
  create(type, name, ...args) {
    create.run(type, name, ...args);
  },
};

const cmd = process.argv[2];
if (cmd) {
  const params = process.argv.filter((_, i) => i > 2);
  switch (cmd) {
    case 'init':
      module.exports.init(...params);
      break;
    case 'generate':
      module.exports.generate(...params);
      break;
    case 'create':
      module.exports.create(...params);
      break;
    default:
      console.log(`未知的命令: ${cmd}`, process.argv);
  }
}
