var entitas;
(function (entitas) {
    "use strict";
    class Exception {
        /**
         * Base exception class
         * @constructot
         * @param message
         */
        constructor(message) {
            this.message = message;
        }
        /** @return {string} */
        toString() {
            return this.message;
        }
    }
    entitas.Exception = Exception;
})(entitas || (entitas = {}));