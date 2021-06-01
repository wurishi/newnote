var entitas;
(function (entitas) {
    var viewer;
    (function (viewer) {
        /** todo: SystemObserver track time spent in ms by system */
        /**
         * Profiler class for Systems
         */
        class SystemObserver {
            /**
             * @constructor
             *
             * @param _systems
             */
            constructor(_systems) {
                this._systems = _systems;
            }
            get name() {
                return "Systems";
            }
            get Systems() {
                return "Systems " + " (" +
                    this._systems._initializeSystems.length + " init, " +
                    this._systems._executeSystems.length + " exe ";
            }
            get initialize() {
                return this._systems._initializeSystems.length;
            }
            get execute() {
                return this._systems._executeSystems.length;
            }
        }
        viewer.SystemObserver = SystemObserver;
    })(viewer = entitas.viewer || (entitas.viewer = {}));
})(entitas || (entitas = {}));