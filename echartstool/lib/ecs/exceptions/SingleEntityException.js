var entitas;
(function (entitas) {
    var exceptions;
    (function (exceptions) {
        "use strict";
        var Exception = entitas.Exception;
        class SingleEntityException extends Exception {
            /**
             * Single Entity Exception
             * @constructor
             * @param matcher
             */
            constructor(matcher) {
                super("Multiple entities exist matching " + matcher);
            }
        }
        exceptions.SingleEntityException = SingleEntityException;
    })(exceptions = entitas.exceptions || (entitas.exceptions = {}));
})(entitas || (entitas = {}));