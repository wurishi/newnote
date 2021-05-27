const fs = require('fs');
const path = require('path');
const liquid = require('liquid.coffee');

/**
 *
 * @param {String} namespace
 * @param {String} flag
 * @param {String} type none/bin/default
 * @returns
 */
function run(namespace, flag, type) {
  flag = flag || '-t';
  type = type || 'none';

  let tpl = liquid.Template.parse(
    fs.readFileSync(
      path.join(__dirname, './liquid/entitas.json.liquid'),
      'utf-8'
    )
  );
  const content = tpl.render({ namespace });

  // let content = `
  // {
  //   "namespace": "${namespace}",
  //   "src": "lib/src",
  //   "output": {
  //     "javascript": "web/src/${namespace}/generatedExtensions.js",
  //     "typescript": "lib/src/generatedComponents.ts",
  //     "declaration": "lib/ext/${namespace}.d.ts"
  //   },
  //   "alloc": {
  //     "entities": 128,
  //     "components": 64
  //   },
  //   "components": {

  //   },
  //   "systems": {

  //   },
  //   "entities": {

  //   }
  // }
  // `;

  if (type === 'none') {
    fs.writeFileSync(`${process.cwd()}/entitas.json`, content);
    return;
  }

  return;

  // const bin = `
  // {
  //   "namespace": "${namespace}",
  //   "src": "src",
  //   "output": {
  //     "systems": "Systems"
  //   },
  //   "alloc": {
  //     "entities": 128,
  //     "components": 64
  //   },
  //   "components": {

  //   },
  //   "systems": {

  //   },
  //   "entitie": {

  //   }
  // }`;
  // if (type === 'bin') {
  //   fs.writeFileSync(`${process.cwd()}/entitas.json`, bin);
  //   return;
  // }

  // // template folder
  // const tf = path.join(__dirname, '../cli', 'tpl', type);
  // let tpl = liquid.Template.parse(
  //   fs.readFileSync(`${tf}/entitas.json`, 'utf-8')
  // );
  // content = tpl.render({ namespace });
  // const config = JSON.parse(content);
  // fs.writeFileSync(`${process.cwd()}/entitas.json`, content);
  // console.log(`${type}:config ${process.cwd()}/entitas.json`);

  // if (!fs.existsSync(`${process.cwd()}/tsconfig.json`)) {
  //   tpl = liquid.Template.parse(
  //     fs.readFileSync(`${tf}/tsconfig.json`, 'utf-8')
  //   );
  //   const tsconfig = JSON.parse(tpl.render({ namespace }));
  //   tsconfig.files = [];
  //   fs.writeFileSync(
  //     `${process.cwd()}/tsconfig.json`,
  //     JSON.stringify(tsconfig, null, 2)
  //   );
  // }

  // const cfg = JSON.parse(fs.readFileSync(`${tf}/tsconfig.json`, 'utf-8'));
  // for (const file of cfg.files) {
  //   tpl = liquid.Template.parse(fs.readFileSync(`${tf}/${file}`, 'utf8'));
  //   content = tpl.render({ namespace });
  //   const folder = path.dirname(file);
  //   const base = path.basename(file, '.liquid');
  //   const dir = `${process.cwd()}/${config.src}/${folder}`;
  //   fs.mkdirSync(dir, { recursive: true });
  //   fs.writeFileSync(`${dir}/${base}`, content);
  //   console.log(`${type}:source ${dir}/${base}`);

  //   const tsconfig = JSON.parse(
  //     fs.readFileSync(`${process.cwd()}/tsconfig.json`, 'utf-8')
  //   );
  //   if (tsconfig.files.indexOf(`${config.src}/${folder}/${base}`) < 0) {
  //     tsconfig.files.push(`${config.src}/${folder}/${base}`);
  //     fs.writeFileSync(
  //       `${process.cwd()}/tsconfig.json`,
  //       JSON.stringify(tsconfig, null, 2)
  //     );
  //   }
  // }
}

module.exports.run = run;
