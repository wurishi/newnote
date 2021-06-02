/// <reference path="../../../ext/echartstool.d.ts"/>

import { GUI } from 'dat.gui';

import Pool = entitas.Pool;
import Group = entitas.Group;
import Entity = entitas.Entity;
import Matcher = entitas.Matcher;
import Exception = entitas.Exception;
import TriggerOnEvent = entitas.TriggerOnEvent;

import IReactiveSystem = entitas.IReactiveSystem;
import ISetPool = entitas.ISetPool;

export interface iBuildSeriesUIParams {
  entity: Entity;
  ui: GUI;
  obj: any;
  changeOptions: () => void;
}

export class BasicSeriesSystem implements IReactiveSystem, ISetPool {
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

  protected type: string;
  protected _cacheObj: any[];
  constructor(type: string) {
    this.type = type;
    this._cacheObj = [];
  }

  buildSeriesUI(p: iBuildSeriesUIParams): void {
    throw new Error('未实现 buildSeriesUI');
  }

  execute(entities: Entity[]) {
    entities.forEach((entity) => {
      if (entity.seriesType.type === this.type) {
        const ui: GUI = entity.seriesType.folder;
        const index = entity.seriesType.index;
        this._cacheObj[index] = this._cacheObj[index] || {};
        const obj: any = this._cacheObj[index];
        const changeOptions = () => {
          const opt = { ...this.echartsOption.eChartsOption.option };
          let tmp = { ...opt.series[index], type: this.type };
          tmp = { ...tmp, ...obj };
          opt.series[index] = tmp;
          this.echartsOption.replaceEChartsOption(opt);
        };
        this.buildSeriesUI({ entity, ui, obj, changeOptions });
        changeOptions();
      }
    });
  }
}
