/// <reference path="../../../ext/echartstool.d.ts"/>

import { GUI } from 'dat.gui';

import { BasicSeriesSystem, iBuildSeriesUIParams } from './BasicSeriesSystem';

import Pool = entitas.Pool;
import Group = entitas.Group;
import Entity = entitas.Entity;
import Matcher = entitas.Matcher;
import Exception = entitas.Exception;
import TriggerOnEvent = entitas.TriggerOnEvent;

export interface iSubBuildSeriesUIParams extends iBuildSeriesUIParams {
  getName: (s: string) => string;
}

export class BasicSubSeriesSystem extends BasicSeriesSystem {
  protected subType: string;
  protected checkKey: string;
  constructor(type: string[], subType: string, checkKey: string) {
    super(type);
    this.subType = subType;
    this.checkKey = checkKey;
  }

  get trigger(): TriggerOnEvent {
    return Matcher.EChartsOption.onEntityAdded();
  }

  protected seriesTypeGroup!: Group;
  public setPool(pool: Pool) {
    super.setPool(pool);
    this.seriesTypeGroup = pool.getGroup(Matcher.allOf(Matcher.SeriesType));
  }

  execute() {
    const entities = this.seriesTypeGroup.getEntities();
    entities.forEach((entity) => {
      if (
        this.type.length <= 0 ||
        this.type.indexOf(entity.seriesType.type) >= 0
      ) {
        const ui: GUI = entity.seriesType.subFolder.find(
          (v) => v.name === this.subType
        );
        const index = entity.seriesType.index;
        if (!ui) {
          this.deleteOptions(index);
          return;
        }
        this._cacheObj[index] = this._cacheObj[index] || {};
        const obj: any = this._cacheObj[index];
        if (
          !this.checkKey ||
          this.echartsOption.eChartsOption.option.series[index][this.checkKey]
        ) {
          if (ui.__controllers.length <= 0) {
            const changeOptions = () => {
              const opt = { ...this.echartsOption.eChartsOption.option };
              let tmp = { ...opt.series[index] };
              const t = { ...obj };
              this._delIfOptIsNull.forEach((k) => {
                if (!t[k]) {
                  delete t[k];
                }
              });
              tmp = { ...tmp, [this.subType]: t };
              opt.series[index] = tmp;
              this.echartsOption.replaceEChartsOption(opt);
            };
            this.buildSeriesUI({
              ui,
              entity,
              obj,
              changeOptions,
              // getName: (s) => `${this.subType}.${s}`,
              getName: (s) => s,
            });
            changeOptions();
            // ui.open();
          }
        } else {
          this.clearSeriesUI(ui, index);
        }
      }
    });
  }

  buildSeriesUI(p: iSubBuildSeriesUIParams) {
    super.buildSeriesUI(p);
  }

  clearSeriesUI(ui: GUI, index: number) {
    this.deleteOptions(index);
    if (ui.__controllers.length > 0) {
      for (let i = ui.__controllers.length - 1; i >= 0; i--) {
        ui.remove(ui.__controllers[i]);
      }
    }
  }

  deleteOptions(index: number) {
    const opt = { ...this.echartsOption.eChartsOption.option };
    let tmp = { ...opt.series[index] };
    if (tmp[this.subType]) {
      delete tmp[this.subType];
      opt.series[index] = tmp;
      this.echartsOption.replaceEChartsOption(opt);
    }
  }
}
