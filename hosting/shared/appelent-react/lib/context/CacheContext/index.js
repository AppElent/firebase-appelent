var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext } from 'react';
export var CacheContext = React.createContext({});
export var useCache = function () { return useContext(CacheContext); };
export var getCache = function (cacheData) { return function (key) {
    return cacheData[key];
}; };
export var setCache = function (setFunction) { return function (key, data) {
    setFunction(function (state) {
        var _a;
        return (__assign(__assign({}, state), (_a = {}, _a[key] = data, _a)));
    });
}; };
export var clearCache = function (setFunction) { return function () {
    setFunction({});
}; };
export var clearKey = function (setFunction) { return function (key) {
    setFunction(function (state) {
        var _a;
        return (__assign(__assign({}, state), (_a = {}, _a[key] = {}, _a)));
    });
}; };
//# sourceMappingURL=index.js.map