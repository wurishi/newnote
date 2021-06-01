/**
 * entitas ecs
 * @const
 */
var entitas;
(function (entitas) {
    "use strict";
    var Signal = entitas.utils.Signal;
    var EntityIsNotEnabledException = entitas.exceptions.EntityIsNotEnabledException;
    var EntityIsAlreadyReleasedException = entitas.exceptions.EntityIsAlreadyReleasedException;
    var EntityAlreadyHasComponentException = entitas.exceptions.EntityAlreadyHasComponentException;
    var EntityDoesNotHaveComponentException = entitas.exceptions.EntityDoesNotHaveComponentException;
    class Entity {
        /**
         * The basic game object. Everything is an entity with components that
         * are added / removed as needed.
         *
         * @param {Object} componentsEnum
         * @param {number} totalComponents
         * @constructor
         */
        constructor(componentsEnum, totalComponents = 16) {
            /**
             * Subscribe to Entity Released Event
             * @type {entitas.ISignal} */
            this.onEntityReleased = null;
            /**
             * Subscribe to Component Added Event
             * @type {entitas.ISignal} */
            this.onComponentAdded = null;
            /**
             * Subscribe to Component Removed Event
             * @type {entitas.ISignal} */
            this.onComponentRemoved = null;
            /**
             * Subscribe to Component Replaced Event
             * @type {entitas.ISignal} */
            this.onComponentReplaced = null;
            /**
             * Entity name
             * @type {string} */
            this.name = '';
            /**
             *  Entity Id
             * @type {string} */
            this.id = '';
            /**
             *  Instance index
             * @type {number} */
            this.instanceIndex = 0;
            this._creationIndex = 0;
            this._isEnabled = true;
            this._components = null;
            this._componentsCache = null;
            this._componentIndicesCache = null;
            this._toStringCache = '';
            this._refCount = 0;
            this._pool = null;
            this._componentsEnum = null;
            this.onEntityReleased = new Signal(this);
            this.onComponentAdded = new Signal(this);
            this.onComponentRemoved = new Signal(this);
            this.onComponentReplaced = new Signal(this);
            this._componentsEnum = componentsEnum;
            this._pool = entitas.Pool.instance;
            this._components = this.initialize(totalComponents);
        }
        /**
         * A unique sequential index number assigned to each entity at creation
         * @type {number}
         * @name entitas.Entity#creationIndex */
        get creationIndex() { return this._creationIndex; }
        static initialize(totalComponents, options) {
            Entity.size = options.entities || 100;
        }
        /**
         * allocate entity pool
         *
         * @param count number of components
         * @param size max number of entities
         */
        static dim(count, size) {
            Entity.alloc = new Array(size);
            for (let e = 0; e < size; e++) {
                Entity.alloc[e] = new Array(count);
                for (let k = 0; k < count; k++) {
                    Entity.alloc[e][k] = null;
                }
            }
        }
        /**
         * Initialize
         * allocate the entity pool.
         *
         * @param {number} totalComponents
         * @returns {Array<entitas.IComponent>}
         */
        initialize(totalComponents) {
            let mem;
            const size = Entity.size;
            if (Entity.alloc == null)
                Entity.dim(totalComponents, size);
            const alloc = Entity.alloc;
            this.instanceIndex = Entity.instanceIndex++;
            if (mem = alloc[this.instanceIndex])
                return mem;
            console.log('Insufficient memory allocation at ', this.instanceIndex, '. Allocating ', size, ' entities.');
            for (let i = this.instanceIndex, l = i + size; i < l; i++) {
                alloc[i] = new Array(totalComponents);
                for (let k = 0; k < totalComponents; k++) {
                    alloc[i][k] = null;
                }
            }
            mem = alloc[this.instanceIndex];
            return mem;
        }
        /**
         * AddComponent
         *
         * @param {number} index
         * @param {entitas.IComponent} component
         * @returns {entitas.Entity}
         */
        addComponent(index, component) {
            if (!this._isEnabled) {
                throw new EntityIsNotEnabledException("Cannot add component!");
            }
            if (this.hasComponent(index)) {
                const errorMsg = "Cannot add component at index " + index + " to " + this;
                throw new EntityAlreadyHasComponentException(errorMsg, index);
            }
            this._components[index] = component;
            this._componentsCache = null;
            this._componentIndicesCache = null;
            this._toStringCache = null;
            const onComponentAdded = this.onComponentAdded;
            if (onComponentAdded.active)
                onComponentAdded.dispatch(this, index, component);
            return this;
        }
        /**
         * RemoveComponent
         *
         * @param {number} index
         * @returns {entitas.Entity}
         */
        removeComponent(index) {
            if (!this._isEnabled) {
                throw new EntityIsNotEnabledException("Cannot remove component!");
            }
            if (!this.hasComponent(index)) {
                const errorMsg = "Cannot remove component at index " + index + " from " + this;
                throw new EntityDoesNotHaveComponentException(errorMsg, index);
            }
            this._replaceComponent(index, null);
            return this;
        }
        /**
         * ReplaceComponent
         *
         * @param {number} index
         * @param {entitas.IComponent} component
         * @returns {entitas.Entity}
         */
        replaceComponent(index, component) {
            if (!this._isEnabled) {
                throw new EntityIsNotEnabledException("Cannot replace component!");
            }
            if (this.hasComponent(index)) {
                this._replaceComponent(index, component);
            }
            else if (component != null) {
                this.addComponent(index, component);
            }
            return this;
        }
        _replaceComponent(index, replacement) {
            const components = this._components;
            const previousComponent = components[index];
            if (previousComponent === replacement) {
                let onComponentReplaced = this.onComponentReplaced;
                if (onComponentReplaced.active)
                    onComponentReplaced.dispatch(this, index, previousComponent, replacement);
            }
            else {
                components[index] = replacement;
                this._componentsCache = null;
                if (replacement == null) {
                    //delete components[index]
                    components[index] = null;
                    this._componentIndicesCache = null;
                    this._toStringCache = null;
                    const onComponentRemoved = this.onComponentRemoved;
                    if (onComponentRemoved.active)
                        onComponentRemoved.dispatch(this, index, previousComponent);
                }
                else {
                    const onComponentReplaced = this.onComponentReplaced;
                    if (onComponentReplaced.active)
                        onComponentReplaced.dispatch(this, index, previousComponent, replacement);
                }
            }
        }
        /**
         * GetComponent
         *
         * @param {number} index
         * @param {entitas.IComponent} component
         */
        getComponent(index) {
            if (!this.hasComponent(index)) {
                const errorMsg = "Cannot get component at index " + index + " from " + this;
                throw new EntityDoesNotHaveComponentException(errorMsg, index);
            }
            return this._components[index];
        }
        /**
         * GetComponents
         *
         * @returns {Array<entitas.IComponent>}
         */
        getComponents() {
            if (this._componentsCache == null) {
                const components = [];
                const _components = this._components;
                for (let i = 0, j = 0, componentsLength = _components.length; i < componentsLength; i++) {
                    const component = _components[i];
                    if (component != null) {
                        components[j++] = component;
                    }
                }
                this._componentsCache = components;
            }
            return this._componentsCache;
        }
        /**
         * GetComponentIndices
         *
         * @returns {Array<number>}
         */
        getComponentIndices() {
            if (this._componentIndicesCache == null) {
                const indices = [];
                const _components = this._components;
                for (let i = 0, j = 0, componentsLength = _components.length; i < componentsLength; i++) {
                    if (_components[i] != null) {
                        indices[j++] = i;
                    }
                }
                this._componentIndicesCache = indices;
            }
            return this._componentIndicesCache;
        }
        /**
         * HasComponent
         *
         * @param {number} index
         * @returns {boolean}
         */
        hasComponent(index) {
            return this._components[index] != null;
        }
        /**
         * HasComponents
         *
         * @param {Array<number>} indices
         * @returns {boolean}
         */
        hasComponents(indices) {
            const _components = this._components;
            for (let i = 0, indicesLength = indices.length; i < indicesLength; i++) {
                if (_components[indices[i]] == null) {
                    return false;
                }
            }
            return true;
        }
        /**
         * HasAnyComponent
         *
         * @param {Array<number>} indices
         * @returns {boolean}
         */
        hasAnyComponent(indices) {
            const _components = this._components;
            for (let i = 0, indicesLength = indices.length; i < indicesLength; i++) {
                if (_components[indices[i]] != null) {
                    return true;
                }
            }
            return false;
        }
        /**
         * RemoveAllComponents
         *
         */
        removeAllComponents() {
            this._toStringCache = null;
            const _components = this._components;
            for (let i = 0, componentsLength = _components.length; i < componentsLength; i++) {
                if (_components[i] != null) {
                    this._replaceComponent(i, null);
                }
            }
        }
        /**
         * Destroy
         *
         */
        destroy() {
            this.removeAllComponents();
            this.onComponentAdded.clear();
            this.onComponentReplaced.clear();
            this.onComponentRemoved.clear();
            this._isEnabled = false;
        }
        /**
         * ToString
         *
         * @returns {string}
         */
        toString() {
            if (this._toStringCache == null) {
                const sb = [];
                const seperator = ", ";
                const components = this.getComponents();
                const lastSeperator = components.length - 1;
                for (let i = 0, j = 0, componentsLength = components.length; i < componentsLength; i++) {
                    sb[j++] = components[i].constructor['name'].replace('Component', '') || i + '';
                    if (i < lastSeperator) {
                        sb[j++] = seperator;
                    }
                }
                this._toStringCache = sb.join('');
            }
            return this._toStringCache;
        }
        /**
         * AddRef
         *
         * @returns {entitas.Entity}
         */
        addRef() {
            this._refCount += 1;
            return this;
        }
        /**
         * Release
         *
         */
        release() {
            this._refCount -= 1;
            if (this._refCount === 0) {
                let onEntityReleased = this.onEntityReleased;
                if (onEntityReleased.active)
                    onEntityReleased.dispatch(this);
            }
            else if (this._refCount < 0) {
                throw new EntityIsAlreadyReleasedException();
            }
        }
    }
    /**
     * @static
     * @type {number} */
    Entity.instanceIndex = 0;
    /**
     * @static
     * @type {Array<Array<IComponent>>} */
    Entity.alloc = null;
    /**
     * @static
     * @type {number} */
    Entity.size = 0;
    entitas.Entity = Entity;
})(entitas || (entitas = {}));