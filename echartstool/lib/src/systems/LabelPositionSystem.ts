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

export class LabelPositionSystem extends BasicSubSeriesSystem {
  constructor(
    type: string[] = ['line', 'bar', 'scatter', 'effectScatter'],
    subType: string = 'label',
    checkKey: string = '',
    delOption: boolean = false
  ) {
    super(type, subType, checkKey);
  }

  buildSeriesUI(p: iSubBuildSeriesUIParams) {
    const { ui, obj, createChangeOptions, getName, entity } = p;
    const changeOptions = createChangeOptions('show');

    obj.distance = obj.distance || 5;
    ui.add(obj, 'distance', 0, 100, 1).onChange(changeOptions);

    const tmp = {
      xypos: false,
      pos: 'inside',
      posx: '0',
      posy: '0',
    };

    const changePosition = () => {
      if (tmp.xypos) {
        obj.position = [tmp.posx, tmp.posy];
      } else {
        obj.position = tmp.pos;
      }
      changeOptions();
    };
    ui.add(tmp, 'pos', utils.position.enum).onChange(changePosition);
    ui.add(tmp, 'xypos')
      .name(getName('自定义Position'))
      .onChange(changePosition);
    ui.add(tmp, 'posx').onChange(changePosition);
    ui.add(tmp, 'posy').onChange(changePosition);
  }
}
