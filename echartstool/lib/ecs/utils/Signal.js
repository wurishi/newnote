var entitas;
(function (entitas) {
    var utils;
    (function (utils) {
        "use strict";
        var Bag = entitas.utils.Bag;
        class Signal {
            /**
             *
             * @constructor
             * @param context
             * @param alloc
             */
            constructor(context, alloc = 16) {
                this._listeners = new Bag();
                this._context = context;
                this._alloc = alloc;
                this.active = false;
            }
            /**
             * Dispatch event
             *
             * @param args list
             */
            dispatch(...args) {
                const listeners = this._listeners;
                const size = listeners.size();
                if (size <= 0)
                    return; // bail early
                const context = this._context;
                for (let i = 0; i < size; i++) {
                    listeners[i].apply(context, args);
                }
            }
            /**
             * Add event listener
             * @param listener
             */
            add(listener) {
                this._listeners.add(listener);
                this.active = true;
            }
            /**
             * Remove event listener
             * @param listener
             */
            remove(listener) {
                const listeners = this._listeners;
                listeners.remove(listener);
                this.active = listeners.size() > 0;
            }
            /**
             * Clear and reset to original alloc
             */
            clear() {
                this._listeners.clear();
                this.active = false;
            }
        }
        utils.Signal = Signal;
    })(utils = entitas.utils || (entitas.utils = {}));
})(entitas || (entitas = {}));