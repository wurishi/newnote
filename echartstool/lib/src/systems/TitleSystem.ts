/// <reference path="../../ext/echartstool.d.ts"/>

import { GUI } from 'dat.gui';
import * as utils from '../utils';
import Pool = entitas.Pool;
import Group = entitas.Group;
import Entity = entitas.Entity;
import Matcher = entitas.Matcher;
import Exception = entitas.Exception;
import TriggerOnEvent = entitas.TriggerOnEvent;

import ISetPool = entitas.ISetPool;
import IInitializeSystem = entitas.IInitializeSystem;

export class TitleSystem implements ISetPool, IInitializeSystem {
  protected pool!: Pool;
  protected guiGroup!: Group;
  protected echartsOptionGroup!: Group;
  public setPool(pool: Pool) {
    this.pool = pool;
    this.guiGroup = pool.getGroup(Matcher.allOf(Matcher.DatGUI));
    this.echartsOptionGroup = pool.getGroup(
      Matcher.allOf(Matcher.EChartsOption)
    );
  }

  private _ui!: GUI;

  get ui(): GUI {
    if (!this._ui) {
      this._ui = this.guiGroup
        .getEntities()
        .find((v) => v.datGUI.index == 1)
        ?.datGUI.ui.addFolder('Title');
    }
    return this._ui;
  }

  get echartsOption(): Entity {
    return this.echartsOptionGroup.getSingleEntity();
  }

  private obj: any = {};

  initialize() {
    const obj = this.obj;
    const ui = this.ui;

    const changeOptions = () => {
      const opt = { ...this.echartsOption.eChartsOption.option };
      if (obj.show) {
        opt.title = obj;
      } else {
        opt.title = { show: false };
      }
      this.echartsOption.replaceEChartsOption(opt);
    };

    obj.show = obj.show || false;
    ui.add(obj, 'show').onChange(changeOptions);

    obj.text = obj.text || '标题';
    ui.add(obj, 'text').onChange(changeOptions);

    obj.link = obj.link || '';
    ui.add(obj, 'link').onChange(changeOptions);

    obj.target = obj.target || 'blank';
    ui.add(obj, 'target', utils.target.enum).onChange(changeOptions);

    const textStyle = obj.textStyle || {};
    obj.textStyle = textStyle;
    textStyleFn(ui.addFolder('textStyle'), textStyle, changeOptions, [
      'rgba(51,51,51,1)',
      'bolder',
      18,
      false,
    ]);

    obj.subtext = obj.subtext || '';
    ui.add(obj, 'subtext').onChange(changeOptions);

    obj.sublink = obj.sublink || '';
    ui.add(obj, 'sublink').onChange(changeOptions);

    obj.subtarget = obj.subtarget || 'blank';
    ui.add(obj, 'subtarget', utils.target.enum).onChange(changeOptions);

    const subtextStyle = obj.subtextStyle || {};
    obj.subtextStyle = subtextStyle;
    textStyleFn(ui.addFolder('subtextStyle'), subtextStyle, changeOptions, [
      'rgba(170,170,170,1)',
      'normal',
      12,
      true,
    ]);

    obj.textAlign = obj.textAlign || 'auto';
    ui.add(obj, 'textAlign', utils.textAlign.enum).onChange(changeOptions);

    obj.textVerticalAlign = obj.textVerticalAlign || 'auto';
    ui.add(obj, 'textVerticalAlign', utils.textVerticalAlign.enum).onChange(
      changeOptions
    );

    obj.triggerEvent = obj.triggerEvent || false;
    ui.add(obj, 'triggerEvent').onChange(changeOptions);

    obj.padding = obj.padding || 5;
    ui.add(obj, 'padding', 0, 50, 0.5).onChange(changeOptions);

    obj.itemGap = obj.itemGap || 10;
    ui.add(obj, 'itemGap', 0, 100, 1).onChange(changeOptions);

    obj.zlevel = obj.zlevel || 0;
    ui.add(obj, 'zlevel', 0, 100, 1).onChange(changeOptions);

    obj.z = obj.z || 2;
    ui.add(obj, 'z', -100, 100, 1).onChange(changeOptions);

    obj.left = obj.left || 'auto';
    ui.add(obj, 'left').onChange(changeOptions);

    obj.top = obj.top || 'auto';
    ui.add(obj, 'top').onChange(changeOptions);

    obj.right = obj.right || 'auto';
    ui.add(obj, 'right').onChange(changeOptions);

    obj.bottom = obj.bottom || 'auto';
    ui.add(obj, 'bottom').onChange(changeOptions);

    obj.backgroundColor = obj.backgroundColor || 'transparent';
    utils.uiListOrColor(
      ui,
      ['transparent'],
      (v: any) => {
        obj.backgroundColor = v;
        changeOptions();
      },
      true,
      'backgroundColor'
    );

    obj.borderColor = obj.borderColor || 'rgba(204,204,204,1)';
    utils.uiListOrColor(
      ui,
      [],
      (v: any) => {
        obj.borderColor = v;
        changeOptions();
      },
      true,
      'borderColor',
      obj.borderColor
    );

    obj.borderWidth = obj.borderWidth || 0;
    ui.add(obj, 'borderWidth', 0, 50, 0.5).onChange(changeOptions);

    obj.borderRadius = obj.borderRadius || 0;
    ui.add(obj, 'borderRadius', 0, 50, 0.5).onChange(changeOptions);

    obj.shadowBlur = obj.shadowBlur || 0;
    ui.add(obj, 'shadowBlur', 0, 50, 0.5).onChange(changeOptions);

    utils.uiListOrColor(
      ui,
      [],
      (v: any) => {
        obj.shadowColor = v;
        changeOptions();
      },
      true,
      'shadowColor'
    );

    obj.shadowOffsetX = obj.shadowOffsetX || 0;
    ui.add(obj, 'shadowOffsetX', 0, 50, 0.5).onChange(changeOptions);

    obj.shadowOffsetY = obj.shadowOffsetY || 0;
    ui.add(obj, 'shadowOffsetY', 0, 50, 0.5).onChange(changeOptions);
  }
}

function textStyleFn(
  ui: GUI,
  textStyle: any,
  changeOptions: () => void,
  defaultValues: any[]
) {
  textStyle.color = textStyle.color || defaultValues[0];
  utils.uiListOrColor(
    ui,
    [],
    (v: any) => {
      textStyle.color = v;
      changeOptions();
    },
    true,
    'color',
    defaultValues[0]
  );

  textStyle.fontStyle = textStyle.fontStyle || 'normal';
  ui.add(textStyle, 'fontStyle', utils.fontStyle.enum).onChange(changeOptions);

  textStyle.fontWeight = textStyle.fontWeight || defaultValues[1];
  ui.add(textStyle, 'fontWeight', utils.fontWeight.enum).onChange(
    changeOptions
  );

  textStyle.fontFamily = textStyle.fontFamily || 'sans-serif';
  ui.add(textStyle, 'fontFamily').onChange(changeOptions);

  textStyle.fontSize = textStyle.fontSize || defaultValues[2];
  ui.add(textStyle, 'fontSize', 1, 100, 1).onChange(changeOptions);

  if (defaultValues[3]) {
    textStyle.align = textStyle.align || '';
    ui.add(textStyle, 'align', utils.align.enum).onChange(changeOptions);

    textStyle.verticalAlign = textStyle.verticalAlign || '';
    ui.add(textStyle, 'verticalAlign', utils.verticalAlign.enum).onChange(
      changeOptions
    );
  }

  textStyle.lineHeight = textStyle.lineHeight || 27;
  ui.add(textStyle, 'lineHeight', 0, 100, 1).onChange(changeOptions);

  textStyle.width = textStyle.width || '';
  ui.add(textStyle, 'width').onChange(changeOptions);

  textStyle.height = textStyle.height || '';
  ui.add(textStyle, 'height').onChange(changeOptions);

  utils.uiListOrColor(
    ui,
    [],
    (v: any) => {
      textStyle.textBorderColor = v;
      changeOptions();
    },
    true,
    'textBorderColor'
  );

  textStyle.textBorderWidth = textStyle.textBorderWidth || 0;
  ui.add(textStyle, 'textBorderWidth', 0, 50, 0.5).onChange(changeOptions);

  textStyle.textBorderType = textStyle.textBorderType || 'solid';
  ui.add(textStyle, 'textBorderType', utils.borderType.enum).onChange(
    changeOptions
  );

  textStyle.textBorderDashOffset = textStyle.textBorderDashOffset || 0;
  ui.add(textStyle, 'textBorderDashOffset', 0, 10, 0.1).onChange(changeOptions);

  textStyle.textShadowColor = textStyle.textShadowColor || 'transparent';
  utils.uiListOrColor(
    ui,
    ['transparent'],
    (v: any) => {
      textStyle.textShadowColor = v;
      changeOptions();
    },
    true,
    'textShadowColor'
  );

  textStyle.textShadowBlur = textStyle.textShadowBlur || 0;
  ui.add(textStyle, 'textShadowBlur', 0, 50, 0.5).onChange(changeOptions);

  textStyle.textShadowOffsetX = textStyle.textShadowOffsetX || 0;
  ui.add(textStyle, 'textShadowOffsetX', 0, 50, 0.5).onChange(changeOptions);

  textStyle.textShadowOffsetY = textStyle.textShadowOffsetY || 0;
  ui.add(textStyle, 'textShadowOffsetY', 0, 50, 0.5).onChange(changeOptions);

  textStyle.overflow = textStyle.overflow || 'none';
  ui.add(textStyle, 'overflow', utils.overflow.enum).onChange(changeOptions);

  textStyle.ellipsis = textStyle.ellipsis || '...';
  ui.add(textStyle, 'ellipsis').onChange(changeOptions);

  textStyle.lineOverflow = textStyle.lineOverflow || 'none';
  ui.add(textStyle, 'lineOverflow', utils.lineOverflow.enum).onChange(
    changeOptions
  );
}
