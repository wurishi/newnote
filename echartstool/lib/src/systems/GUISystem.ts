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

export class GUISystem implements IInitializeSystem, ISetPool {
  protected pool!: Pool;
  public setPool(pool: Pool) {
    this.pool = pool;
  }

  initialize() {
    const ui = new GUI();
    const uiDiv = document.createElement('div');
    uiDiv.style.position = 'fixed';
    uiDiv.style.right = '0';
    uiDiv.style.top = '0';
    uiDiv.appendChild(ui.domElement);
    document.getElementById('app')?.appendChild(uiDiv);
    ui.open();

    this.pool.createEntity('gui').addDatGUI(ui);
  }
}
