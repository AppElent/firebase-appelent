import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import { Topbar } from 'appelent-react/lib/components';

const useStyles = makeStyles(() => ({
  root: {
    paddingTop: 64,
    height: '100%',
  },
  content: {
    height: '100%',
  },
}));

const Minimal: any = (props: InferProps<typeof Minimal>): JSX.Element => {
  const { title, children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar title={title} full={false}/>
      <main className={classes.content}>{children}</main>
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Minimal;
