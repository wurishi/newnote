var entitas;
(function (entitas) {
    var viewer;
    (function (viewer) {
        /**
         * Profiler class for Entities
         */
        class EntityBehavior {
            /**
             * @constructor
             *
             * @param obj
             */
            constructor(obj) {
                this.obj = obj;
                if (this.obj.name) {
                    this._name = this.obj.name;
                }
                else {
                    this._name = `Entity_${this.obj._creationIndex}`;
                }
                Object.defineProperty(this, this._name, { get: () => this.obj.toString() });
            }
            get name() {
                return this._name;
            }
        }
        viewer.EntityBehavior = EntityBehavior;
    })(viewer = entitas.viewer || (entitas.viewer = {}));
})(entitas || (entitas = {}));