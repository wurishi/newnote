/// <reference path="../../ext/echartstool.d.ts"/>

import { GUI } from 'dat.gui';
import * as utils from '../utils';

import Pool = entitas.Pool;
import Group = entitas.Group;
import Entity = entitas.Entity;
import Matcher = entitas.Matcher;
import Exception = entitas.Exception;
import TriggerOnEvent = entitas.TriggerOnEvent;

import IReactiveSystem = entitas.IReactiveSystem;
import ISetPool = entitas.ISetPool;

export class SeriesCommonSystem implements IReactiveSystem, ISetPool {
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
    if (entity) {
      const ui: GUI = entity.seriesType.folder;
      const type = entity.seriesType.type;
      const obj: any = this._cacheObj;
      const changeOptions = () => {
        const opt = { ...this.echartsOption.eChartsOption.option };
        for (let i = opt.series.length - 1; i >= 0; i--) {
          let tmp = { ...opt.series[i] };
          tmp = { ...tmp, ...obj };
          opt.series[i] = tmp;
        }
        this.echartsOption.replaceEChartsOption(opt);
      };

      obj.legendHoverLink = obj.legendHoverLink || true;
      ui.add(obj, 'legendHoverLink').onChange(changeOptions);

      obj.cursor = obj.cursor || 'pointer';
      ui.add(obj, 'cursor', utils.cursor.enum).onChange(changeOptions);

      obj.selectedMode = obj.selectedMode || false;
      ui.add(obj, 'selectedMode', utils.selectedMode.enum).onChange((v) => {
        obj.selectedMode = utils.selectedMode.fn(v);
        changeOptions();
      });

      obj.silent = obj.silent || false;
      ui.add(obj, 'silent').onChange(changeOptions);

      if (['line', 'bar', 'scatter', 'effectScatter'].indexOf(type) >= 0) {
        obj.clip = obj.clip || true;
        ui.add(obj, 'clip').onChange(changeOptions);
      }

      if (['line', 'bar'].indexOf(type) >= 0) {
        obj.sampling = obj.sampling || false;
        ui.add(obj, 'sampling', utils.sampling.enum).onChange((v) => {
          obj.sampling = utils.sampling.fn(v);
          changeOptions();
        });
      }

      const symbolMap: any = {
        line: ['emptyCircle', []],
        scatter: ['circle', []], // 文档中并没有说明emptyCircle是可用的, 但实际上也能用
        effectScatter: ['circle', []],
        radar: ['circle', []],
      };
      if (symbolMap[type]) {
        const subUI = ui.addFolder('symbol');

        obj.symbol = obj.symbol || symbolMap[type][0];
        subUI
          .add(obj, 'symbol', utils.getSymbol(symbolMap[type][1]).map)
          .onChange(changeOptions);

        obj.symbolSize = obj.symbolSize || 4;
        subUI.add(obj, 'symbolSize', 1, 100, 1).onChange(changeOptions);

        obj.symbolRotate = obj.symbolRotate || 0;
        subUI.add(obj, 'symbolRotate', 0, 360, 1).onChange(changeOptions);

        obj.symbolKeepAspect = obj.symbolKeepAspect || true;
        subUI
          .add(obj, 'symbolKeepAspect')
          .name('symbolKeepAspect (仅symbol为path://生效)')
          .onChange(changeOptions);

        obj.symbolOffset = obj.symbolOffset || ['0', '0'];
        subUI
          .add({ _x_symbolOffset: obj.symbolOffset[0] }, '_x_symbolOffset')
          .name('symbolOffset[0] (50或50%)')
          .onChange((v) => {
            obj.symbolOffset[0] = v;
            changeOptions();
          });
        subUI
          .add({ _y_symbolOffset: obj.symbolOffset[1] }, '_y_symbolOffset')
          .name('symbolOffset[1]')
          .onChange((v) => {
            obj.symbolOffset[1] = v;
            changeOptions();
          });
        subUI.open();
      }

      if (['bar', 'scatter'].indexOf(type) >= 0) {
        obj.large = obj.large || false;
        ui.add(obj, 'large').onChange(changeOptions);

        obj.largeThreshold = obj.largeThreshold || 400;
        ui.add(obj, 'largeThreshold', 0, 10000).onFinishChange(changeOptions);
      }

      changeOptions();
    }
  }
}
