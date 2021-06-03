/// <reference path="../../ext/echartstool.d.ts"/>

import Pool = entitas.Pool;
import Group = entitas.Group;
import Entity = entitas.Entity;
import Matcher = entitas.Matcher;
import Exception = entitas.Exception;
import TriggerOnEvent = entitas.TriggerOnEvent;

import IReactiveSystem = entitas.IReactiveSystem;
import ISetPool = entitas.ISetPool;

import {
  BasicSeriesSystem,
  iBuildSeriesUIParams,
} from './basic/BasicSeriesSystem';

export class EffectScatterSeriesSystem extends BasicSeriesSystem {
  constructor() {
    super('effectScatter');
  }

  buildSeriesUI(p: iBuildSeriesUIParams) {
    const { obj, ui, changeOptions } = p;

    obj.effectType = obj.effectType || 'ripple';
    ui.add(obj, 'effectType', ['ripple']).onChange(changeOptions);

    obj.showEffectOn = obj.showEffectOn || 'render';
    ui.add(obj, 'showEffectOn', ['render', 'emphasis']).onChange(changeOptions);
  }
}
