/// <reference path="../../ext/echartstool.d.ts"/>

import * as echarts from 'echarts';
import { EChartsType } from 'echarts/core';

import Pool = entitas.Pool;
import Group = entitas.Group;
import Entity = entitas.Entity;
import Matcher = entitas.Matcher;
import Exception = entitas.Exception;
import TriggerOnEvent = entitas.TriggerOnEvent;

import IInitializeSystem = entitas.IInitializeSystem;
import ISetPool = entitas.ISetPool;
import IReactiveSystem = entitas.IReactiveSystem;
import IExecuteSystem = entitas.IExecuteSystem;

export class EChartsSystem
  implements IInitializeSystem, ISetPool, IExecuteSystem
{
  // IReactiveSystem
  // public get trigger(): TriggerOnEvent {
  //   return Matcher.ECharts.onEntityAdded();
  // }
  // execute(entities: Entity[]) {
  //   entities.forEach((e) => {
  //     if (e.hasECharts) {
  //       const c = e.getComponent(
  //         echartstool.CoreComponentIds.ECharts
  //       ) as echartstool.EChartsComponent;
  //       console.log(c.div, c.myChart);
  //     }
  //   });
  // }

  protected pool: Pool | undefined;
  protected echartsGroup: Group | undefined;
  protected optionGroup: Group | undefined;
  public setPool(pool: Pool) {
    this.pool = pool;
    this.echartsGroup = pool.getGroup(Matcher.allOf(Matcher.ECharts));
    this.optionGroup = pool.getGroup(Matcher.allOf(Matcher.EChartsOption));
  }

  initialize() {
    const div = document.createElement('div');
    div.style.width = window.innerWidth + 'px';
    div.style.height = window.innerHeight + 'px';
    document.getElementById('app')?.appendChild(div);

    const myChart = echarts.init(div);

    this.pool?.createEntity('echarts').addECharts(div, myChart);

    this.pool?.createEntity('options').addEChartsOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [],
    });
  }

  private _prevOption = null;
  execute() {
    let entities = this.echartsGroup?.getEntities();
    const tmp = entities?.find((e) => e.hasECharts);
    if (tmp && tmp.eCharts) {
      const myChart: EChartsType = tmp.eCharts.myChart;
      entities = this.optionGroup?.getEntities();
      entities?.forEach((e) => {
        if (e.eChartsOption.option !== this._prevOption) {
          myChart.setOption(e.eChartsOption.option);
          this._prevOption = e.eChartsOption.option;
          console.log(this._prevOption);
        }
      });
    }
  }
}
