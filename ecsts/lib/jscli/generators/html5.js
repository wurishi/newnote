const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const liquid = require('liquid.coffee');
const config = require(`${process.cwd()}/entitas.json`);
const { objectEntries } = require('../utils');

const params = (a, sep = ', ') => {
  const b = [];
  for (const item of a) {
    b.push(item.split(':')[0]);
  }
  return b.join(sep);
};

function run(...flags) {
  let tpl;
  const dbg = config.debug || false;
  console.log('debug = ', dbg);

  const ts = [];
  const js = {
    componentNames: [],
    componentIds: [],
    components: {
      c: [],
      c1: [],
      c2: [],
    },
    entities: {
      e1: [],
      e2: [],
    },
    enum: [],
  };
  let d0 = '';
  const d1 = {
    c1: [],
    c2: [],
  };
  const d2 = [];
  const d3 = {
    e1: [],
    e2: [],
  };
  const ex = {}; // or []

  // Header
  // js need create Entitas Generated Classes
  ts.push(`
  /**
   * Entitas Generated Classes for ${config.namespace}
   *
   * do not edit this file
   */
  module ${config.namespace} {
    "use strict";

    import Pool = entitas.Pool;
    import Entity = entitas.Entity;
    import Matcher = entitas.Matcher;
    import ISystem = entitas.ISystem;
    import IMatcher = entitas.IMatcher;
    import IComponent = entitas.IComponent;
  `);

  let id = 0;
  for (const Name in config.components) {
    js.componentNames.push(Name);
    js.componentIds.push([Name, id++]);
  }

  // Components Enum
  ts.push('     export enum CoreComponentIds {');
  for (const Name in config.components) {
    ts.push(`       ${Name},`);
  }
  ts.push(`       TotalComponents
      }

    Entity.initialize(CoreComponentIds.TotalComponents, ${JSON.stringify(
      config.alloc
    )});
  `);

  // Components Class Definitions
  for (const [Name, properties] of objectEntries(config.components)) {
    ts.push(`     export class ${Name}Component implements IComponent {`);
    if (Array.isArray(properties)) {
      for (const p of properties) {
        ts.push(`       public ${p};`);
      }
    }
    ts.push('     }');
  }

  // Components Class Declarations
  tpl = liquid.Template.parse(
    fs.readFileSync(
      path.join(__dirname, '../liquid/d.ts-interface-d0.liquid'),
      'utf-8'
    )
  );
  const components = [];
  for (const [Name, properties] of objectEntries(config.components)) {
    components.push({
      Name,
      properties: Array.isArray(properties) ? properties : [],
    });
  }
  d0 = tpl.render({ components });

  // Extend Entity with components
  for (const [Name, properties] of objectEntries(config.components)) {
    const name = Name[0].toLowerCase() + Name.substr(1);
    if (!Array.isArray(properties)) {
      js.components.c1.push({
        name,
        Name,
      });
      d1.c1.push({ name, Name });
    } else {
      const alloc = config.alloc || {};
      const { components = 0 } = alloc;
      const parr = [];
      for (const p of properties) {
        parr.push(p.split(':'));
      }
      js.components.c2.push({
        name,
        Name,
        count: components,
        p: parr,
        params: params(properties),
      });

      d1.c2.push({
        name,
        Name,
        p: properties.join(', '),
      });
    }
  }

  // Matchers
  for (const [Name, properties] of objectEntries(config.components)) {
    const name = Name[0].toLowerCase() + Name.substr(1);
    d2.push(Name);
  }

  // Pooled Entities
  for (const [Name, pooled] of objectEntries(config.entities)) {
    if (pooled) {
      const name = Name[0].toLowerCase() + Name.substr(1);
      const properties = config.components[Name];
      if (!Array.isArray(properties)) {
        js.entities.e1.push({
          Name,
          name,
        });
        d3.e1.push({ name, Name });
      } else {
        const parr = [];
        for (const p of properties) {
          parr.push(p.split(':'));
        }
        js.entities.e2.push({
          name,
          Name,
          p: parr,
          params: params(properties),
        });
        d3.e2.push({
          name,
          Name,
          p: properties.join(', '),
        });
      }
    }
  }

  // Pools
  tpl = liquid.Template.parse(
    fs.readFileSync(path.join(__dirname, '../liquid/pools-ts.liquid'), 'utf-8')
  );
  ts.push(tpl.render({ dbg: JSON.stringify(dbg) }));
  ts.push('}');

  mkdirp(path.dirname(path.join(process.cwd(), config.output.typescript)));
  fs.writeFileSync(
    path.join(process.cwd(), config.output.typescript),
    ts.join('\n')
  );

  mkdirp(path.dirname(path.join(process.cwd(), config.output.javascript)));

  const js_tpl = liquid.Template.parse(
    fs.readFileSync(
      path.join(__dirname, '../liquid/generatedExtensions.js.liquid'),
      'utf8'
    )
  );
  js.components.c = js.components.c1.concat(js.components.c2);
  fs.writeFileSync(
    path.join(process.cwd(), config.output.javascript),
    js_tpl.render({
      ...js,
      namespace: config.namespace,
    })
  );

  for (const [Name, klass] of objectEntries(config.extensions)) {
    ex[Name] = [];
    ex[Name].push(`/*** Extensions for ${config.namespace}.${Name} */`);
    for (const [method, args] of objectEntries(klass)) {
      const [name, type] = method.split(':');
      ex[Name].push(`     ${name}(${args.join(', ')}):${type};`);
    }
  }
  // const def = (dts, className, dd) => {
  //   let i = dts.indexOf(className);
  //   if (i < 0) {
  //     console.log('未找到: ', className);
  //     return dts;
  //   }
  //   i += className.length;
  //   dts = dts.substr(0, i) + '\n' + dd.join('\n') + dts.substr(i);
  //   return dts;
  // };

  tpl = liquid.Template.parse(
    fs.readFileSync(
      path.join(__dirname, '../liquid/entitas.d.ts.liquid'),
      'utf-8'
    )
  );
  const d1_tpl = liquid.Template.parse(
    fs.readFileSync(
      path.join(__dirname, '../liquid/d.ts-entity-d1.liquid'),
      'utf8'
    )
  );
  const d2_tpl = liquid.Template.parse(
    fs.readFileSync(
      path.join(__dirname, '../liquid/d.ts-matcher-d2.liquid'),
      'utf8'
    )
  );
  const d3_tpl = liquid.Template.parse(
    fs.readFileSync(
      path.join(__dirname, '../liquid/d.ts-pool-d3.liquid'),
      'utf8'
    )
  );
  let dts = tpl.render({
    namespace: config.namespace,
    interfaceIComponent: d0,
    classEntity: d1_tpl.render({ namespace: config.namespace, ...d1 }),
    matcher: d2_tpl.render({ namespace: config.namespace, names: d2 }),
    pool: d3_tpl.render({ namespace: config.namespace, ...d3 }),
  });
  //   for (const [Name, d0] of objectEntries(ex)) {
  //     dts = def(dts, `    class #{Name} {`, d0);
  //   }

  mkdirp(path.dirname(path.join(process.cwd(), config.output.declaration)));
  fs.writeFileSync(path.join(process.cwd(), config.output.declaration), dts);
}

module.exports.run = run;
