/// <reference path="../../ext/echartstool.d.ts"/>

import { GUI, GUIController } from 'dat.gui';
import * as utils from '../utils';
import Pool = entitas.Pool;
import Group = entitas.Group;
import Entity = entitas.Entity;
import Matcher = entitas.Matcher;
import Exception = entitas.Exception;
import TriggerOnEvent = entitas.TriggerOnEvent;

import IReactiveSystem = entitas.IReactiveSystem;
import ISetPool = entitas.ISetPool;

<<<<<<< HEAD
export class BarSeriesBackgroundStyleSystem
  implements IReactiveSystem, ISetPool
{
  get trigger(): TriggerOnEvent {
    return Matcher.EChartsOption.onEntityAdded();
  }

  protected pool!: Pool;
  protected seriesTypeGroup!: Group;
  protected echartsOptions!: Group;
  public setPool(pool: Pool) {
    this.pool = pool;
    this.seriesTypeGroup = pool.getGroup(Matcher.allOf(Matcher.SeriesType));
    this.echartsOptions = pool.getGroup(Matcher.allOf(Matcher.EChartsOption));
  }

  get seriesType() {
    return this.seriesTypeGroup.getEntities()[0].seriesType;
  }

  get echartsOption(): Entity {
    return this.echartsOptions.getEntities()[0];
  }

  private _cacheObj = {};
  private uiChildren: GUIController[] = [];

  execute(entities: Entity[]) {
    const ui: GUI =
      this.seriesType.subFolder.find((v) => v.name == 'backgroundStyle') ||
      this.seriesType.folder;
    let clear = true;
    const obj: any = this._cacheObj;
    const changeOptions = () => {
      const opt = { ...this.echartsOption.eChartsOption.option };
      for (let i = opt.series.length - 1; i >= 0; i--) {
        let tmp = { ...opt.series[i] };
        if (clear) {
          delete tmp['backgroundStyle'];
        } else {
          tmp = { ...tmp, backgroundStyle: obj };
        }
        opt.series[i] = tmp;
      }
      this.echartsOption.replaceEChartsOption(opt);
    };
    const entity = entities.length > 0 ? entities[0] : null;
    if (entity && this.seriesType.type === 'bar') {
      if (
        entity.eChartsOption.option.series.some((v: any) => v.showBackground)
      ) {
        clear = false;
        if (this.uiChildren.length <= 0) {
          const getName = (s: string) => 'backgroundStyle.' + s;
          obj.color = obj.color || 'rgba(180, 180, 180, 0.2)';
          this.uiChildren.push(
            ui
              .addColor(obj, 'color')
              .name(getName('color'))
              .onChange(changeOptions)
          );
          obj.borderColor = obj.borderColor || '#000';
          this.uiChildren.push(
            ui
              .addColor(obj, 'borderColor')
              .name(getName('borderColor'))
              .onChange(changeOptions)
          );

          obj.borderWidth = obj.borderWidth || 0;
          this.uiChildren.push(
            ui
              .add(obj, 'borderWidth', 0, 10, 0.5)
              .name(getName('borderWidth'))
              .onChange(changeOptions)
          );

          obj.borderType = obj.borderType || 'solid';
          this.uiChildren.push(
            ui
              .add(obj, 'borderType', ['solid', 'dashed', 'dotted'])
              .name(getName('borderType'))
              .onChange(changeOptions)
          );

          obj.borderRadius = obj.borderRadius || 0;
          this.uiChildren.push(
            ui
              .add(obj, 'borderRadius', 0, 10, 0.5)
              .name(getName('borderRadius'))
              .onChange(changeOptions)
          );

          obj.shadowBlur = obj.shadowBlur || 0;
          this.uiChildren.push(
            ui
              .add(obj, 'shadowBlur', 0, 10, 0.5)
              .name(getName('shadowBlur'))
              .onChange(changeOptions)
          );

          obj.shadowColor = obj.shadowColor || 'rgba(0,0,0,0.5)';
          this.uiChildren.push(
            ui
              .addColor(obj, 'shadowColor')
              .name(getName('shadowColor'))
              .onChange(changeOptions)
          );

          obj.shadowOffsetX = obj.shadowOffsetX || 0;
          this.uiChildren.push(
            ui
              .add(obj, 'shadowOffsetX', 0, 10)
              .name(getName('shadowOffsetX'))
              .onChange(changeOptions)
          );

          obj.shadowOffsetY = obj.shadowOffsetY || 0;
          this.uiChildren.push(
            ui
              .add(obj, 'shadowOffsetY', 0, 10)
              .name(getName('shadowOffsetY'))
              .onChange(changeOptions)
          );

          obj.opacity = obj.opacity || 1;
          this.uiChildren.push(
            ui
              .add(obj, 'opacity', 0, 1)
              .name(getName('opacity'))
              .onChange(changeOptions)
          );

          changeOptions();
          ui.open();
        }
      }
    }
    if (clear) {
      if (this.uiChildren.length > 0) {
        this.uiChildren.forEach((u) => ui.remove(u));
        this.uiChildren.length = 0;
        changeOptions();
        ui.close();
      }
    }
=======
import {
  BasicSubSeriesSystem,
  iSubBuildSeriesUIParams,
} from './basic/BasicSubSeriesSystem';

export class BarSeriesBackgroundStyleSystem extends BasicSubSeriesSystem {
  constructor() {
    super('bar', 'backgroundStyle', 'showBackground');
  }

  buildSeriesUI(p: iSubBuildSeriesUIParams) {
    const { ui, obj, changeOptions, getName } = p;

    obj.color = obj.color || 'rgba(180, 180, 180, 0.2)';
    utils.uiListOrColor(
      ui,
      [],
      (v: any) => {
        obj.color = v;
        changeOptions();
      },
      true
    );

    obj.borderColor = obj.borderColor || '#000';
    ui.addColor(obj, 'borderColor')
      .name(getName('borderColor'))
      .onChange(changeOptions);

    obj.borderWidth = obj.borderWidth || 0;
    ui.add(obj, 'borderWidth', 0, 10, 0.5)
      .name(getName('borderWidth'))
      .onChange(changeOptions);

    obj.borderType = obj.borderType || 'solid';
    ui.add(obj, 'borderType', utils.borderType.enum)
      .name(getName('borderType'))
      .onChange(changeOptions);

    obj.borderRadius = obj.borderRadius || 0;
    ui.add(obj, 'borderRadius', 0, 10, 0.5)
      .name(getName('borderRadius'))
      .onChange(changeOptions);

    obj.shadowBlur = obj.shadowBlur || 0;
    ui.add(obj, 'shadowBlur', 0, 10, 0.5)
      .name(getName('shadowBlur'))
      .onChange(changeOptions);

    obj.shadowColor = obj.shadowColor || 'rgba(0,0,0,0.5)';
    ui.addColor(obj, 'shadowColor')
      .name(getName('shadowColor'))
      .onChange(changeOptions);

    obj.shadowOffsetX = obj.shadowOffsetX || 0;
    ui.add(obj, 'shadowOffsetX', 0, 10)
      .name(getName('shadowOffsetX'))
      .onChange(changeOptions);

    obj.shadowOffsetY = obj.shadowOffsetY || 0;
    ui.add(obj, 'shadowOffsetY', 0, 10)
      .name(getName('shadowOffsetY'))
      .onChange(changeOptions);

    obj.opacity = obj.opacity || 1;
    ui.add(obj, 'opacity', 0, 1)
      .name(getName('opacity'))
      .onChange(changeOptions);
>>>>>>> 20210604
  }
}
