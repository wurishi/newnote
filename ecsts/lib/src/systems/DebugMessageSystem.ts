module testgame {
  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  
  import IReactiveSystem = entitas.IReactiveSystem;
  
  export class DebugMessageSystem implements IReactiveSystem {
    
    
    
    
    public get trigger(): TriggerOnEvent {
      throw new Error('get trigger not implemented.');
    }
    public execute(entities: Array<Entity>) {
      throw new Error('execute not implemented.');
      for (let i = 0, len = entities.length; i < len; i++) {
        const e = entities[i];
      }
    }
    
    
  }
}
