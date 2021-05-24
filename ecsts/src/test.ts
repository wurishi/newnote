/// <reference path="../lib/ext/testgame.d.ts"/>
// import { testgame } from '../lib/src/systems/DebugMessageSystem';

export default function main() {
  const c = new testgame.DebugMessageComponent();
  c.msg = '123';
  console.log(c);
  console.log(entitas.Entity.clearDebugMessageComponentPool);
  // const sys = new entitas.Systems();
  // sys.add(new testgame.DebugMessageSystem());

  // console.log(testgame.DebugMessage)

  // const update = () => {
  //   sys.execute();
  //   setTimeout(update, 0);
  // };

  // setTimeout(update, 0);
}
