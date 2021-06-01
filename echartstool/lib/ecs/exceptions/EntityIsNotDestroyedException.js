var entitas;
(function (entitas) {
    var exceptions;
    (function (exceptions) {
        "use strict";
        var Exception = entitas.Exception;
        class EntityIsNotDestroyedException extends Exception {
            /**
             * Entity Is Not Destroyed Exception
             * @constructor
             * @param message
             */
            constructor(message) {
                super(message + "\nEntity is not destroyed yet!");
            }
        }
        exceptions.EntityIsNotDestroyedException = EntityIsNotDestroyedException;
    })(exceptions = entitas.exceptions || (entitas.exceptions = {}));
})(entitas || (entitas = {}));