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
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link } from '@material-ui/core';
import { useTranslation } from '../../hooks';
var useStyles = makeStyles(function (theme) { return ({
    root: {
        padding: theme.spacing(4),
    },
}); });
var translations = {
    en: {
        footer_text: 'Visit my Github account',
    },
    nl: {
        footer_text: 'Bezoek mijn Github account',
    },
};
var Footer = function (props) {
    var className = props.className, rest = __rest(props, ["className"]);
    var classes = useStyles();
    var t = useTranslation('footer', translations).t;
    return (React.createElement("div", __assign({}, rest, { className: clsx(classes.root, className) }),
        React.createElement(Typography, { variant: "body1" },
            "\u00A9",
            ' ',
            React.createElement(Link, { component: "a", href: "https://github.com/appelent", target: "_blank" }, "Eric Jansen"),
            ' ',
            new Date().getFullYear()),
        React.createElement(Typography, { variant: "caption" }, t('footer:footer_text'))));
};
Footer.propTypes = {
    className: PropTypes.string,
};
export default Footer;
//# sourceMappingURL=Footer.js.map