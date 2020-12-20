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
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';
var useStyles = makeStyles(function (theme) { return ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: 'fit-content',
    },
    avatar: {
        width: 60,
        height: 60,
    },
    name: {
        marginTop: theme.spacing(1),
    },
}); });
var Profile = function (props) {
    var className = props.className, name = props.name, avatar = props.avatar, bio = props.bio, rest = __rest(props, ["className", "name", "avatar", "bio"]);
    var classes = useStyles();
    return (React.createElement("div", __assign({}, rest, { className: clsx(classes.root, className) }),
        React.createElement(Avatar, { alt: "Person", className: classes.avatar, component: RouterLink, src: avatar, to: "/account" }),
        React.createElement(Typography, { className: classes.name, variant: "h4" }, name),
        React.createElement(Typography, { variant: "body2" }, bio !== null && bio !== void 0 ? bio : 'Brain Director')));
};
Profile.propTypes = {
    avatar: PropTypes.string,
    className: PropTypes.string,
    name: PropTypes.string,
};
export default Profile;
//# sourceMappingURL=Profile.js.map