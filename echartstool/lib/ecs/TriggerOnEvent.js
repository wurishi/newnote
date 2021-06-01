var entitas;
(function (entitas) {
    "use strict";
    class TriggerOnEvent {
        /**
         * @constructor
         *
         * @param trigger
         * @param eventType
         */
        constructor(trigger, eventType) {
            this.trigger = trigger;
            this.eventType = eventType;
        }
    }
    entitas.TriggerOnEvent = TriggerOnEvent;
})(entitas || (entitas = {}));