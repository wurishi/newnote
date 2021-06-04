/// <reference path="../../ext/echartstool.d.ts"/>

import { GUI } from 'dat.gui';
<<<<<<< HEAD
=======

import {
  BasicSeriesSystem,
  iBuildSeriesUIParams,
} from './basic/BasicSeriesSystem';

>>>>>>> 20210604
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
export class LineSeriesSystem implements IReactiveSystem, ISetPool {
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
    if (entity && entity.seriesType.type === 'line') {
      const ui: GUI = entity.seriesType.folder;
      const obj: any = this._cacheObj;
      const changeOptions = () => {
        const opt = { ...this.echartsOption.eChartsOption.option };
        for (let i = opt.series.length - 1; i >= 0; i--) {
          let tmp = { ...opt.series[i], type: 'line' };
          tmp = { ...tmp, ...obj };
          opt.series[i] = tmp;
        }
        this.echartsOption.replaceEChartsOption(opt);
      };

      obj.showSymbol = obj.showSymbol || true;
      ui.add(obj, 'showSymbol')
        .name('showSymbol (false时仅tooltip hover显示)')
        .onChange(changeOptions);
      changeOptions();

      obj.showAllSymbol = obj.showAllSymbol || 'auto';
      ui.add(obj, 'showAllSymbol', ['auto', true, false])
        .name('showAllSymbol (仅axis.type为category时有效)')
        .onChange((v) => {
          if (v == 'true') {
            v = true;
          } else if (v == 'false') {
            v = false;
          }
          obj.showAllSymbol = v;
          changeOptions();
        });

      obj.connectNulls = obj.connectNulls || false;
      ui.add(obj, 'connectNulls').onChange(changeOptions);

      obj.step = obj.step || false;
      ui.add(obj, 'step', ['false', 'start', 'middle', 'end']).onChange((v) => {
        if (v == 'false') {
=======
export class LineSeriesSystem extends BasicSeriesSystem {
  constructor() {
    super(['line']);
  }

  buildSeriesUI(p: iBuildSeriesUIParams) {
    const { ui, obj, changeOptions, entity } = p;
    obj.showSymbol = obj.showSymbol || true;
    ui.add(obj, 'showSymbol')
      .name('showSymbol (false时仅tooltip hover显示)')
      .onChange(changeOptions);
    changeOptions();

    obj.showAllSymbol = obj.showAllSymbol || 'auto';
    ui.add(obj, 'showAllSymbol', ['auto', true, false])
      .name('showAllSymbol (仅axis.type为category时有效)')
      .onChange((v) => {
        if (v == 'true') {
          v = true;
        } else if (v == 'false') {
>>>>>>> 20210604
          v = false;
        }
        obj.showAllSymbol = v;
        changeOptions();
      });

<<<<<<< HEAD
      obj.smooth = obj.smooth || 0;
      ui.add(obj, 'smooth', 0, 1, 0.01).onChange(changeOptions);

      obj.smoothMonotone = obj.smoothMonotone || false;
      ui.add(obj, 'smoothMonotone', ['false', 'x', 'y']).onChange((v) => {
        if (v == 'false') {
          v = false;
        }
        obj.smoothMonotone = v;
        changeOptions();
      });

=======
    obj.connectNulls = obj.connectNulls || false;
    ui.add(obj, 'connectNulls').onChange(changeOptions);

    obj.step = obj.step || false;
    ui.add(obj, 'step', ['false', 'start', 'middle', 'end']).onChange((v) => {
      if (v == 'false') {
        v = false;
      }
      obj.step = v;
      changeOptions();
    });

    obj.smooth = obj.smooth || 0;
    ui.add(obj, 'smooth', 0, 1, 0.01).onChange(changeOptions);

    obj.smoothMonotone = obj.smoothMonotone || false;
    ui.add(obj, 'smoothMonotone', ['false', 'x', 'y']).onChange((v) => {
      if (v == 'false') {
        v = false;
      }
      obj.smoothMonotone = v;
>>>>>>> 20210604
      changeOptions();
    });

    entity.seriesType.subFolder.push(ui.addFolder('label'));
  }
}
