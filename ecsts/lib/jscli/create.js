const fs = require('fs');
const config = require(`${process.cwd()}/entitas.json`);

function run(type, name, ...args) {
  switch (type) {
    case '-e':
    case '--entity':
      entity(name, ...args);
      break;
    case '-c':
    case '--component':
      component(name, ...args);
      break;
    case '-s':
    case '--system':
      system(name, ...args);
    case '-x':
    case '--extension':
      extension(name, ...args);
  }
}

function entity(name, ...args) {
  config.entities[name] = true;
  updateEntitas(config);
}

function component(name, ...args) {
  args = args.length > 0 ? args : false;
  config.components[name] = args;
  updateEntitas(config);
}

function system(name, ...args) {
  config.systems[name] = args;
  updateEntitas(config);
}

function extension(name, method, ...args) {
  config.extensions = config.extensions || {};
  config.extensions[name] = config.extensions[name] || {};
  config.extensions[name][method] = args;
  updateEntitas(config);
}

function updateEntitas(config) {
  fs.writeFileSync(
    `${process.cwd()}/entitas.json`,
    JSON.stringify(config, null, 2)
  );
}

module.exports.run = run;
