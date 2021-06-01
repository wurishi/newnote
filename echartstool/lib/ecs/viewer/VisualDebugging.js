/**
 * Inspired by Unity
 */
var entitas;
(function (entitas) {
    var viewer;
    (function (viewer) {
        var Systems = entitas.Systems;
        var EntityBehavior = entitas.viewer.EntityBehavior;
        var SystemObserver = entitas.viewer.SystemObserver;
        var PoolObserver = entitas.viewer.PoolObserver;
        /**
         * @class VisualDebugging
         */
        class VisualDebugging {
            /**
             *
             * @param pool
             */
            static init(pool) {
                if ((pool._debug || location.search === "?debug=true") && window['dat']) {
                    viewer.gui = new dat.GUI({ height: 5 * 32 - 1, width: 300 });
                    const observer = new PoolObserver(pool);
                    VisualDebugging._controllers = {};
                    VisualDebugging._entities = viewer.gui.addFolder('Entities');
                    VisualDebugging._pools = viewer.gui.addFolder('Pools');
                    VisualDebugging._systems = viewer.gui.addFolder('Systems');
                    VisualDebugging._entities.open();
                    VisualDebugging._pools.open();
                    VisualDebugging._systems.open();
                    VisualDebugging._pools.add(observer, 'entities').listen();
                    VisualDebugging._pools.add(observer, 'reusable').listen();
                    pool.onEntityCreated.add((pool, entity) => {
                        const proxy = new EntityBehavior(entity);
                        VisualDebugging._controllers[entity.id] = VisualDebugging._entities.add(proxy, proxy.name).listen();
                    });
                    pool.onEntityDestroyed.add((pool, entity) => {
                        const controller = VisualDebugging._controllers[entity.id];
                        delete VisualDebugging._controllers[entity.id];
                        VisualDebugging._entities.remove(controller);
                    });
                    /** Wrap the Systems::initialize method */
                    const superInitialize = Systems.prototype.initialize;
                    Systems.prototype.initialize = function () {
                        superInitialize.call(this);
                        const sys = new SystemObserver(this);
                        VisualDebugging._systems.add(sys, 'initialize').listen();
                        VisualDebugging._systems.add(sys, 'execute').listen();
                    };
                    // function get_Systems() {
                    //   return "Systems " + " (" +
                    //     this._initializeSystems.length + " init, " +
                    //     this._executeSystems.length + " exe "
                    // }
                    Object.defineProperty(Systems.prototype, 'name', { get: () => 'Systems' });
                    Object.defineProperty(Systems.prototype, 'Systems', { get: () => {
                            return "Systems " + " (" +
                                this['_initializeSystems'].length + " init, " +
                                this['_executeSystems'].length + " exe ";
                        } });
                }
            }
        }
        viewer.VisualDebugging = VisualDebugging;
    })(viewer = entitas.viewer || (entitas.viewer = {}));
})(entitas || (entitas = {}));