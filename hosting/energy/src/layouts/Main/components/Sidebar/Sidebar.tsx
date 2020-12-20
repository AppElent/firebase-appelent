import React from 'react';
import clsx from 'clsx';
import PropTypes, { InferProps } from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer, Theme } from '@material-ui/core';

import { SidebarNav } from './components';
import { Profile } from 'appelent-react/lib/components'

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: 225,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)',
    },
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  nav: {
    marginBottom: theme.spacing(2),
  },
}));

const Sidebar: any = (props: InferProps<typeof Sidebar>): JSX.Element => {
  const { user, navigation, open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const avatar =
    user !== null
      ? user.photoURL
        ? user.photoURL
        : 'https://media.npr.org/assets/img/2016/01/07/macaca_nigra_self-portrait_custom-a8e13582c9ca6f71f5cd62815b8bb5d6ff112dc2-s800-c15.jpg'
      : '';

  return (
    <Drawer anchor="left" classes={{ paper: classes.drawer }} onClose={onClose} open={open} variant={variant}>
      <div {...rest} className={clsx(classes.root, className)}>
        {user !== null && (
          <>
            <Profile name={user.displayName} avatar={avatar} />
            <Divider className={classes.divider} />
          </>
        )}

        <SidebarNav className={classes.nav} pages={navigation} />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired,
};

export default Sidebar;
