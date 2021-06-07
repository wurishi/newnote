/// <reference path="../../ext/echartstool.d.ts"/>

import { GUI, GUIController } from 'dat.gui';
import * as utils from '../utils';
import Pool = entitas.Pool;
import Group = entitas.Group;
import Entity = entitas.Entity;
import Matcher = entitas.Matcher;
import Exception = entitas.Exception;
import TriggerOnEvent = entitas.TriggerOnEvent;

import IReactiveSystem = entitas.IReactiveSystem;
import ISetPool = entitas.ISetPool;

import {
  BasicSubSeriesSystem,
  iSubBuildSeriesUIParams,
} from './basic/BasicSubSeriesSystem';

export class BarSeriesBackgroundStyleSystem extends BasicSubSeriesSystem {
  constructor() {
    super(['bar'], 'backgroundStyle', 'showBackground');
  }

  buildSeriesUI(p: iSubBuildSeriesUIParams) {
    const { ui, obj, changeOptions, getName } = p;

    obj.color = obj.color || 'rgba(180, 180, 180, 0.2)';
    utils.uiListOrColor(
      ui,
      [],
      (v: any) => {
        obj.color = v;
        changeOptions();
      },
      true
    );

    obj.borderColor = obj.borderColor || '#000';
    ui.addColor(obj, 'borderColor')
      .name(getName('borderColor'))
      .onChange(changeOptions);

    obj.borderWidth = obj.borderWidth || 0;
    ui.add(obj, 'borderWidth', 0, 10, 0.5)
      .name(getName('borderWidth'))
      .onChange(changeOptions);

    obj.borderType = obj.borderType || 'solid';
    ui.add(obj, 'borderType', utils.borderType.enum)
      .name(getName('borderType'))
      .onChange(changeOptions);

    obj.borderRadius = obj.borderRadius || 0;
    ui.add(obj, 'borderRadius', 0, 10, 0.5)
      .name(getName('borderRadius'))
      .onChange(changeOptions);

    obj.shadowBlur = obj.shadowBlur || 0;
    ui.add(obj, 'shadowBlur', 0, 10, 0.5)
      .name(getName('shadowBlur'))
      .onChange(changeOptions);

    obj.shadowColor = obj.shadowColor || 'rgba(0,0,0,0.5)';
    ui.addColor(obj, 'shadowColor')
      .name(getName('shadowColor'))
      .onChange(changeOptions);

    obj.shadowOffsetX = obj.shadowOffsetX || 0;
    ui.add(obj, 'shadowOffsetX', 0, 10)
      .name(getName('shadowOffsetX'))
      .onChange(changeOptions);

    obj.shadowOffsetY = obj.shadowOffsetY || 0;
    ui.add(obj, 'shadowOffsetY', 0, 10)
      .name(getName('shadowOffsetY'))
      .onChange(changeOptions);

    obj.opacity = obj.opacity || 1;
    ui.add(obj, 'opacity', 0, 1)
      .name(getName('opacity'))
      .onChange(changeOptions);
  }
}
