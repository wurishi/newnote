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
  protected echartsOptionGroup!: Group;
  public setPool(pool: Pool) {
    this.pool = pool;
    this.echartsOptionGroup = pool.getGroup(
      Matcher.allOf(Matcher.EChartsOption)
    );
  }

  get echartsOption(): Entity {
    return this.echartsOptionGroup.getSingleEntity();
  }

  protected type: string[];
  protected _cacheObj: any[];
  protected _delIfOptIsNull: string[];
  constructor(type: string[]) {
    this.type = type;
    this._cacheObj = [];
    this._delIfOptIsNull = [];
  }

  buildSeriesUI(p: iBuildSeriesUIParams): void {
    throw new Error('未实现 buildSeriesUI');
  }

  execute(entities: Entity[]) {
    entities.forEach((entity) => {
      if (this.type.indexOf(entity.seriesType.type) >= 0) {
        const type = entity.seriesType.type;
        const ui: GUI = entity.seriesType.folder;
        const index = entity.seriesType.index;
        this._cacheObj[index] = this._cacheObj[index] || {};
        const obj: any = this._cacheObj[index];
        const changeOptions = () => {
          const opt = { ...this.echartsOption.eChartsOption.option };
          let tmp = { ...opt.series[index], type };
          const t = { ...obj };
          this._delIfOptIsNull.forEach((k) => {
            if (!t[k]) {
              delete t[k];
            }
          });
          tmp = { ...tmp, ...t };
          opt.series[index] = tmp;
          this.echartsOption.replaceEChartsOption(opt);
        };
        this.buildSeriesUI({ entity, ui, obj, changeOptions });
        changeOptions();
      }
    });
  }
}
