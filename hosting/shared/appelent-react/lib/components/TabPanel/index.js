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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React from 'react';
import { Typography } from '@material-ui/core';
var TabPanel = function (_a) {
    var children = _a.children, tab = _a.tab, tabKey = _a.tabKey, lazyLoad = _a.lazyLoad, other = __rest(_a, ["children", "tab", "tabKey", "lazyLoad"]);
    var visible = tab === tabKey;
    var loadTab = lazyLoad && !visible ? false : true;
    return (React.createElement(Typography, __assign({ component: "div", hidden: !visible, id: "simple-tabpanel_" + tab, role: "tabpanel" }, other), loadTab && children));
};
export default TabPanel;
//# sourceMappingURL=index.js.map