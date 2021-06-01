var entitas;
(function (entitas) {
    "use strict";
    var MatcherException = entitas.exceptions.MatcherException;
    var TriggerOnEvent = entitas.TriggerOnEvent;
    /**
     * Event Types
     * @readonly
     * @enum {number}
     */
    let GroupEventType;
    (function (GroupEventType) {
        GroupEventType[GroupEventType["OnEntityAdded"] = 0] = "OnEntityAdded";
        GroupEventType[GroupEventType["OnEntityRemoved"] = 1] = "OnEntityRemoved";
        GroupEventType[GroupEventType["OnEntityAddedOrRemoved"] = 2] = "OnEntityAddedOrRemoved";
    })(GroupEventType = entitas.GroupEventType || (entitas.GroupEventType = {}));
    class Matcher {
        /** Extension Points */
        // public onEntityAdded():TriggerOnEvent 
        // public onEntityRemoved():TriggerOnEvent
        // public onEntityAddedOrRemoved():TriggerOnEvent
        /**
         * @constructor
         *
         */
        constructor() {
            this._id = Matcher.uniqueId++;
        }
        /**
         * Get the matcher id
         * @type {number}
         * @name entitas.Matcher#id */
        get id() { return this._id; }
        /**
         * A list of the component ordinals that this matches
         * @type {Array<number>}
         * @name entitas.Matcher#indices */
        get indices() {
            if (!this._indices) {
                this._indices = this.mergeIndices();
            }
            return this._indices;
        }
        /**
         * A unique sequential index number assigned to each entity at creation
         * @type {number}
         * @name entitas.Matcher#allOfIndices */
        get allOfIndices() { return this._allOfIndices; }
        /**
         * A unique sequential index number assigned to each entity at creation
         * @type {number}
         * @name entitas.Matcher#anyOfIndices */
        get anyOfIndices() { return this._anyOfIndices; }
        /**
         * A unique sequential index number assigned to each entity at creation
         * @type {number}
         * @name entitas.Matcher#noneOfIndices */
        get noneOfIndices() { return this._noneOfIndices; }
        /**
         * Matches anyOf the components/indices specified
         * @params {Array<entitas.IMatcher>|Array<number>} args
         * @returns {entitas.Matcher}
         */
        anyOf(...args) {
            if ('number' === typeof args[0] || 'string' === typeof args[0]) {
                this._anyOfIndices = Matcher.distinctIndices(args);
                this._indices = null;
                return this;
            }
            else {
                return this.anyOf.apply(this, Matcher.mergeIndices(args));
            }
        }
        /**
         * Matches noneOf the components/indices specified
         * @params {Array<entitas.IMatcher>|Array<number>} args
         * @returns {entitas.Matcher}
         */
        noneOf(...args) {
            if ('number' === typeof args[0] || 'string' === typeof args[0]) {
                this._noneOfIndices = Matcher.distinctIndices(args);
                this._indices = null;
                return this;
            }
            else {
                return this.noneOf.apply(this, Matcher.mergeIndices(args));
            }
        }
        /**
         * Check if the entity matches this matcher
         * @param {entitas.Entity} entity
         * @returns {boolean}
         */
        matches(entity) {
            const matchesAllOf = this._allOfIndices == null ? true : entity.hasComponents(this._allOfIndices);
            const matchesAnyOf = this._anyOfIndices == null ? true : entity.hasAnyComponent(this._anyOfIndices);
            const matchesNoneOf = this._noneOfIndices == null ? true : !entity.hasAnyComponent(this._noneOfIndices);
            return matchesAllOf && matchesAnyOf && matchesNoneOf;
        }
        /**
         * Merge list of component indices
         * @returns {Array<number>}
         */
        mergeIndices() {
            //const totalIndices = (this._allOfIndices != null ? this._allOfIndices.length : 0)
            //  + (this._anyOfIndices != null ? this._anyOfIndices.length : 0)
            //  + (this._noneOfIndices != null ? this._noneOfIndices.length : 0)
            let indicesList = [];
            if (this._allOfIndices != null) {
                indicesList = indicesList.concat(this._allOfIndices);
            }
            if (this._anyOfIndices != null) {
                indicesList = indicesList.concat(this._anyOfIndices);
            }
            if (this._noneOfIndices != null) {
                indicesList = indicesList.concat(this._noneOfIndices);
            }
            return Matcher.distinctIndices(indicesList);
        }
        /**
         * toString representation of this matcher
         * @returns {string}
         */
        toString() {
            if (this._toStringCache == null) {
                const sb = [];
                if (this._allOfIndices != null) {
                    Matcher.appendIndices(sb, "AllOf", this._allOfIndices);
                }
                if (this._anyOfIndices != null) {
                    if (this._allOfIndices != null) {
                        sb[sb.length] = '.';
                    }
                    Matcher.appendIndices(sb, "AnyOf", this._anyOfIndices);
                }
                if (this._noneOfIndices != null) {
                    Matcher.appendIndices(sb, ".NoneOf", this._noneOfIndices);
                }
                this._toStringCache = sb.join('');
            }
            return this._toStringCache;
        }
        // /**
        //  * Check if the matchers are equal
        //  * @param {Object} obj
        //  * @returns {boolean}
        //  */
        // public equals(obj) {
        //   if (obj == null || obj == null) return false
        //   const matcher:Matcher = obj
        //   if (!Matcher.equalIndices(matcher.allOfIndices, this._allOfIndices)) {
        //     return false
        //   }
        //   if (!Matcher.equalIndices(matcher.anyOfIndices, this._anyOfIndices)) {
        //     return false
        //   }
        //   if (!Matcher.equalIndices(matcher.noneOfIndices, this._noneOfIndices)) {
        //     return false
        //   }
        //   return true
        // }
        // /**
        //  * Check if the lists of component indices are equal
        //  * @param {Array<number>} list1
        //  * @param {Array<number>} list2
        //  * @returns {boolean}
        //  */
        // public static equalIndices(i1:number[], i2:number[]):boolean {
        //   if ((i1 == null) != (i2 == null)) {
        //     return false
        //   }
        //   if (i1 == null) {
        //     return true
        //   }
        //   if (i1.length !== i2.length) {
        //     return false
        //   }
        //   for (let i = 0, indicesLength = i1.length; i < indicesLength; i++) {
        //     /** compare coerced values so we can compare string type to number type */
        //     if (i1[i] != i2[i]) {
        //       return false
        //     }
        //   }
        //   return true
        // }
        /**
         * Get the set if distinct (non-duplicate) indices from a list
         * @param {Array<number>} indices
         * @returns {Array<number>}
         */
        static distinctIndices(indices) {
            const indicesSet = {};
            for (let i = 0, l = indices.length; i < l; i++) {
                const k = '' + indices[i];
                indicesSet[k] = i;
            }
            return [].concat(Object.keys(indicesSet));
        }
        /**
         * Merge all the indices of a set of Matchers
         * @param {Array<IMatcher>} matchers
         * @returns {Array<number>}
         */
        static mergeIndices(matchers) {
            const indices = [];
            for (let i = 0, matchersLength = matchers.length; i < matchersLength; i++) {
                const matcher = matchers[i];
                if (matcher.indices.length !== 1) {
                    throw new MatcherException(matcher);
                }
                indices[i] = matcher.indices[0];
            }
            return indices;
        }
        /**
         * Matches allOf the components/indices specified
         * @params {Array<entitas.IMatcher>|Array<number>} args
         * @returns {entitas.Matcher}
         */
        static allOf(...args) {
            if ('number' === typeof args[0] || 'string' === typeof args[0]) {
                const matcher = new Matcher();
                const indices = matcher._allOfIndices = Matcher.distinctIndices(args);
                return matcher;
            }
            else {
                return Matcher.allOf.apply(this, Matcher.mergeIndices(args));
            }
        }
        /**
         * Matches anyOf the components/indices specified
         * @params {Array<entitas.IMatcher>|Array<number>} args
         * @returns {entitas.Matcher}
         */
        static anyOf(...args) {
            if ('number' === typeof args[0] || 'string' === typeof args[0]) {
                const matcher = new Matcher();
                const indices = matcher._anyOfIndices = Matcher.distinctIndices(args);
                return matcher;
            }
            else {
                return Matcher.anyOf.apply(this, Matcher.mergeIndices(args));
            }
        }
        static appendIndices(sb, prefix, indexArray) {
            const SEPERATOR = ", ";
            let j = sb.length;
            sb[j++] = prefix;
            sb[j++] = '(';
            const lastSeperator = indexArray.length - 1;
            for (let i = 0, indicesLength = indexArray.length; i < indicesLength; i++) {
                sb[j++] = '' + indexArray[i];
                if (i < lastSeperator) {
                    sb[j++] = SEPERATOR;
                }
            }
            sb[j++] = ')';
        }
        /**
         * Subscribe to Entity Added event
         * @returns {entitas.TriggerOnEvent}
         */
        onEntityAdded() {
            return new TriggerOnEvent(this, GroupEventType.OnEntityAdded);
        }
        /**
         * Subscribe to Entity Removed event
         * @returns {entitas.TriggerOnEvent}
         */
        onEntityRemoved() {
            return new TriggerOnEvent(this, GroupEventType.OnEntityRemoved);
        }
        /**
         * Subscribe to Entity Added or Removed event
         * @returns {entitas.TriggerOnEvent}
         */
        onEntityAddedOrRemoved() {
            return new TriggerOnEvent(this, GroupEventType.OnEntityAddedOrRemoved);
        }
    }
    /**
     * A unique sequential index number assigned to each ,atch
     * @type {number} */
    Matcher.uniqueId = 0;
    entitas.Matcher = Matcher;
})(entitas || (entitas = {}));