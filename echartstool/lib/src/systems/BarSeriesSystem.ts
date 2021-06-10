/// <reference path="../../ext/echartstool.d.ts"/>
import { GUI } from 'dat.gui';
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
  BasicSeriesSystem,
  iBuildSeriesUIParams,
} from './basic/BasicSeriesSystem';

export class BarSeriesSystem extends BasicSeriesSystem {
  constructor() {
    super(['bar']);
  }

  buildSeriesUI(p: iBuildSeriesUIParams) {
    const { ui, obj, changeOptions, entity } = p;

    obj.showBackground = obj.showBackground || false;
    ui.add(obj, 'showBackground').onChange(changeOptions);
    entity.seriesType.subFolder.push(ui.addFolder('backgroundStyle'));

    obj.barWidth = obj.barWidth || '';
    ui.add(obj, 'barWidth').onChange(changeOptions);

    obj.barMaxWidth = obj.barMaxWidth || '';
    ui.add(obj, 'barMaxWidth').onChange(changeOptions);

    obj.barMinWidth = obj.barMinWidth || '';
    ui.add(obj, 'barMinWidth').onChange(changeOptions);

    obj.barMinHeight = obj.barMinHeight || 0;
    ui.add(obj, 'barMinHeight', 0, 1000).onChange(changeOptions);

    obj.barMinAngle = obj.barMinAngle || 0;
    ui.add(obj, 'barMinAngle', 0, 360).onChange(changeOptions);

    obj.barGap = obj.barGap || '30%';
    ui.add(obj, 'barGap').onChange(changeOptions);

    obj.barCategoryGap = obj.barCategoryGap || '20%';
    ui.add(obj, 'barCategoryGap').onChange(changeOptions);

    entity.seriesType.subFolder.push(ui.addFolder('label'));
    entity.seriesType.subFolder.push(ui.addFolder('labelLine'));
  }
}
