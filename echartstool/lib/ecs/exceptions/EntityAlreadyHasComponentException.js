var entitas;
(function (entitas) {
    var exceptions;
    (function (exceptions) {
        "use strict";
        var Exception = entitas.Exception;
        class EntityAlreadyHasComponentException extends Exception {
            /**
             * Entity Already Has Component Exception
             * @constructor
             * @param message
             * @param index
             */
            constructor(message, index) {
                super(message + "\nEntity already has a component at index (" + index + ") " + entitas.Pool.componentsEnum[index]);
            }
        }
        exceptions.EntityAlreadyHasComponentException = EntityAlreadyHasComponentException;
    })(exceptions = entitas.exceptions || (entitas.exceptions = {}));
})(entitas || (entitas = {}));