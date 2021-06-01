/// <reference path="../lib/ext/echartstool.d.ts"/>

import { EChartsSystem } from '../lib/src/systems/EChartsSystem';

(function () {
  const sys = new entitas.Systems();
  sys.add(echartstool.Pools.pool.createSystem(EChartsSystem));

  sys.initialize();

  const run = () => {
    sys.execute();
    requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
})();
