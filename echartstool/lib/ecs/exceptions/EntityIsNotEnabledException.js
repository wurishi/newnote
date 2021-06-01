var entitas;
(function (entitas) {
    var exceptions;
    (function (exceptions) {
        "use strict";
        var Exception = entitas.Exception;
        class EntityIsNotEnabledException extends Exception {
            /**
             * Entity Is Not Enabled Exception
             * @constructor
             * @param message
             */
            constructor(message) {
                super(message + "\nEntity is not enabled");
            }
        }
        exceptions.EntityIsNotEnabledException = EntityIsNotEnabledException;
    })(exceptions = entitas.exceptions || (entitas.exceptions = {}));
})(entitas || (entitas = {}));