/// <reference path="../../ext/echartstool.d.ts"/>

import { GUI } from 'dat.gui';
import Pool = entitas.Pool;
import Group = entitas.Group;
import Entity = entitas.Entity;
import Matcher = entitas.Matcher;
import Exception = entitas.Exception;
import TriggerOnEvent = entitas.TriggerOnEvent;

import IReactiveSystem = entitas.IReactiveSystem;
import ISetPool = entitas.ISetPool;

export class LineSeriesSystem implements IReactiveSystem, ISetPool {
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
    if (entity && entity.seriesType.type === 'line') {
      const ui: GUI = entity.seriesType.folder;
      const obj: any = this._cacheObj;
      const changeOptions = () => {
        const opt = { ...this.echartsOption.eChartsOption.option };
        for (let i = opt.series.length - 1; i >= 0; i--) {
          let tmp = { ...opt.series[i], type: 'line' };
          tmp = { ...tmp, ...obj };
          opt.series[i] = tmp;
        }
        this.echartsOption.replaceEChartsOption(opt);
      };
      let arr = [
        'emptyCircle',
        'circle',
        'rect',
        'roundRect',
        'triangle',
        'diamond',
        'pin',
        'arrow',
        'none',
      ];
      let map: any = {};
      arr.forEach((v) => (map[v] = v));
      map['image://url'] =
        'image://https://dss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/searchbox/nicon-10750f3f7d.png';
      map['dataURI'] =
        'image://data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7';
      map['path://'] =
        'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z';
      obj.symbol = obj.symbol || arr[0];
      ui.add(obj, 'symbol', map).onChange(changeOptions);

      obj.symbolSize = obj.symbolSize || 4;
      ui.add(obj, 'symbolSize', 1, 100, 1).onChange(changeOptions);

      obj.symbolRotate = obj.symbolRotate || 0;
      ui.add(obj, 'symbolRotate', 0, 360, 1).onChange(changeOptions);

      obj.symbolKeepAspect = obj.symbolKeepAspect || true;
      ui.add(obj, 'symbolKeepAspect')
        .name('symbolKeepAspect (仅symbol为path://生效)')
        .onChange(changeOptions);

      obj.symbolOffset = obj.symbolOffset || ['0', '0'];
      ui.add({ _x_symbolOffset: obj.symbolOffset[0] }, '_x_symbolOffset')
        .name('symbolOffset[0] (50或50%)')
        .onChange((v) => {
          obj.symbolOffset[0] = v;
          changeOptions();
        });
      ui.add({ _y_symbolOffset: obj.symbolOffset[1] }, '_y_symbolOffset')
        .name('symbolOffset[1]')
        .onChange((v) => {
          obj.symbolOffset[1] = v;
          changeOptions();
        });

      obj.showSymbol = obj.showSymbol || true;
      ui.add(obj, 'showSymbol')
        .name('showSymbol (false时仅tooltip hover显示)')
        .onChange(changeOptions);
      changeOptions();

      obj.showAllSymbol = obj.showAllSymbol || 'auto';
      ui.add(obj, 'showAllSymbol', ['auto', true, false])
        .name('showAllSymbol (仅axis.type为category时有效)')
        .onChange((v) => {
          if (v == 'true') {
            v = true;
          } else if (v == 'false') {
            v = false;
          }
          obj.showAllSymbol = v;
          changeOptions();
        });

      obj.legendHoverLink = obj.legendHoverLink || true;
      ui.add(obj, 'legendHoverLink').onChange(changeOptions);

      obj.cursor = obj.cursor || 'pointer';
      arr = [
        'auto',
        'default',
        'none',
        'context-menu',
        'help',
        'pointer',
        'progress',
        'wait',
        'cell',
        'crosshair',
        'text',
        'vertical-text',
        'alias',
        'copy',
        'move',
        'no-drop',
        'not-allowed',
        'grab',
        'grabbing',
        'all-scroll',
        'col-resize',
        'row-resize',
        'n-resize',
        'e-resize',
        's-resize',
        'w-resize',
        'ne-resize',
        'nw-resize',
        'se-resize',
        'sw-resize',
        'ew-resize',
        'ns-resize',
        'nesw-resize',
        'nwse-resize',
        'zoom-in',
        'zoom-out',
      ];
      ui.add(obj, 'cursor', arr).onChange(changeOptions);

      obj.connectNulls = obj.connectNulls || false;
      ui.add(obj, 'connectNulls').onChange(changeOptions);

      obj.clip = obj.clip || true;
      ui.add(obj, 'clip').onChange(changeOptions);

      obj.step = obj.step || false;
      ui.add(obj, 'step', ['false', 'start', 'middle', 'end']).onChange((v) => {
        if (v == 'false') {
          v = false;
        }
        obj.step = v;
        changeOptions();
      });

      obj.selectedMode = obj.selectedMode || false;
      ui.add(obj, 'selectedMode', ['false', 'single', 'multiple']).onChange(
        (v) => {
          if (v == 'false') {
            v = false;
          }
          obj.selectedMode = v;
          changeOptions();
        }
      );

      obj.smooth = obj.smooth || 0;
      ui.add(obj, 'smooth', 0, 1, 0.01).onChange(changeOptions);

      obj.smoothMonotone = obj.smoothMonotone || false;
      ui.add(obj, 'smoothMonotone', ['false', 'x', 'y']).onChange((v) => {
        if (v == 'false') {
          v = false;
        }
        obj.smoothMonotone = v;
        changeOptions();
      });

      obj.sampling = obj.sampling || '';
      ui.add(obj, 'sampling', [
        'false',
        'lttb',
        'average',
        'max',
        'min',
        'sum',
      ]).onChange((v) => {
        if (v == 'false') {
          v = false;
        }
        obj.sampling = v;
        changeOptions();
      });

      obj.silent = obj.silent || false;
      ui.add(obj, 'silent').onChange(changeOptions);

      changeOptions();
    }
  }
}
