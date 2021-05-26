/// <reference path="../../ext/testgame.d.ts"/>

import Pool = entitas.Pool;
import Group = entitas.Group;
import Entity = entitas.Entity;
import Matcher = entitas.Matcher;
import Exception = entitas.Exception;
import TriggerOnEvent = entitas.TriggerOnEvent;
import ReactiveSystem = entitas.ReactiveSystem;

import IReactiveSystem = entitas.IReactiveSystem;
import IInitializeSystem = entitas.IInitializeSystem;
import ISetPool = entitas.ISetPool;

export class DebugMessageSystem
  implements IReactiveSystem, IInitializeSystem, ISetPool
{
  protected pool: Pool;

  public setPool(pool: Pool) {
    this.pool = pool;
  }

  initialize() {
    this.pool.setDebugMessage('Hello World');
  }
  public get trigger(): TriggerOnEvent {
    return Matcher.DebugMessage.onEntityAdded();
  }
  public execute(entities: Array<Entity>) {
    for (let i = 0, len = entities.length; i < len; i++) {
      const e = entities[i];
      if (e.hasDebugMessage) {
        console.log(e.debugMessage.msg);
      }
    }
  }
}
