export module testgame {
  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;

  import IReactiveSystem = entitas.IReactiveSystem;

  export class DebugMessageSystem implements IReactiveSystem {
    public get trigger(): TriggerOnEvent {
      console.log(Matcher.DebugMessage.onEntityAdded());
      return Matcher.DebugMessage.onEntityAdded();
    }
    public execute(entities: Array<Entity>) {
      // console.log(entities);
      // for (let i = 0, len = entities.length; i < len; i++) {
      //   const e = entities[i];
      // }
    }
  }
}
