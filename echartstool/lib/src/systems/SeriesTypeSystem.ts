/// <reference path="../../ext/echartstool.d.ts"/>

import { GUI } from 'dat.gui';
import Pool = entitas.Pool;
import Group = entitas.Group;
import Entity = entitas.Entity;
import Matcher = entitas.Matcher;
import Exception = entitas.Exception;
import TriggerOnEvent = entitas.TriggerOnEvent;

import IInitializeSystem = entitas.IInitializeSystem;
import ISetPool = entitas.ISetPool;

export class SeriesTypeSystem implements IInitializeSystem, ISetPool {
  private uiObj = {
    SeriesCount: 1,
  };

  initialize() {
    this.ui
      .add(this.uiObj, 'SeriesCount', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
      .onChange(() => {
        this.initSeries();
      });
    this.initSeries();
    // this.folder = this.ui.addFolder('图表系列类型(SeriesType)');
    // this.entity = this.pool
    //   .createEntity('SeriesType')
    //   .addSeriesType(this.uiObj.seriesType, this.folder, []);
    // this.changeSeriesType(false);
  }

  private entities: Entity[] = [];

  initSeries(): void {
    const count = +this.uiObj.SeriesCount;
    for (let i = 0; i < count; i++) {
      let entity = this.entities[i];
      if (!entity) {
        const folder = this.ui.addFolder('图表系列(series)-' + i);
        folder
          .add({ seriesType: '' }, 'seriesType', [
            'line',
            'bar',
            'pie',
            'scatter',
            'effectScatter',
            'radar',
          ])
          .onFinishChange((v) => {
            setTimeout(() => {
              for (let j = folder.__controllers.length - 1; j >= 1; j--) {
                folder.remove(folder.__controllers[j]);
              }
              entity.replaceSeriesType(i, v, folder, []);
            }, 0);
          });
        entity = this.pool
          .createEntity('SeriesType' + i)
          .addSeriesType(i, '', folder, []);
      }
      this.entities[i] = entity;
    }
    for (let i = count; i < this.entities.length; i++) {
      const entity = this.entities[i];
      this.ui.removeFolder(entity.seriesType.folder);
      entity.destroy();
    }
    this.entities.length = count;
  }

  protected pool!: Pool;
  protected guiGroup!: Group;
  setPool(pool: Pool) {
    this.pool = pool;
    this.guiGroup = pool.getGroup(Matcher.allOf(Matcher.DatGUI));
  }

  get ui(): GUI {
    return this.guiGroup.getEntities()[0].datGUI.ui;
  }
}
