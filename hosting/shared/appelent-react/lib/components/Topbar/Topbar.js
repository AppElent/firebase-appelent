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
import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Badge, Hidden, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import { ExpandMore } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import AppTitle from '../AppTitle';
import { useMaterialUIMenu, useSession, useTranslation } from '../../hooks';
var useStyles = makeStyles(function (theme) { return ({
    root: {
        boxShadow: 'none',
    },
    flexGrow: {
        flexGrow: 1,
    },
    signOutButton: {
        marginLeft: theme.spacing(1),
    },
    white: {
        color: 'white',
    },
}); });
var translations = {
    en: {
        no_notifications: 'There are no (new) notifications',
        account: 'Account',
        logout: 'Log out',
    },
    nl: {
        no_notifications: 'Er zijn geen nieuwe meldingen',
        account: 'Account',
        logout: 'Log uit',
    },
};
var Topbar = function (props) {
    var firebase = useSession().firebase;
    var _a = useTranslation('topbar', translations), t = _a.t, i18n = _a.i18n;
    var className = props.className, onSidebarOpen = props.onSidebarOpen, full = props.full, title = props.title, rest = __rest(props, ["className", "onSidebarOpen", "full", "title"]);
    var classes = useStyles();
    var notifications = useState([])[0];
    var _b = useMaterialUIMenu(), anchorEl = _b.anchorEl, open = _b.open, handleOpen = _b.handleOpen, handleClose = _b.handleClose;
    var _c = useMaterialUIMenu(), languageAnchor = _c.anchorEl, languageOpen = _c.open, languageHandleOpen = _c.handleOpen, languageHandleClose = _c.handleClose;
    var _d = useMaterialUIMenu(), logoutAnchor = _d.anchorEl, logoutOpen = _d.open, logoutHandleOpen = _d.handleOpen, logoutHandleClose = _d.handleClose;
    var languages = {
        en: 'English',
        nl: 'Nederlands',
    };
    return (React.createElement(AppBar, __assign({}, rest, { className: clsx(classes.root, className) }),
        React.createElement(Toolbar, null,
            React.createElement(RouterLink, { to: "/" },
                React.createElement(AppTitle, { title: title })),
            full && (React.createElement(React.Fragment, null,
                React.createElement("div", { className: classes.flexGrow }),
                React.createElement(Typography, { variant: "button", className: classes.white, onClick: languageHandleOpen },
                    languages[i18n.language],
                    " ",
                    React.createElement(ExpandMore, null)),
                React.createElement(Menu, { anchorEl: languageAnchor, getContentAnchorEl: null, anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, id: "simple-menu", keepMounted: true, open: languageOpen, onClose: languageHandleClose },
                    React.createElement(MenuItem, { value: "en", onClick: function () {
                            i18n.changeLanguage('en');
                            languageHandleClose();
                        } }, "English"),
                    React.createElement(MenuItem, { value: "nl", onClick: function () {
                            i18n.changeLanguage('nl');
                            languageHandleClose();
                        } }, "Nederlands")),
                React.createElement(IconButton, { color: "inherit", onClick: handleOpen },
                    React.createElement(Badge, { badgeContent: notifications.length, color: "error" },
                        React.createElement(NotificationsIcon, null))),
                React.createElement(Menu, { anchorEl: anchorEl, getContentAnchorEl: null, anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, id: "simple-menu", keepMounted: true, open: open, onClose: handleClose },
                    notifications.map(function (notification) { return (React.createElement(MenuItem, { key: notification }, notification)); }),
                    notifications.length === 0 && React.createElement(MenuItem, null, t('topbar:no_notifications'))),
                React.createElement(IconButton, { className: classes.signOutButton, color: "inherit", onClick: logoutHandleOpen },
                    React.createElement(InputIcon, null)),
                React.createElement(Menu, { anchorEl: logoutAnchor, getContentAnchorEl: null, anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, id: "simple-menu", keepMounted: true, open: logoutOpen, onClose: logoutHandleClose },
                    React.createElement(MenuItem, { onClick: logoutHandleClose, component: Link, to: "/account" }, t('topbar:account')),
                    React.createElement(MenuItem, { onClick: function () {
                            firebase.auth().signOut();
                            logoutHandleClose();
                        } }, t('topbar:logout'))),
                React.createElement(Hidden, { lgUp: true },
                    React.createElement(IconButton, { color: "inherit", onClick: onSidebarOpen },
                        React.createElement(MenuIcon, null))))))));
};
Topbar.propTypes = {
    className: PropTypes.string,
    onSidebarOpen: PropTypes.func,
};
export default Topbar;
//# sourceMappingURL=Topbar.js.map