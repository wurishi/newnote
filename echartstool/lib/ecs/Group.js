var entitas;
(function (entitas) {
    "use strict";
    var Signal = entitas.utils.Signal;
    var GroupEventType = entitas.GroupEventType;
    var SingleEntityException = entitas.exceptions.SingleEntityException;
    class Group {
        /**
         * @constructor
         * @param matcher
         */
        constructor(matcher) {
            /**
             * Subscribe to Entity Addded events
             * @type {entitas.utils.ISignal} */
            this.onEntityAdded = null;
            /**
             * Subscribe to Entity Removed events
             * @type {entitas.utils.ISignal} */
            this.onEntityRemoved = null;
            /**
             * Subscribe to Entity Updated events
             * @type {entitas.utils.ISignal} */
            this.onEntityUpdated = null;
            this._entities = {};
            this._matcher = null;
            this._entitiesCache = null;
            this._singleEntityCache = null;
            this._toStringCache = '';
            this._entities = {};
            this.onEntityAdded = new Signal(this);
            this.onEntityRemoved = new Signal(this);
            this.onEntityUpdated = new Signal(this);
            this._matcher = matcher;
        }
        /**
         * Count the number of entities in this group
         * @type {number}
         * @name entitas.Group#count */
        get count() { return Object.keys(this._entities).length; }
        /**
         * Get the Matcher for this group
         * @type {entitas.IMatcher}
         * @name entitas.Group#matcher */
        get matcher() { return this._matcher; }
        /**
         * Create an Observer for the event type on this group
         * @param eventType
         */
        createObserver(eventType) {
            if (eventType === undefined)
                eventType = GroupEventType.OnEntityAdded;
            return new entitas.GroupObserver(this, eventType);
        }
        /**
         * Handle adding and removing component from the entity without raising events
         * @param entity
         */
        handleEntitySilently(entity) {
            if (this._matcher.matches(entity)) {
                this.addEntitySilently(entity);
            }
            else {
                this.removeEntitySilently(entity);
            }
        }
        /**
         * Handle adding and removing component from the entity and raisieevents
         * @param entity
         * @param index
         * @param component
         */
        handleEntity(entity, index, component) {
            if (this._matcher.matches(entity)) {
                this.addEntity(entity, index, component);
            }
            else {
                this.removeEntity(entity, index, component);
            }
        }
        /**
         * Update entity and raise events
         * @param entity
         * @param index
         * @param previousComponent
         * @param newComponent
         */
        updateEntity(entity, index, previousComponent, newComponent) {
            if (entity.id in this._entities) {
                const onEntityRemoved = this.onEntityRemoved;
                if (onEntityRemoved.active)
                    onEntityRemoved.dispatch(this, entity, index, previousComponent);
                const onEntityAdded = this.onEntityAdded;
                if (onEntityAdded.active)
                    onEntityAdded.dispatch(this, entity, index, newComponent);
                const onEntityUpdated = this.onEntityUpdated;
                if (onEntityUpdated.active)
                    onEntityUpdated.dispatch(this, entity, index, previousComponent, newComponent);
            }
        }
        /**
         * Add entity without raising events
         * @param entity
         */
        addEntitySilently(entity) {
            if (!(entity.id in this._entities)) {
                this._entities[entity.id] = entity;
                this._entitiesCache = null;
                this._singleEntityCache = null;
                entity.addRef();
            }
        }
        /**
         * Add entity and raise events
         * @param entity
         * @param index
         * @param component
         */
        addEntity(entity, index, component) {
            if (!(entity.id in this._entities)) {
                this._entities[entity.id] = entity;
                this._entitiesCache = null;
                this._singleEntityCache = null;
                entity.addRef();
                const onEntityAdded = this.onEntityAdded;
                if (onEntityAdded.active)
                    onEntityAdded.dispatch(this, entity, index, component);
            }
        }
        /**
         * Remove entity without raising events
         * @param entity
         */
        removeEntitySilently(entity) {
            if (entity.id in this._entities) {
                delete this._entities[entity.id];
                this._entitiesCache = null;
                this._singleEntityCache = null;
                entity.release();
            }
        }
        /**
         * Remove entity and raise events
         * @param entity
         * @param index
         * @param component
         */
        removeEntity(entity, index, component) {
            if (entity.id in this._entities) {
                delete this._entities[entity.id];
                this._entitiesCache = null;
                this._singleEntityCache = null;
                let onEntityRemoved = this.onEntityRemoved;
                if (onEntityRemoved.active)
                    onEntityRemoved.dispatch(this, entity, index, component);
                entity.release();
            }
        }
        /**
         * Check if group has this entity
         *
         * @param entity
         * @returns boolean
         */
        containsEntity(entity) {
            return entity.id in this._entities;
        }
        /**
         * Get a list of the entities in this group
         *
         * @returns Array<entitas.Entity>
         */
        getEntities() {
            if (this._entitiesCache == null) {
                const entities = this._entities;
                const keys = Object.keys(entities);
                const length = keys.length;
                const entitiesCache = this._entitiesCache = new Array(length);
                for (let i = 0; i < length; i++) {
                    entitiesCache[i] = entities[keys[i]];
                }
            }
            return this._entitiesCache;
        }
        /**
         * Gets an entity singleton.
         * If a group has more than 1 entity, this is an error condition.
         *
         * @returns entitas.Entity
         */
        getSingleEntity() {
            if (this._singleEntityCache == null) {
                const enumerator = Object.keys(this._entities);
                const c = enumerator.length;
                if (c === 1) {
                    this._singleEntityCache = this._entities[enumerator[0]];
                }
                else if (c === 0) {
                    return null;
                }
                else {
                    throw new SingleEntityException(this._matcher);
                }
            }
            return this._singleEntityCache;
        }
        /**
         * Create a string representation for this group:
         *
         *  ex: 'Group(Position)'
         *
         * @returns string
         */
        toString() {
            if (this._toStringCache == null) {
                this._toStringCache = "Group(" + this._matcher + ")";
            }
            return this._toStringCache;
        }
    }
    entitas.Group = Group;
})(entitas || (entitas = {}));