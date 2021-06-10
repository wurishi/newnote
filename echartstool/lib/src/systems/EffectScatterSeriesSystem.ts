/// <reference path="../../ext/echartstool.d.ts"/>

import Pool = entitas.Pool;
import Group = entitas.Group;
import Entity = entitas.Entity;
import Matcher = entitas.Matcher;
import Exception = entitas.Exception;
import TriggerOnEvent = entitas.TriggerOnEvent;

import IReactiveSystem = entitas.IReactiveSystem;
import ISetPool = entitas.ISetPool;

import * as utils from '../utils';

import {
  BasicSeriesSystem,
  iBuildSeriesUIParams,
} from './basic/BasicSeriesSystem';

export class EffectScatterSeriesSystem extends BasicSeriesSystem {
  constructor() {
    super(['effectScatter']);
  }

  buildSeriesUI(p: iBuildSeriesUIParams) {
    const { obj, ui, changeOptions, entity } = p;

    obj.effectType = obj.effectType || 'ripple';
    ui.add(obj, 'effectType', ['ripple']).onChange(changeOptions);

    obj.showEffectOn = obj.showEffectOn || 'render';
    ui.add(obj, 'showEffectOn', ['render', 'emphasis']).onChange(changeOptions);

    const rippleEffect = obj.rippleEffect || {};
    obj.rippleEffect = rippleEffect;
    const rippleEffectUI = ui.addFolder('rippleEffect');
    utils.uiListOrColor(
      rippleEffectUI,
      [],
      (v: any) => {
        rippleEffect.color = v;
        changeOptions();
      },
      true
    );

    rippleEffect.period = rippleEffect.period || 4;
    rippleEffectUI
      .add(rippleEffect, 'period', 0, 10, 0.1)
      .onChange(changeOptions);

    rippleEffect.scale = rippleEffect.scale || 2.5;
    rippleEffectUI
      .add(rippleEffect, 'scale', 0, 10, 0.5)
      .onChange(changeOptions);

    rippleEffect.brushType = rippleEffect.brushType || 'fill';
    rippleEffectUI
      .add(rippleEffect, 'brushType', ['stroke', 'fill'])
      .onChange(changeOptions);

    entity.seriesType.subFolder.push(ui.addFolder('label'));
    entity.seriesType.subFolder.push(ui.addFolder('labelLine'));
  }
}
