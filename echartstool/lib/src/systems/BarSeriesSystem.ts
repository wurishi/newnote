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

      obj.legendHoverLink = obj.legendHoverLink || true;
      ui.add(obj, 'legendHoverLink').onChange(changeOptions);

      obj.showBackground = obj.showBackground || false;
      ui.add(obj, 'showBackground').onChange(changeOptions);

      obj.selectedMode = obj.selectedMode || false;
      ui.add(obj, 'selectedMode', utils.selectedMode.enum).onChange((v) => {
        obj.selectedMode = utils.selectedMode.fn(v);
        changeOptions();
      });

      obj.sampling = obj.sampling || false;
      ui.add(obj, 'sampling', utils.sampling.enum).onChange((v) => {
        obj.sampling = utils.sampling.fn(v);
        changeOptions();
      });

      obj.cursor = obj.cursor || 'pointer';
      ui.add(obj, 'cursor', utils.cursor.enum).onChange(changeOptions);

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

      obj.large = obj.large || false;
      ui.add(obj, 'large').onChange(changeOptions);

      obj.largeThreshold = obj.largeThreshold || 400;
      ui.add(obj, 'largeThreshold', 0, 10000).onFinishChange(changeOptions);

      obj.clip = obj.clip || true;
      ui.add(obj, 'clip').onChange(changeOptions);

      obj.silent = obj.silent || false;
      ui.add(obj, 'silent').onChange(changeOptions);

      changeOptions();
    }
  }
}
