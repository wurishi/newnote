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

import { LabelSystem } from './LabelSystem';

export class EndLabelSystem extends LabelSystem {
  constructor() {
    super(['line'], 'endLabel', '', true);
  }

  buildSeriesUI(p: iSubBuildSeriesUIParams) {
    const fn: any = super.buildSeriesUI(p);

    const { ui, obj } = p;

    obj.distance = obj.distance || 5;
    ui.add(obj, 'distance', 0, 100, 1).onChange(fn);

    obj.valueAnimation = obj.valueAnimation || false;
    ui.add(obj, 'valueAnimation').onChange(fn);

    return fn;
  }
}
