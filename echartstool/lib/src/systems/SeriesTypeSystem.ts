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
    seriesType: 'line',
  };

  private folder?: GUI;
  private entity?: Entity;

  initialize() {
    this.folder = this.ui.addFolder('图表系列类型(SeriesType)');
    this.entity = this.pool
      .createEntity('SeriesType')
      .addSeriesType(this.uiObj.seriesType, this.folder, []);
    this.changeSeriesType(false);
  }

  changeSeriesType(remove: boolean) {
    setTimeout(() => {
      if (remove && this.folder) {
        this.ui.removeFolder(this.folder);
        this.folder = this.ui.addFolder('图表系列类型(SeriesType)');
      }
      this.folder
        ?.add(this.uiObj, 'seriesType', [
          'line',
          'bar',
          'pie',
          'scatter',
          'effectScatter',
          'radar',
        ])
        .onFinishChange(() => {
          this.changeSeriesType(true);
        });
      if (this.entity) {
        this.entity.replaceSeriesType(this.uiObj.seriesType, this.folder, []);
      }
      this.folder?.open();
    }, 0);
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
