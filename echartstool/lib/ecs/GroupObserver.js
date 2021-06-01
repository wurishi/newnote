var entitas;
(function (entitas) {
    "use strict";
    var GroupEventType = entitas.GroupEventType;
    var GroupObserverException = entitas.exceptions.GroupObserverException;
    class GroupObserver {
        /**
         * @constructor
         * @param {Array<entitas.Group>} groups
         * @param {number} eventTypes
         */
        constructor(groups, eventTypes) {
            this._collectedEntities = {};
            this._groups = null;
            this._eventTypes = null;
            this._addEntityCache = null;
            /**
             * Adds an entity to this observer group
             * @param group
             * @param {entitas.Entity}entity
             * @param index
             * @param {entitas.IComponent}component
             */
            this.addEntity = (group, entity, index, component) => {
                if (!(entity.id in this._collectedEntities)) {
                    this._collectedEntities[entity.id] = entity;
                    entity.addRef();
                }
            };
            this._groups = Array.isArray(groups) ? groups : [groups];
            this._eventTypes = Array.isArray(eventTypes) ? eventTypes : [eventTypes];
            if (groups.length !== eventTypes.length) {
                throw new GroupObserverException("Unbalanced count with groups (" + groups.length +
                    ") and event types (" + eventTypes.length + ")");
            }
            this._collectedEntities = {};
            this._addEntityCache = this.addEntity;
            this.activate();
        }
        /**
         * Entities being observed
         * @type {Object<string,entitas.Entity>}
         * @name entitas.GroupObserver#collectedEntities */
        get collectedEntities() { return this._collectedEntities; }
        /**
         * Activate events
         */
        activate() {
            for (let i = 0, groupsLength = this._groups.length; i < groupsLength; i++) {
                const group = this._groups[i];
                const eventType = this._eventTypes[i];
                if (eventType === GroupEventType.OnEntityAdded) {
                    group.onEntityAdded.remove(this._addEntityCache);
                    group.onEntityAdded.add(this._addEntityCache);
                }
                else if (eventType === GroupEventType.OnEntityRemoved) {
                    group.onEntityRemoved.remove(this._addEntityCache);
                    group.onEntityRemoved.add(this._addEntityCache);
                }
                else if (eventType === GroupEventType.OnEntityAddedOrRemoved) {
                    group.onEntityAdded.remove(this._addEntityCache);
                    group.onEntityAdded.add(this._addEntityCache);
                    group.onEntityRemoved.remove(this._addEntityCache);
                    group.onEntityRemoved.add(this._addEntityCache);
                }
                else {
                    throw `Invalid eventType [${typeof eventType}:${eventType}] in GroupObserver::activate`;
                }
            }
        }
        /**
         * Deavtivate events
         */
        deactivate() {
            for (let i = 0, groupsLength = this._groups.length; i < groupsLength; i++) {
                const group = this._groups[i];
                group.onEntityAdded.remove(this._addEntityCache);
                group.onEntityRemoved.remove(this._addEntityCache);
                this.clearCollectedEntities();
            }
        }
        /**
         * Clear the list of entities
         */
        clearCollectedEntities() {
            for (let e in this._collectedEntities) {
                this._collectedEntities[e].release();
            }
            this._collectedEntities = {};
        }
    }
    entitas.GroupObserver = GroupObserver;
})(entitas || (entitas = {}));