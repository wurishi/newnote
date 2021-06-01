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

export class EChartsSystem
  implements IReactiveSystem, IInitializeSystem, ISetPool
{
  public get trigger(): TriggerOnEvent {
    return Matcher.ECharts.onEntityAdded();
  }

  protected pool: Pool | undefined;
  public setPool(pool: Pool) {
    this.pool = pool;
  }

  initialize() {
    const div = document.createElement('div');
    div.style.width = window.innerWidth + 'px';
    div.style.height = window.innerHeight + 'px';
    document.getElementById('app')?.appendChild(div);

    const myChart = echarts.init(div);

    this.pool?.createEntity('echarts').addECharts(div, myChart);
  }

  execute(entities: Entity[]) {
    entities.forEach((e) => {
      if (e.hasECharts) {
        const c = e.getComponent(
          echartstool.CoreComponentIds.ECharts
        ) as echartstool.EChartsComponent;
        console.log(c.div, c.myChart);
      }
    });
  }
}
