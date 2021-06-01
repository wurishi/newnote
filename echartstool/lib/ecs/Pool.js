var entitas;
(function (entitas) {
    "use strict";
    var UUID = entitas.utils.UUID;
    var Bag = entitas.utils.Bag;
    var Group = entitas.Group;
    var Entity = entitas.Entity;
    var Signal = entitas.utils.Signal;
    var EntityIsNotDestroyedException = entitas.exceptions.EntityIsNotDestroyedException;
    var PoolDoesNotContainEntityException = entitas.exceptions.PoolDoesNotContainEntityException;
    function as(obj, method1) {
        return method1 in obj ? obj : null;
    }
    /**
     * A cached pool of entities and components.
     * The games world.
     */
    class Pool {
        /**
         * @constructor
         * @param {Object} components
         * @param {number} totalComponents
         * @param {number} startCreationIndex
         */
        constructor(components, totalComponents, debug = false, startCreationIndex = 0) {
            /**
             * Subscribe to Entity Created Event
             * @type {entitas.utils.ISignal} */
            this.onEntityCreated = null;
            /**
             * Subscribe to Entity Will Be Destroyed Event
             * @type {entitas.utils.ISignal} */
            this.onEntityWillBeDestroyed = null;
            /**
             * Subscribe to Entity Destroyed Event
             * @type {entitas.utils.ISignal} */
            this.onEntityDestroyed = null;
            /**
             * Subscribe to Group Created Event
             * @type {entitas.utils.ISignal} */
            this.onGroupCreated = null;
            /**
             * Entity name for debugging
             * @type {string} */
            this.name = '';
            this._debug = false;
            this._entities = {};
            this._groups = {};
            this._groupsForIndex = null;
            this._reusableEntities = new Bag();
            this._retainedEntities = {};
            this._componentsEnum = null;
            this._totalComponents = 0;
            this._creationIndex = 0;
            this._entitiesCache = null;
            /**
             * @param {entitas.Entity} entity
             * @param {number} index
             * @param {entitas.IComponent} component
             */
            this.updateGroupsComponentAddedOrRemoved = (entity, index, component) => {
                const groups = this._groupsForIndex[index];
                if (groups != null) {
                    for (let i = 0, groupsCount = groups.size(); i < groupsCount; i++) {
                        groups[i].handleEntity(entity, index, component);
                    }
                }
            };
            /**
             * @param {entitas.Entity} entity
             * @param {number} index
             * @param {entitas.IComponent} previousComponent
             * @param {entitas.IComponent} newComponent
             */
            this.updateGroupsComponentReplaced = (entity, index, previousComponent, newComponent) => {
                const groups = this._groupsForIndex[index];
                if (groups != null) {
                    for (let i = 0, groupsCount = groups.size(); i < groupsCount; i++) {
                        groups[i].updateEntity(entity, index, previousComponent, newComponent);
                    }
                }
            };
            /**
             * @param {entitas.Entity} entity
             */
            this.onEntityReleased = (entity) => {
                if (entity._isEnabled) {
                    throw new EntityIsNotDestroyedException("Cannot release entity.");
                }
                entity.onEntityReleased.remove(this._cachedOnEntityReleased);
                delete this._retainedEntities[entity.id];
                this._reusableEntities.add(entity);
            };
            Pool.instance = this;
            this.onGroupCreated = new Signal(this);
            this.onEntityCreated = new Signal(this);
            this.onEntityDestroyed = new Signal(this);
            this.onEntityWillBeDestroyed = new Signal(this);
            this._debug = debug;
            this._componentsEnum = components;
            this._totalComponents = totalComponents;
            this._creationIndex = startCreationIndex;
            this._groupsForIndex = new Bag();
            this._cachedUpdateGroupsComponentAddedOrRemoved = this.updateGroupsComponentAddedOrRemoved;
            this._cachedUpdateGroupsComponentReplaced = this.updateGroupsComponentReplaced;
            this._cachedOnEntityReleased = this.onEntityReleased;
            Pool.componentsEnum = components;
            Pool.totalComponents = totalComponents;
        }
        /**
         * The total number of components in this pool
         * @type {number}
         * @name entitas.Pool#totalComponents */
        get totalComponents() { return this._totalComponents; }
        /**
         * Count of active entities
         * @type {number}
         * @name entitas.Pool#count */
        get count() { return Object.keys(this._entities).length; }
        /**
         * Count of entities waiting to be recycled
         * @type {number}
         * @name entitas.Pool#reusableEntitiesCount */
        get reusableEntitiesCount() { return this._reusableEntities.size(); }
        /**
         * Count of entities that sill have references
         * @type {number}
         * @name entitas.Pool#retainedEntitiesCount */
        get retainedEntitiesCount() { return Object.keys(this._retainedEntities).length; }
        // public getEntities(matcher: IMatcher): Entity[];
        // public getEntities(): Entity[];
        // public createSystem(system: ISystem);
        // public createSystem(system: Function);
        /**
         * Set the system pool if supported
         *
         * @static
         * @param {entitas.ISystem} system
         * @param {entitas.Pool} pool
         */
        static setPool(system, pool) {
            const poolSystem = as(system, 'setPool');
            if (poolSystem != null) {
                poolSystem.setPool(pool);
            }
        }
        /**
         * Create a new entity
         * @param {string} name
         * @returns {entitas.Entity}
         */
        createEntity(name) {
            const entity = this._reusableEntities.size() > 0 ? this._reusableEntities.removeLast() : new Entity(this._componentsEnum, this._totalComponents);
            entity._isEnabled = true;
            entity.name = name;
            entity._creationIndex = this._creationIndex++;
            entity.id = UUID.randomUUID();
            entity.addRef();
            this._entities[entity.id] = entity;
            this._entitiesCache = null;
            entity.onComponentAdded.add(this._cachedUpdateGroupsComponentAddedOrRemoved);
            entity.onComponentRemoved.add(this._cachedUpdateGroupsComponentAddedOrRemoved);
            entity.onComponentReplaced.add(this._cachedUpdateGroupsComponentReplaced);
            entity.onEntityReleased.add(this._cachedOnEntityReleased);
            const onEntityCreated = this.onEntityCreated;
            if (onEntityCreated.active)
                onEntityCreated.dispatch(this, entity);
            return entity;
        }
        /**
         * Destroy an entity
         * @param {entitas.Entity} entity
         */
        destroyEntity(entity) {
            if (!(entity.id in this._entities)) {
                throw new PoolDoesNotContainEntityException(entity, "Could not destroy entity!");
            }
            delete this._entities[entity.id];
            this._entitiesCache = null;
            const onEntityWillBeDestroyed = this.onEntityWillBeDestroyed;
            if (onEntityWillBeDestroyed.active)
                onEntityWillBeDestroyed.dispatch(this, entity);
            entity.destroy();
            const onEntityDestroyed = this.onEntityDestroyed;
            if (onEntityDestroyed.active)
                onEntityDestroyed.dispatch(this, entity);
            if (entity._refCount === 1) {
                entity.onEntityReleased.remove(this._cachedOnEntityReleased);
                this._reusableEntities.add(entity);
            }
            else {
                this._retainedEntities[entity.id] = entity;
            }
            entity.release();
        }
        /**
         * Destroy All Entities
         */
        destroyAllEntities() {
            const entities = this.getEntities();
            for (let i = 0, entitiesLength = entities.length; i < entitiesLength; i++) {
                this.destroyEntity(entities[i]);
            }
        }
        /**
         * Check if pool has this entity
         *
         * @param {entitas.Entity} entity
         * @returns {boolean}
         */
        hasEntity(entity) {
            return entity.id in this._entities;
        }
        /**
         * Gets all of the entities
         *
         * @returns {Array<entitas.Entity>}
         */
        getEntities(matcher) {
            if (matcher) {
                /** PoolExtension::getEntities */
                return this.getGroup(matcher).getEntities();
            }
            else {
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
            // if (this._entitiesCache == null) {
            //   const entities = this._entities
            //   const keys = Object.keys(entities)
            //   const length = keys.length
            //   const entitiesCache = this._entitiesCache = new Array(length)
            //   for (let i = 0; i < length; i++) {
            //     const k = keys[i]
            //     entitiesCache[i] = entities[k]
            //   }
            // }
            // return entitiesCache
        }
        /**
         * Create System
         * @param {entitas.ISystem|Function}
         * @returns {entitas.ISystem}
         */
        createSystem(system) {
            if ('function' === typeof system) {
                const Klass = system;
                system = new Klass();
            }
            Pool.setPool(system, this);
            const reactiveSystem = as(system, 'trigger');
            if (reactiveSystem != null) {
                return new entitas.ReactiveSystem(this, reactiveSystem);
            }
            const multiReactiveSystem = as(system, 'triggers');
            if (multiReactiveSystem != null) {
                return new entitas.ReactiveSystem(this, multiReactiveSystem);
            }
            return system;
        }
        /**
         * Gets all of the entities that match
         *
         * @param {entias.IMatcher} matcher
         * @returns {entitas.Group}
         */
        getGroup(matcher) {
            let group;
            if (matcher.id in this._groups) {
                group = this._groups[matcher.id];
            }
            else {
                group = new Group(matcher);
                const entities = this.getEntities();
                for (let i = 0, entitiesLength = entities.length; i < entitiesLength; i++) {
                    group.handleEntitySilently(entities[i]);
                }
                this._groups[matcher.id] = group;
                for (let i = 0, indicesLength = matcher.indices.length; i < indicesLength; i++) {
                    const index = matcher.indices[i];
                    if (this._groupsForIndex[index] == null) {
                        this._groupsForIndex[index] = new Bag();
                    }
                    this._groupsForIndex[index].add(group);
                }
                const onGroupCreated = this.onGroupCreated;
                if (onGroupCreated.active)
                    onGroupCreated.dispatch(this, group);
            }
            return group;
        }
    }
    /**
     * An enum of valid component types
     * @type {Object<string,number>} */
    Pool.componentsEnum = null;
    /**
     * Count of components
     * @type {number} */
    Pool.totalComponents = 0;
    /**
     * Global reference to pool instance
     * @type {entitas.Pool} */
    Pool.instance = null;
    entitas.Pool = Pool;
})(entitas || (entitas = {}));