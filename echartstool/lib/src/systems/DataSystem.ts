/// <reference path="../../ext/echartstool.d.ts"/>

import Pool = entitas.Pool;
import Group = entitas.Group;
import Entity = entitas.Entity;
import Matcher = entitas.Matcher;
import Exception = entitas.Exception;
import TriggerOnEvent = entitas.TriggerOnEvent;

import IReactiveSystem = entitas.IReactiveSystem;
import ISetPool = entitas.ISetPool;

export class DataSystem implements IReactiveSystem, ISetPool {
  // 注意
  // endLabel,labelLayout,itemStyle,lineStyle
  // areaStyle,emphasis,blur,select
  // dimensions,encode,seriesLayoutBy,datasetIndex,data,
  // markPoint,markLine,markArea
  // coordinateSystem,
  // progressive
  // animation, tooltip

  // radar 的 data 格式不一样

  protected pool!: Pool;
  protected echartsOptionGroup!: Group;
  setPool(pool: Pool) {
    this.pool = pool;
    this.echartsOptionGroup = pool.getGroup(Matcher.EChartsOption);
  }

  get echartsOption() {
    return this.echartsOptionGroup.getSingleEntity();
  }

  get trigger(): TriggerOnEvent {
    return Matcher.SeriesType.onEntityAddedOrRemoved();
  }

  execute(entities: Entity[]) {
    const opt = { ...this.echartsOption.eChartsOption.option };
    entities.forEach((v) => {
      if (v.hasSeriesType) {
        if (!opt.series[v.seriesType.index]) {
          opt.series[v.seriesType.index] = {
            data: [1, 2, 3, 4, 5, 6, 7].map(() =>
              Math.floor(Math.random() * 100 + 100)
            ),
          };
        }
      } else {
        opt.series.pop();
      }
    });
    this.echartsOption.replaceEChartsOption(opt);
  }
}
