/// <reference path="../lib/ext/testgame.d.ts"/>

import { DebugMessageSystem } from '../lib/src/systems/DebugMessageSystem';

export default function main() {
  const _system = new entitas.Systems();
  // console.log(testgame.Pools.pool.createSystem)
  // _system.add(
  //   new entitas.ReactiveSystem(testgame.Pools.pool, new DebugMessageSystem())
  // );
  _system.add(testgame.Pools.pool.createSystem(DebugMessageSystem));

  _system.initialize();

  setInterval(() => {
    _system.execute();
    // _system.clearReactiveSystems();
  }, 1000);
  // console.log(entitas)
  // console.log(testgame)
  // const sys = new entitas.Systems();
  // sys.add(new testgame.DebugMessageSystem());

  // console.log(testgame.DebugMessage)

  // const update = () => {
  //   sys.execute();
  //   setTimeout(update, 0);
  // };

  // setTimeout(update, 0);
}
