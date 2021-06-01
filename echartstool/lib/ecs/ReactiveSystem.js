var entitas;
(function (entitas) {
    "use strict";
    var GroupObserver = entitas.GroupObserver;
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
    class ReactiveSystem {
        /**
         * @constructor
         *
         * @param pool
         * @param subSystem
         */
        constructor(pool, subSystem) {
            const triggers = 'triggers' in subSystem ? subSystem['triggers'] : [subSystem['trigger']];
            this._subsystem = subSystem;
            const ensureComponents = as(subSystem, 'ensureComponents');
            if (ensureComponents != null) {
                this._ensureComponents = ensureComponents.ensureComponents;
            }
            const excludeComponents = as(subSystem, 'excludeComponents');
            if (excludeComponents != null) {
                this._excludeComponents = excludeComponents.excludeComponents;
            }
            this._clearAfterExecute = as(subSystem, 'clearAfterExecute') != null;
            const triggersLength = triggers.length;
            const groups = new Array(triggersLength);
            const eventTypes = new Array(triggersLength);
            for (let i = 0; i < triggersLength; i++) {
                const trigger = triggers[i];
                groups[i] = pool.getGroup(trigger.trigger);
                eventTypes[i] = trigger.eventType;
            }
            this._observer = new GroupObserver(groups, eventTypes);
            this._buffer = [];
        }
        /**
         * Get subsystems
         * @type {entitas.IReactiveExecuteSystem}
         * @name entitas.Pool#subsystem */
        get subsystem() { return this._subsystem; }
        activate() {
            this._observer.activate();
        }
        deactivate() {
            this._observer.deactivate();
        }
        clear() {
            this._observer.clearCollectedEntities();
        }
        /**
         * execute
         */
        execute() {
            const collectedEntities = this._observer.collectedEntities;
            const ensureComponents = this._ensureComponents;
            const excludeComponents = this._excludeComponents;
            const buffer = this._buffer;
            let j = buffer.length;
            if (Object.keys(collectedEntities).length != 0) {
                if (ensureComponents) {
                    if (excludeComponents) {
                        for (let k in collectedEntities) {
                            const e = collectedEntities[k];
                            if (ensureComponents.matches(e) && !excludeComponents.matches(e)) {
                                buffer[j++] = e.addRef();
                            }
                        }
                    }
                    else {
                        for (let k in collectedEntities) {
                            const e = collectedEntities[k];
                            if (ensureComponents.matches(e)) {
                                buffer[j++] = e.addRef();
                            }
                        }
                    }
                }
                else if (excludeComponents) {
                    for (let k in collectedEntities) {
                        const e = collectedEntities[k];
                        if (!excludeComponents.matches(e)) {
                            buffer[j++] = e.addRef();
                        }
                    }
                }
                else {
                    for (let k in collectedEntities) {
                        const e = collectedEntities[k];
                        buffer[j++] = e.addRef();
                    }
                }
                this._observer.clearCollectedEntities();
                if (buffer.length != 0) {
                    this._subsystem.execute(buffer);
                    for (let i = 0, bufferCount = buffer.length; i < bufferCount; i++) {
                        buffer[i].release();
                    }
                    buffer.length = 0;
                    if (this._clearAfterExecute) {
                        this._observer.clearCollectedEntities();
                    }
                }
            }
        }
    }
    entitas.ReactiveSystem = ReactiveSystem;
})(entitas || (entitas = {}));