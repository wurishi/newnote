var entitas;
(function (entitas) {
    "use strict";
    /**
     * As
     * Retuns the object if it implements the interface, else null
     *
     * @param object
     * @param method
     * @returns Object
     */
    function as(object, method) {
        return method in object ? object : null;
    }
    class Systems {
        /**
         * @constructor
         *
         */
        constructor() {
            this._initializeSystems = [];
            this._executeSystems = [];
            /**
             * Load Extensions
             */
        }
        /**
         * Add System
         * @param system
         * @returns {entitas.Systems}
         */
        add(system) {
            if ('function' === typeof system) {
                const Klass = system;
                system = new Klass();
            }
            const reactiveSystem = as(system, 'subsystem');
            const initializeSystem = reactiveSystem != null
                ? as(reactiveSystem.subsystem, 'initialize')
                : as(system, 'initialize');
            if (initializeSystem != null) {
                const _initializeSystems = this._initializeSystems;
                _initializeSystems[_initializeSystems.length] = initializeSystem;
            }
            const executeSystem = as(system, 'execute');
            if (executeSystem != null) {
                const _executeSystems = this._executeSystems;
                _executeSystems[_executeSystems.length] = executeSystem;
            }
            return this;
        }
        /**
         * Initialize Systems
         */
        initialize() {
            for (let i = 0, initializeSysCount = this._initializeSystems.length; i < initializeSysCount; i++) {
                this._initializeSystems[i].initialize();
            }
        }
        /**
         * Execute sustems
         */
        execute() {
            const executeSystems = this._executeSystems;
            for (let i = 0, exeSysCount = executeSystems.length; i < exeSysCount; i++) {
                executeSystems[i].execute();
            }
        }
        /**
         * Clear subsystems
         */
        clearReactiveSystems() {
            for (let i = 0, exeSysCount = this._executeSystems.length; i < exeSysCount; i++) {
                const reactiveSystem = as(this._executeSystems[i], 'subsystem');
                if (reactiveSystem != null) {
                    reactiveSystem.clear();
                }
                const nestedSystems = as(this._executeSystems[i], 'clearReactiveSystems');
                if (nestedSystems != null) {
                    nestedSystems.clearReactiveSystems();
                }
            }
        }
    }
    entitas.Systems = Systems;
})(entitas || (entitas = {}));