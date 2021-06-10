/// <reference path="../../ext/echartstool.d.ts"/>

import { GUI } from 'dat.gui';
import * as utils from '../utils';

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

import IReactiveSystem = entitas.IReactiveSystem;
import ISetPool = entitas.ISetPool;

export class PieSeriesSystem extends BasicSeriesSystem {
  constructor() {
    super(['pie']);
  }

  buildSeriesUI(p: iBuildSeriesUIParams) {
    const { ui, obj, changeOptions, entity } = p;

    obj.selectedOffset = obj.selectedOffset || 10;
    ui.add(obj, 'selectedOffset', 0, 100).onChange(changeOptions);

    obj.clockwise = obj.clockwise || true;
    ui.add(obj, 'clockwise').onChange(changeOptions);

    obj.startAngle = obj.startAngle || 90;
    ui.add(obj, 'startAngle', 0, 360).onChange(changeOptions);

    obj.minAngle = obj.minAngle || 0;
    ui.add(obj, 'minAngle', 0, 360).onChange(changeOptions);

    obj.minShowLabelAngle = obj.minShowLabelAngle || 0;
    ui.add(obj, 'minShowLabelAngle', 0, 360).onChange(changeOptions);

    obj.roseType = obj.roseType || false;
    ui.add(obj, 'roseType', utils.roseType.enum).onChange((v) => {
      obj.roseType = utils.roseType.fn(v);
      changeOptions();
    });

    obj.avoidLabelOverlap = obj.avoidLabelOverlap || true;
    ui.add(obj, 'avoidLabelOverlap').onChange(changeOptions);

    obj.stillShowZeroSum = obj.stillShowZeroSum || true;
    ui.add(obj, 'stillShowZeroSum').onChange(changeOptions);

    obj.left = obj.left || '';
    ui.add(obj, 'left').onChange(changeOptions);

    obj.top = obj.top || '';
    ui.add(obj, 'top').onChange(changeOptions);

    obj.right = obj.right || '';
    ui.add(obj, 'right').onChange(changeOptions);

    obj.bottom = obj.bottom || '';
    ui.add(obj, 'bottom').onChange(changeOptions);

    obj.width = obj.width || 'auto';
    ui.add(obj, 'width').onChange(changeOptions);

    obj.height = obj.height || 'auto';
    ui.add(obj, 'height').onChange(changeOptions);

    obj.center = obj.center || ['50%', '50%'];
    ui.add({ 'center[0]': obj.center[0] }, 'center[0]').onChange((v) => {
      obj.center[0] = v;
      changeOptions();
    });
    ui.add({ 'center[1]': obj.center[1] }, 'center[1]').onChange((v) => {
      obj.center[1] = v;
      changeOptions();
    });

    obj.radius = obj.radius || ['0', '75%'];
    ui.add({ r: obj.radius[0] }, 'r')
      .name('内半径')
      .onChange((v) => {
        obj.radius[0] = v;
        changeOptions();
      });
    ui.add({ r: obj.radius[1] }, 'r')
      .name('外半径')
      .onChange((v) => {
        obj.radius[1] = v;
        changeOptions();
      });

    entity.seriesType.subFolder.push(ui.addFolder('label'));
    entity.seriesType.subFolder.push(ui.addFolder('labelLine'));
  }
}
