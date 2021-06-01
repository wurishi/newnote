var entitas;
(function (entitas) {
    var exceptions;
    (function (exceptions) {
        "use strict";
        var Exception = entitas.Exception;
        class PoolDoesNotContainEntityException extends Exception {
            /**
             * Pool Does Not Contain Entity Exception
             * @constructor
             * @param entity
             * @param message
             */
            constructor(entity, message) {
                super(message + "\nPool does not contain entity " + entity);
            }
        }
        exceptions.PoolDoesNotContainEntityException = PoolDoesNotContainEntityException;
    })(exceptions = entitas.exceptions || (entitas.exceptions = {}));
})(entitas || (entitas = {}));