var entitas;
(function (entitas) {
    var exceptions;
    (function (exceptions) {
        "use strict";
        var Exception = entitas.Exception;
        class EntityIsAlreadyReleasedException extends Exception {
            /**
             * Entity Is Already Released Exception
             * @constructor
             */
            constructor() {
                super("Entity is already released!");
            }
        }
        exceptions.EntityIsAlreadyReleasedException = EntityIsAlreadyReleasedException;
    })(exceptions = entitas.exceptions || (entitas.exceptions = {}));
})(entitas || (entitas = {}));