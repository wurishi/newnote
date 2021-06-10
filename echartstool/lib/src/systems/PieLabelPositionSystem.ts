/// <reference path="../../ext/echartstool.d.ts"/>

import Pool = entitas.Pool;
import Group = entitas.Group;
import Entity = entitas.Entity;
import Matcher = entitas.Matcher;
import Exception = entitas.Exception;
import TriggerOnEvent = entitas.TriggerOnEvent;

import {
  BasicSubSeriesSystem,
  iSubBuildSeriesUIParams,
} from './basic/BasicSubSeriesSystem';

import * as utils from '../utils';

export class PieLabelPositionSystem extends BasicSubSeriesSystem {
  constructor() {
    super(['pie'], 'label', '');
  }

  buildSeriesUI(p: iSubBuildSeriesUIParams) {
    const { ui, obj, createChangeOptions } = p;
    const changeOptions = createChangeOptions('show');

    obj.position = obj.position || 'outside';
    ui.add(obj, 'position', utils.pie_position.enum).onChange(changeOptions);

    obj.alignTo = obj.alignTo || 'none';
    ui.add(obj, 'alignTo', utils.alignTo.enum).onChange(changeOptions);

    obj.edgeDistance = obj.edgeDistance || '25%';
    ui.add(obj, 'edgeDistance').onChange(changeOptions);

    obj.bleedMargin = obj.bleedMargin || 10;
    ui.add(obj, 'bleedMargin', 0, 100, 1).onChange(changeOptions);

    obj.distanceToLabelLine = obj.distanceToLabelLine || 5;
    ui.add(obj, 'distanceToLabelLine', 0, 10, 1).onChange(changeOptions);
  }
}
