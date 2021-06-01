var entitas;
(function (entitas) {
    var utils;
    (function (utils) {
        "use strict";
        class Stopwatch {
            constructor() {
                Stopwatch.isHighRes = performance ? true : false;
                this.reset();
            }
            get isRunning() {
                return this._isRunning;
            }
            get startTimeStamp() {
                return this._startTimeStamp;
            }
            get elapsed() {
                return this._elapsed;
            }
            start() {
                if (!this._isRunning) {
                    this._startTimeStamp = Stopwatch.getTimeStamp();
                    this._isRunning = true;
                }
            }
            stop() {
                if (this._isRunning) {
                    this._elapsed += (Stopwatch.getTimeStamp() - this._startTimeStamp);
                    this._isRunning = false;
                }
            }
            reset() {
                this._elapsed = 0;
                this._startTimeStamp = 0;
                this._isRunning = false;
            }
            static getTimeStamp() {
                return Stopwatch.isHighRes ? performance.now() : Date.now();
            }
        }
        Stopwatch.isHighRes = false;
        utils.Stopwatch = Stopwatch;
    })(utils = entitas.utils || (entitas.utils = {}));
})(entitas || (entitas = {}));