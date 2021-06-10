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

export class ScatterSeriesSystem extends BasicSeriesSystem {
  constructor() {
    super(['scatter']);
  }

  buildSeriesUI(p: iBuildSeriesUIParams) {
    const { obj, ui, changeOptions, entity } = p;

    entity.seriesType.subFolder.push(ui.addFolder('label'));
    entity.seriesType.subFolder.push(ui.addFolder('labelLine'));
  }
}
