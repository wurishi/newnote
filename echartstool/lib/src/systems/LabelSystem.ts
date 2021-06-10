/// <reference path="../../ext/echartstool.d.ts"/>

import Pool = entitas.Pool;
import Group = entitas.Group;
import Entity = entitas.Entity;
import Matcher = entitas.Matcher;
import Exception = entitas.Exception;
import TriggerOnEvent = entitas.TriggerOnEvent;

import * as utils from '../utils';

import {
  BasicSubSeriesSystem,
  iSubBuildSeriesUIParams,
} from './basic/BasicSubSeriesSystem';

export class LabelSystem extends BasicSubSeriesSystem {
  constructor(
    type: string[] = ['line', 'bar', 'pie', 'scatter', 'effectScatter'],
    subType: string = 'label',
    checkKey: string = '',
    delOption: boolean = true
  ) {
    super(type, subType, checkKey, delOption);
    this._delIfOptIsNull.push('width', 'height');
  }

  buildSeriesUI(p: iSubBuildSeriesUIParams) {
    const { ui, obj, createChangeOptions, getName, entity } = p;
    const changeOptions = createChangeOptions('show');

    obj.show = obj.show || false;
    ui.add(obj, 'show').name(getName('show')).onChange(changeOptions);

    obj.rotate = obj.rotate || 0;
    ui.add(obj, 'rotate', -90, 90, 1).onChange(changeOptions);

    obj.offset = obj.offset || [0, 0];
    utils.uiArr(ui, obj, 'offset', [-100, 100], changeOptions);

    obj.formatter = obj.formatter || '{c}';
    ui.add(obj, 'formatter').onFinishChange(changeOptions).domElement.title =
      '{a}系列名; {b}数据名; {c}数据值; {@xxx}维度值; {@[n]}数组维度';

    utils.uiListOrColor(
      ui,
      ['', 'inherit'],
      (v: any) => {
        obj.color = v;
        changeOptions();
      },
      true
    );

    obj.fontStyle = obj.fontStyle || 'normal';
    ui.add(obj, 'fontStyle', utils.fontStyle.enum).onChange(changeOptions);

    obj.fontWeight = obj.fontWeight || 'normal';
    ui.add(obj, 'fontWeight', utils.fontWeight.enum).onChange(changeOptions);

    obj.fontFamily = obj.fontFamily || 'sans-serif';
    ui.add(obj, 'fontFamily').onChange(changeOptions);

    obj.fontSize = obj.fontSize || 12;
    ui.add(obj, 'fontSize', 1, 60, 1).onChange(changeOptions);

    obj.align = obj.align || 'center';
    ui.add(obj, 'align', utils.align.enum).onChange(changeOptions);

    obj.verticalAlign = obj.verticalAlign || 'bottom';
    ui.add(obj, 'verticalAlign', utils.verticalAlign.enum).onChange(
      changeOptions
    );

    obj.lineHeight = obj.lineHeight || 18;
    ui.add(obj, 'lineHeight', 0, 100, 1).onChange(changeOptions);

    obj.backgroundColor = obj.backgroundColor || 'transparent';
    utils.uiListOrColor(
      ui,
      ['transparent', 'inherit'],
      (v: any) => {
        obj.backgroundColor = v;
        changeOptions();
      },
      true,
      'backgroundColor'
    );

    obj.borderColor = obj.borderColor || '';
    utils.uiListOrColor(
      ui,
      ['', 'inherit'],
      (v: any) => {
        obj.borderColor = v;
        changeOptions();
      },
      false,
      'borderColor'
    );

    obj.borderWidth = obj.borderWidth || 0;
    ui.add(obj, 'borderWidth', 0, 10, 0.5).onChange(changeOptions);

    obj.borderType = obj.borderType || 'solid';
    ui.add(obj, 'borderType', utils.borderType.enum).onChange(changeOptions);

    obj.borderDashOffset = obj.borderDashOffset || 0;
    ui.add(obj, 'borderDashOffset', 0, 10).onChange(changeOptions);

    obj.borderRadius = obj.borderRadius || 0;
    ui.add(obj, 'borderRadius', 0, 100).onChange(changeOptions);

    obj.padding = obj.padding || 0;
    ui.add(obj, 'padding', 0, 10).onChange(changeOptions);

    obj.shadowColor = obj.shadowColor || 'transparent';
    utils.uiListOrColor(
      ui,
      ['transparent'],
      (v: any) => {
        obj.shadowColor = v;
        changeOptions();
      },
      true,
      'shadowColor'
    );

    obj.shadowBlur = obj.shadowBlur || 0;
    ui.add(obj, 'shadowBlur', 0, 10).onChange(changeOptions);

    obj.shadowOffsetX = obj.shadowOffsetX || 0;
    ui.add(obj, 'shadowOffsetX', -100, 100).onChange(changeOptions);

    obj.shadowOffsetY = obj.shadowOffsetY || 0;
    ui.add(obj, 'shadowOffsetY', -100, 100).onChange(changeOptions);

    obj.width = obj.width || '';
    ui.add(obj, 'width').onChange(changeOptions);

    obj.height = obj.height || '';
    ui.add(obj, 'height').onChange(changeOptions);

    obj.textBorderColor = obj.textBorderColor || '';
    utils.uiListOrColor(
      ui,
      ['', 'inherit'],
      (v: any) => {
        obj.textBorderColor = v;
        changeOptions();
      },
      true,
      'textBorderColor'
    );

    obj.textBorderWidth = obj.textBorderWidth || 0;
    ui.add(obj, 'textBorderWidth', 0, 10).onChange(changeOptions);

    obj.textBorderType = obj.textBorderType || 'solid';
    ui.add(obj, 'textBorderType', utils.borderType.enum).onChange(
      changeOptions
    );

    obj.textBorderDashOffset = obj.textBorderDashOffset || 0;
    ui.add(obj, 'textBorderDashOffset', 0, 10).onChange(changeOptions);

    obj.textShadowColor = obj.textShadowColor || 'transparent';
    utils.uiListOrColor(
      ui,
      ['transparent'],
      (v: any) => {
        obj.textShadowColor = v;
        changeOptions();
      },
      true,
      'textShadowColor'
    );

    obj.textShadowBlur = obj.textShadowBlur || 0;
    ui.add(obj, 'textShadowBlur', 0, 10).onChange(changeOptions);

    obj.textShadowOffsetX = obj.textShadowOffsetX || 0;
    ui.add(obj, 'textShadowOffsetX', 0, 10).onChange(changeOptions);

    obj.textShadowOffsetY = obj.textShadowOffsetY || 0;
    ui.add(obj, 'textShadowOffsetY', 0, 10).onChange(changeOptions);

    obj.overflow = obj.overflow || 'none';
    ui.add(obj, 'overflow', utils.overflow.enum).onChange(changeOptions);

    obj.ellipsis = obj.ellipsis || '...';
    ui.add(obj, 'ellipsis').onChange(changeOptions);

    obj.lineOverflow = obj.lineOverflow || 'none';
    ui.add(obj, 'lineOverflow', utils.lineOverflow.enum).onChange(
      changeOptions
    );

    return changeOptions;
  }
}
