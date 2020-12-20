import debug from 'debug';
var BASE = 'administratie-app';
var COLOURS = {
    trace: 'lightblue',
    info: 'blue',
    warn: 'pink',
    error: 'red',
}; // choose better colours :)
var Log = /** @class */ (function () {
    function Log(debug) {
        this.debug = debug;
    }
    Log.prototype.generateMessage = function (level, message, source) {
        // Set the prefix which will cause debug to enable the message
        var namespace = BASE + ":" + level;
        var createDebug = debug(namespace);
        // Set the colour of the message based on the level
        createDebug.color = COLOURS[level];
        if (source) {
            createDebug(source, message);
        }
        else {
            createDebug(message);
        }
    };
    Log.prototype.trace = function (message, source) {
        return this.generateMessage('trace', message, source);
    };
    Log.prototype.info = function (message, source) {
        return this.generateMessage('info', message, source);
    };
    Log.prototype.warn = function (message, source) {
        return this.generateMessage('warn', message, source);
    };
    Log.prototype.error = function (message, source) {
        return this.generateMessage('error', message, source);
    };
    Log.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.debug) {
            console.log(args);
        }
    };
    return Log;
}());
export default Log;
//# sourceMappingURL=index.js.map