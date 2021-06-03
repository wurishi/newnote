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

export class PieSeriesSystem implements IReactiveSystem, ISetPool {
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
    if (entity && entity.seriesType.type === 'pie') {
      const ui: GUI = entity.seriesType.folder;
      const obj: any = this._cacheObj;
      const changeOptions = () => {
        const opt = { ...this.echartsOption.eChartsOption.option };
        for (let i = opt.series.length - 1; i >= 0; i--) {
          let tmp = { ...opt.series[i], type: 'pie' };
          tmp = { ...tmp, ...obj };
          opt.series[i] = tmp;
        }
        this.echartsOption.replaceEChartsOption(opt);
      };

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

      changeOptions();
    }
  }
}
