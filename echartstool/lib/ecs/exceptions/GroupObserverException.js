var entitas;
(function (entitas) {
    var exceptions;
    (function (exceptions) {
        "use strict";
        var Exception = entitas.Exception;
        class GroupObserverException extends Exception {
            /**
             * Group Observer Exception
             * @constructor
             * @param message
             */
            constructor(message) {
                super(message);
            }
        }
        exceptions.GroupObserverException = GroupObserverException;
    })(exceptions = entitas.exceptions || (entitas.exceptions = {}));
})(entitas || (entitas = {}));