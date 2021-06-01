var entitas;
(function (entitas) {
    var exceptions;
    (function (exceptions) {
        "use strict";
        var Exception = entitas.Exception;
        class MatcherException extends Exception {
            /**
             * Matcher Exception
             * @constructor
             * @param matcher
             */
            constructor(matcher) {
                super("matcher.indices.length must be 1 but was " + matcher.indices.length);
            }
        }
        exceptions.MatcherException = MatcherException;
    })(exceptions = entitas.exceptions || (entitas.exceptions = {}));
})(entitas || (entitas = {}));