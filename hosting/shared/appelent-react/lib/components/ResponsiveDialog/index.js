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
import { Dialog, DialogTitle, AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import useCustomMediaQuery from '../../hooks/useCustomMediaQuery';
var useStyles = makeStyles(function (theme) { return ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
        color: 'white',
    },
}); });
var ResponsiveDialog = function (props) {
    var classes = useStyles();
    var children = props.children, onClose = props.onClose, title = props.title, open = props.open, rest = __rest(props, ["children", "onClose", "title", "open"]);
    var isDesktop = useCustomMediaQuery();
    if (isDesktop) {
        return (React.createElement(Dialog, __assign({ open: open }, rest),
            React.createElement(DialogTitle, { id: "form-dialog-title" }, title),
            children));
    }
    return (React.createElement(Dialog, __assign({ open: open, fullScreen: true }, rest),
        !isDesktop && (React.createElement(AppBar, { className: classes.appBar },
            React.createElement(Toolbar, null,
                React.createElement(IconButton, { edge: "start", color: "inherit", onClick: onClose, "aria-label": "close" },
                    React.createElement(CloseIcon, null)),
                React.createElement(Typography, { variant: "h6", className: classes.title }, title)))),
        children));
};
export default ResponsiveDialog;
//# sourceMappingURL=index.js.map