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
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button, colors } from '@material-ui/core';
var useStyles = makeStyles(function (theme) { return ({
    root: {
        backgroundColor: colors.grey[50],
    },
    media: {
        paddingTop: theme.spacing(2),
        height: 80,
        textAlign: 'center',
        '& > img': {
            height: '100%',
            width: 'auto',
        },
    },
    content: {
        padding: theme.spacing(1, 2),
    },
    actions: {
        padding: theme.spacing(1, 2),
        display: 'flex',
        justifyContent: 'center',
    },
}); });
var UpgradePlan = function (props) {
    var className = props.className, rest = __rest(props, ["className"]);
    var classes = useStyles();
    return (React.createElement("div", __assign({}, rest, { className: clsx(classes.root, className) }),
        React.createElement("div", { className: classes.media },
            React.createElement("img", { alt: "Upgrade to PRO", src: "/images/undraw_resume_folder_2_arse.svg" })),
        React.createElement("div", { className: classes.content },
            React.createElement(Typography, { align: "center", gutterBottom: true, variant: "h6" }, "Upgrade to PRO"),
            React.createElement(Typography, { align: "center", variant: "body2" }, "Upgrade to Devias Kit PRO and get even more components")),
        React.createElement("div", { className: classes.actions },
            React.createElement(Button, { color: "primary", component: "a", href: "https://devias.io/products/devias-kit-pro", variant: "contained" }, "Upgrade"))));
};
UpgradePlan.propTypes = {
    className: PropTypes.string,
};
export default UpgradePlan;
//# sourceMappingURL=UpgradePlan.js.map