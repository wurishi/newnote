/// <reference path="../../ext/echartstool.d.ts"/>

import {
  BasicSeriesSystem,
  iBuildSeriesUIParams,
} from './basic/BasicSeriesSystem';

import Pool = entitas.Pool;
import Group = entitas.Group;
import Entity = entitas.Entity;
import Matcher = entitas.Matcher;
import Exception = entitas.Exception;
import TriggerOnEvent = entitas.TriggerOnEvent;

export class RadarSeriesSystem extends BasicSeriesSystem {
  constructor() {
    super(['radar']);
  }

  buildSeriesUI(p: iBuildSeriesUIParams) {
    const {} = p;
  }
}
