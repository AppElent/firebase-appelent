import React from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardContent, CardActions, Divider, Typography } from '@material-ui/core';

import { useSession } from 'hooks';
import { saveEnelogicSettings } from 'modules/Enelogic';
import { Button, OauthAuthorize } from 'components';

const useStyles = makeStyles(() => ({
  deleteButton: {
    color: 'red',
  },
}));

export const settings = {
  redirectUrl: '/meterstanden',
  exchangeUrl: '/api/oauth/exchange/enelogic',
  refreshUrl: '/api/oauth/refresh/enelogic',
  formatUrl: '/api/oauth/formaturl/enelogic',
  saveSettings: saveEnelogicSettings,
  deleteSettings: (session: any) => {
    session.ref.update({ enelogic: { success: false } });
  },
};

const SettingCardEnelogic = () => {
  const classes = useStyles();
  const session = useSession();
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader subheader="Connect" title="Enelogic" />
      <Divider />
      <CardContent>
        <Typography>
          {session.userInfo.enelogic.token
            ? `Registratie vanaf: ${session.userInfo.enelogic.measuringpoints.electra.dayMin}`
            : 'Enelogic connectie is niet gemaakt. Deze is nodig om de meterstanden op te kunnen halen.'}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <OauthAuthorize
          formatUrl="/api/oauth/formaturl/enelogic"
          formatUrlKey="format_url_enelogic"
          title={t('buttons.connect') + ' Enelogic'}
        />
        <Button className={classes.deleteButton} onClick={settings.deleteSettings(session)} variant="outlined">
          {t('buttons.delete')}
        </Button>
      </CardActions>
    </Card>
  );
};

SettingCardEnelogic.propTypes = {
  config: PropTypes.object,
};

export default SettingCardEnelogic;
