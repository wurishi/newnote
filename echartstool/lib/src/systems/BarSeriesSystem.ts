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

<<<<<<< HEAD
export class BarSeriesSystem implements IReactiveSystem, ISetPool {
  get trigger(): TriggerOnEvent {
    return Matcher.SeriesType.onEntityAdded();
  }

  protected pool!: Pool;
  protected echartsOptions!: Group;
  public setPool(pool: Pool) {
    this.pool = pool;
    this.echartsOptions = pool.getGroup(Matcher.allOf(Matcher.EChartsOption));
  }

  get echartsOption(): Entity {
    return this.echartsOptions.getEntities()[0];
  }

  private _cacheObj = {};

  execute(entities: Entity[]) {
    const entity = entities.length > 0 ? entities[0] : null;
    if (entity && entity.seriesType.type === 'bar') {
      const ui: GUI = entity.seriesType.folder;
      const obj: any = this._cacheObj;
      const changeOptions = () => {
        const opt = { ...this.echartsOption.eChartsOption.option };
        for (let i = opt.series.length - 1; i >= 0; i--) {
          let tmp = { ...opt.series[i], type: 'bar' };
          tmp = { ...tmp, ...obj };
          opt.series[i] = tmp;
        }
        this.echartsOption.replaceEChartsOption(opt);
      };

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

      changeOptions();
    }
=======
import {
  BasicSeriesSystem,
  iBuildSeriesUIParams,
} from './basic/BasicSeriesSystem';

export class BarSeriesSystem extends BasicSeriesSystem {
  constructor() {
    super('bar');
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
>>>>>>> 20210604
  }
}
