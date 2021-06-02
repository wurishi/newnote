/// <reference path="../lib/ext/echartstool.d.ts"/>

import { EChartsSystem } from '../lib/src/systems/EChartsSystem';
import { GUISystem } from '../lib/src/systems/GUISystem';
import { SeriesTypeSystem } from '../lib/src/systems/SeriesTypeSystem';
import { LineSeriesSystem } from '../lib/src/systems/LineSeriesSystem';

const systemList = [
  EChartsSystem, //
  GUISystem,
  SeriesTypeSystem,
  LineSeriesSystem,
];

(function () {
  const sys = new entitas.Systems();
  systemList.forEach((s) => {
    sys.add(echartstool.Pools.pool.createSystem(s));
  });

  sys.initialize();

  const run = () => {
    sys.execute();
    requestAnimationFrame(run);
  };
  requestAnimationFrame(run);
})();
