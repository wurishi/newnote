module testgame {
  import Pool = entitas.Pool;
  import Group = entitas.Group;
  import Entity = entitas.Entity;
  import Matcher = entitas.Matcher;
  import Exception = entitas.Exception;
  import TriggerOnEvent = entitas.TriggerOnEvent;
  
  import IInitializeSystem = entitas.IInitializeSystem;
  
  import IEnsureComponents = entitas.IEnsureComponents;
  
  import ISetPool = entitas.ISetPool;
  
  export class ViewDemoSystem implements IInitializeSystem, IEnsureComponents, ISetPool {
    
    
    
    
    
    protected pool:Pool;
    protected group:Group;
    
    
    
    public initialize() {
      throw new Error('initialize not implemented.');
    }
    
    
    public get ensureComponents(): entitas.IMatcher {
      throw new Error('get ensureComponents not implemented.');
    }
    
    
    public setPool(pool:Pool) {
      this.pool = pool;
      this.group = pool.getGroup(Matcher.allOf());
    }
    
    
  }
}
