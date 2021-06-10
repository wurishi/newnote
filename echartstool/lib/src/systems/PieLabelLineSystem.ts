/// <reference path="../../ext/echartstool.d.ts"/>

import Pool = entitas.Pool;
import Group = entitas.Group;
import Entity = entitas.Entity;
import Matcher = entitas.Matcher;
import Exception = entitas.Exception;
import TriggerOnEvent = entitas.TriggerOnEvent;

import * as utils from '../utils';

import {
  BasicSubSeriesSystem,
  iSubBuildSeriesUIParams,
} from './basic/BasicSubSeriesSystem';

export class PieLabelLineSystem extends BasicSubSeriesSystem {
  constructor() {
    super(['pie'], 'labelLine', '', true);
  }

  buildSeriesUI(p: iSubBuildSeriesUIParams) {
    const { ui, obj, createChangeOptions } = p;
    const changeOptions = createChangeOptions('show');

    obj.show = obj.show || false;
    ui.add(obj, 'show').onChange(changeOptions);

    obj.showAbove = obj.showAbove || false;
    ui.add(obj, 'showAbove').onChange(changeOptions);

    obj.length = obj.length || 0;
    ui.add(obj, 'length', 0, 100, 1).onChange(changeOptions);

    obj.length2 = obj.length2 || 0;
    ui.add(obj, 'length2', 0, 100, 1).onChange(changeOptions);

    obj.smooth = obj.smooth || 0;
    ui.add(obj, 'smooth', 0, 1, 0.1).onChange(changeOptions);

    obj.minTurnAngle = obj.minTurnAngle || 90;
    ui.add(obj, 'minTurnAngle', 0, 180, 1).onChange(changeOptions);

    const lineStyle = obj.lineStyle || {};
    obj.lineStyle = lineStyle;
    const lineStyleUI = ui.addFolder('lineStyle');
    utils.batchLineStyle(
      lineStyleUI,
      {
        color: 'rgba(0,0,0,1)',
        width: 1,
        type: 'solid',
        dashOffset: 0,
        cap: 'butt',
        join: 'bevel',
        miterLimit: 10,
        shadowBlur: 0,
        shadowColor: 'rgba(0,0,0,1)',
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        opacity: 1,
      },
      lineStyle,
      changeOptions
    );

    obj.maxSurfaceAngle = obj.maxSurfaceAngle || 0;
    ui.add(obj, 'maxSurfaceAngle', 0, 180, 1).onChange(changeOptions);

    return changeOptions;
  }
}
