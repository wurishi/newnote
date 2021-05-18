module test {

  declare var dat;

  import Pools = test.Pools;
  import Systems = entitas.Systems;

  export class GameController {

    systems:Systems;

    start() {

      var html = document.getElementsByTagName('html')[0];
      html.style.backgroundImage = 'none';


      this.systems = this.createSystems(Pools.pool);
      this.systems.initialize();

    }

    update(delta:number) {
      this.systems.execute();
    }

    createSystems(pool) {
      return new Systems()
        // Input
        .add(pool.createSystem(test.ProcessInputSystem))

        // Update
        .add(pool.createSystem(test.ScoreSystem))

        // Render
        .add(pool.createSystem(test.RemoveViewSystem))
        .add(pool.createSystem(test.AddViewSystem))
        .add(pool.createSystem(test.RenderPositionSystem))

        // Destroy
        .add(pool.createSystem(test.DestroySystem));

    }
  }
}