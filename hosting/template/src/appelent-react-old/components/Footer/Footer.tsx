import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Link, Theme } from '@material-ui/core';
import { useTranslation } from 'appelent-react/lib/hooks';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const translations = {
  en: {
    footer_text: 'Visit my Github account'
  },
  nl: {
    footer_text: 'Bezoek mijn Github account'
  }
}

const Footer: any = (props: InferProps<typeof Footer.propTypes>): JSX.Element => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const { t } = useTranslation('footer', translations);

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Typography variant="body1">
        &copy;{' '}
        <Link component="a" href="https://github.com/appelent" target="_blank">
          Eric Jansen
        </Link>{' '}
        {new Date().getFullYear()}
      </Typography>
      <Typography variant="caption">{t('footer:footer_text')}</Typography>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};

export default Footer;
