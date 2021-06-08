/// <reference path="../lib/ext/echartstool.d.ts"/>

import './style.css';

import { EChartsSystem } from '../lib/src/systems/EChartsSystem';
import { GUISystem } from '../lib/src/systems/GUISystem';
import { SeriesTypeSystem } from '../lib/src/systems/SeriesTypeSystem';
import { LineSeriesSystem } from '../lib/src/systems/LineSeriesSystem';
import { BarSeriesSystem } from '../lib/src/systems/BarSeriesSystem';
import { BarSeriesBackgroundStyleSystem } from '../lib/src/systems/BarSeriesBackgroundStyleSystem';
import { PieSeriesSystem } from '../lib/src/systems/PieSeriesSystem';
import { ScatterSeriesSystem } from '../lib/src/systems/ScatterSeriesSystem';
import { SeriesCommonSystem } from '../lib/src/systems/SeriesCommonSystem';
import { EffectScatterSeriesSystem } from '../lib/src/systems/EffectScatterSeriesSystem';
import { RadarSeriesSystem } from '../lib/src/systems/RadarSeriesSystem';
import { DataSystem } from '../lib/src/systems/DataSystem';
import { LabelSystem } from '../lib/src/systems/LabelSystem';
import { LabelPositionSystem } from '../lib/src/systems/LabelPositionSystem';
import { PiePositionSystem } from '../lib/src/systems/PiePositionSystem';
import { TitleSystem } from '../lib/src/systems/TitleSystem';

const systemList = [
  EChartsSystem, //
  DataSystem,
  GUISystem,
  SeriesTypeSystem,
  SeriesCommonSystem,
  LineSeriesSystem,
  BarSeriesSystem,
  BarSeriesBackgroundStyleSystem,
  PieSeriesSystem,
  ScatterSeriesSystem,
  EffectScatterSeriesSystem,
  RadarSeriesSystem,
  LabelSystem,
  LabelPositionSystem,
  PiePositionSystem,
  TitleSystem,
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
