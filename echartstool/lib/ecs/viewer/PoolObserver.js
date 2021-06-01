var entitas;
(function (entitas) {
    var viewer;
    (function (viewer) {
        /**
         * Profiler class for Pools
         */
        class PoolObserver {
            /**
             * @constructor
             *
             * @param _pool
             */
            constructor(_pool) {
                this._pool = _pool;
                this._groups = this._pool._groups;
            }
            get name() {
                return "Pool";
            }
            get Pool() {
                return "Pool " + " (" +
                    this._pool.count + " entities, " +
                    this._pool.reusableEntitiesCount + " reusable, " +
                    Object.keys(this._groups).length + " groups)";
            }
            get entities() {
                return this._pool.count;
            }
            get reusable() {
                return this._pool.reusableEntitiesCount;
            }
        }
        viewer.PoolObserver = PoolObserver;
    })(viewer = entitas.viewer || (entitas.viewer = {}));
})(entitas || (entitas = {}));