const fs = require('fs');
const liquid = require('liquid.coffee');
const path = require('path');
const mkdirp = require('mkdirp');
const { JSDOM } = require('jsdom');
const config = require(`${process.cwd()}/entitas.json`);

function run(type, name, ...args) {
  switch (type) {
    case 'e':
    case '-e':
    case '--entity':
      entity(name, ...args);
      break;
    case 'c':
    case '-c':
    case '--component':
      component(name, ...args);
      break;
    case 's':
    case '-s':
    case '--system':
      system(name, ...args);
      break;
    case 'x':
    case '-x':
    case '--extension':
      extension(name, ...args);
      break;
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
  config.systems[name] = args.length > 0 ? args : true;
  updateEntitas(config);

  generateSystemTemplate(name, args);
  updateProject(name);
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

function generateSystemTemplate(name, interfaces) {
  interfaces = interfaces || [];
  const tpl = liquid.Template.parse(
    fs.readFileSync(
      path.join(__dirname, './liquid/system.template.ts.liquid'),
      'utf-8'
    )
  );
  const content = tpl.render({
    namespace: config.namespace,
    implements:
      interfaces.length > 0 ? ' implements ' + interfaces.join(', ') : '',
    interfaces,
    name,
  });
  mkdirp.sync(`${process.cwd()}/${config.src}/systems`);
  fs.writeFileSync(
    `${process.cwd()}/${config.src}/systems/${name}.ts`,
    content
  );
}

function updateProject(name) {
  const tsconfig = JSON.parse(
    fs.readFileSync(`${process.cwd()}/tsconfig.json`, 'utf8')
  );
  tsconfig.files = tsconfig.files || [];
  if (tsconfig.files.indexOf(`${config.src}/systems/${name}.ts`) < 0) {
    tsconfig.files.push(`${config.src}/systems/${name}.ts`);
    fs.writeFileSync(
      `${process.cwd()}/tsconfig.json`,
      JSON.stringify(tsconfig, null, 2)
    );
  }

  // const idom = new JSDOM(
  //   fs.readFileSync(`${process.cwd()}/index.html`, 'utf-8')
  // );
  // if (
  //   [...idom.window.document.head.querySelectorAll('script')].findIndex(
  //     (el) => el.src == ''
  //   ) < 0
  // ) {
  //   const snode = idom.window.document.createElement('script');
  //   snode.src = `${config.src}/systems/${name}.ts`;
  //   idom.window.document.head.appendChild(snode);
  // }
  // fs.writeFileSync(`${process.cwd()}/index.html`, idom.serialize());
}

module.exports.run = run;
