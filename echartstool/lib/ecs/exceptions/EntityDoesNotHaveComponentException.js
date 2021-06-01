var entitas;
(function (entitas) {
    var exceptions;
    (function (exceptions) {
        "use strict";
        var Exception = entitas.Exception;
        class EntityDoesNotHaveComponentException extends Exception {
            /**
             * Entity Does Not Have Component Exception
             * @constructor
             * @param message
             * @param index
             */
            constructor(message, index) {
                super(message + "\nEntity does not have a component at index (" + index + ") " + entitas.Pool.componentsEnum[index]);
            }
        }
        exceptions.EntityDoesNotHaveComponentException = EntityDoesNotHaveComponentException;
    })(exceptions = entitas.exceptions || (entitas.exceptions = {}));
})(entitas || (entitas = {}));