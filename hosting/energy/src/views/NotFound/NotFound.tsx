import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Typography, Theme } from '@material-ui/core';

import { useTranslation } from 'appelent-react/lib/hooks'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
  },
  content: {
    paddingTop: 150,
    textAlign: 'center',
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560,
  },
}));

const translations = {
  en: {
    title: '404: The page you are looking for isn’t here',
    description: 'You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation'
  },
  nl: {
    title: '404: De pagina die je zoekt is er niet',
    description: 'Probeer een andere pagina'
  }
}

const NotFound = (): any => {
  const classes = useStyles();
  const { t, translationLoaded } = useTranslation('views.notfound', translations);

  if (!translationLoaded) return <div>Loading translations</div>;

  return (
    <div className={classes.root}>
      <Grid container justify="center" spacing={4}>
        <Grid item lg={6} xs={12}>
          <div className={classes.content}>
            <Typography variant="h1">{t('views.notfound:title')}</Typography>
            <Typography variant="subtitle2">
            {t('views.notfound:description')}
            </Typography>
            <img alt="Under development" className={classes.image} src="/images/undraw_page_not_found_su7k.svg" />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default NotFound;
