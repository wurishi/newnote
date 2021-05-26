/// <reference path="../lib/ext/testgame.d.ts"/>

import { testgame } from '../lib/src/systems/DebugMessageSystem';

export default function main() {
  const _system = new entitas.Systems();
  _system.add(testgame.DebugMessageSystem);

  setInterval(() => {
    _system.execute();
  }, 10);
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
