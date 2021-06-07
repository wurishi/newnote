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
  protected delOption: boolean;
  constructor(
    type: string[],
    subType: string,
    checkKey: string,
    delOption: boolean = false
  ) {
    super(type);
    this.subType = subType;
    this.checkKey = checkKey;
    this.delOption = delOption;
  }

  get trigger(): TriggerOnEvent {
    return Matcher.EChartsOption.onEntityAdded();
  }

  protected seriesTypeGroup!: Group;
  public setPool(pool: Pool) {
    super.setPool(pool);
    this.seriesTypeGroup = pool.getGroup(Matcher.allOf(Matcher.SeriesType));
  }

  protected uiChildren: any = {};

  execute() {
    const entities = this.seriesTypeGroup.getEntities();
    entities.forEach((entity) => {
      const ui: GUI = entity.seriesType.subFolder.find(
        (v) => v.name === this.subType
      );
      const index = entity.seriesType.index;
      if (
        this.type.length <= 0 ||
        this.type.indexOf(entity.seriesType.type) >= 0
      ) {
        this._cacheObj[index] = this._cacheObj[index] || {};
        const obj: any = this._cacheObj[index];
        if (
          !this.checkKey ||
          this.echartsOption.eChartsOption.option.series[index][this.checkKey]
        ) {
          this.checkUIChildren(ui, entity.seriesType.type, index);
          if (this.uiChildren[index].length <= 1) {
            const proxy: any = {
              add: (...args: any[]) => {
                const t = ui.add.apply(ui, args as any);
                this.uiChildren[index].push(t);
                return t;
              },
              addColor: (...args: any[]) => {
                const t = ui.addColor.apply(ui, args as any);
                this.uiChildren[index].push(t);
                return t;
              },
            };
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
              ui: proxy,
              entity,
              obj,
              changeOptions,
              // getName: (s) => `${this.subType}.${s}`,
              getName: (s) => s,
            });
            changeOptions();
            console.log('build');
            // ui.open();
          }
        } else {
          this.clearSeriesUI(ui, index);
        }
      } else {
        // this.clearSeriesUI(ui, index);
      }
    });
  }

  buildSeriesUI(p: iSubBuildSeriesUIParams) {
    super.buildSeriesUI(p);
  }

  onlyClearUI(ui: GUI, index: number) {
    const arr = this.uiChildren[index] || [];
    arr.forEach((item: any, i: number) => {
      if (i > 0) {
        ui.remove(item);
      }
    });
  }

  checkUIChildren(ui: GUI, type: string, index: number) {
    let arr: any[] = [type];
    if (!this.uiChildren[index]) {
      this.uiChildren[index] = arr;
    } else {
      arr = this.uiChildren[index];
    }

    let flag = false;
    if (arr[0] != type) {
      flag = true;
    }
    if (arr.length > 1) {
      if (ui.__controllers.indexOf(arr[1]) < 0) {
        flag = true;
      }
    }
    if (flag) {
      arr.forEach((item: any, i: number) => {
        if (i > 0) {
          if (ui.__controllers.indexOf(item) >= 0) {
            ui.remove(item);
          }
        }
      });
      this.uiChildren[index] = [type];
    }
  }

  clearSeriesUI(ui: GUI, index: number) {
    this.deleteOptions(index);
    this.onlyClearUI(ui, index);
    // if (ui.__controllers.length > 0) {
    //   for (let i = ui.__controllers.length - 1; i >= 0; i--) {
    //     ui.remove(ui.__controllers[i]);
    //   }
    // }
  }

  deleteOptions(index: number) {
    const opt = { ...this.echartsOption.eChartsOption.option };
    let tmp = { ...opt.series[index] };
    if (this.delOption && tmp[this.subType]) {
      delete tmp[this.subType];
      opt.series[index] = tmp;
      this.echartsOption.replaceEChartsOption(opt);
    }
  }
}
