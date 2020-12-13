import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography, Theme } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import { useSession, useQueryParams } from 'hooks';
import { OauthAuthorize, OauthReceiver, OauthRefresh } from 'components';

import { settings as enelogicSettings } from 'appcomponents/SettingCardEnelogic';
import { settings as bunqSettings } from 'appcomponents/SettingCardBunq';

const useStyles = makeStyles((theme: Theme) => ({
  deleteButton: {
    color: 'red',
    margin: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const microsoftSaveFunction = async (session: any, accesstoken: any) => {
  if (!accesstoken) {
    return;
  }
  console.log(accesstoken);
  const saveObject = {
    success: accesstoken.success,
    token: accesstoken.data.token,
  };
  session.ref.update({ microsoft: saveObject });
};

const defaultDeleteFunction = (name: string) => async (session: any) => {
  session.ref.update({ [name]: { success: false } });
};

const OAuthPage = (): JSX.Element => {
  const session = useSession();
  const classes = useStyles();
  const queryParams = useQueryParams();
  const urlParams: any = useParams();
  const action = urlParams.action.toLowerCase();

  if (!['display', 'format', 'exchange', 'refresh'].includes(action)) {
    return <div>Geen geldige actie</div>;
  }

  const name = urlParams.name.toLowerCase();

  const redirectUrl = '/oauth/display/' + name;
  const exchangeUrl = '/api/oauth/exchange/' + name;
  const formatUrl = '/api/oauth/formaturl/' + name;
  const refreshUrl = '/api/oauth/refresh/' + name;

  const oauthConfig: any = {
    bunq: bunqSettings,
    enelogic: enelogicSettings,
    microsoft: {},
    google: {},
  };

  const oauthSettings: any = oauthConfig[name];
  if (!oauthSettings) {
    return <>Setting niet gevonden</>;
  }

  if (action === 'format') {
    return <OauthAuthorize title={name} formatUrl={formatUrl} formatUrlKey={'format_url_' + name} />;
  }
  if (action === 'exchange') {
    if (queryParams.code) {
      return (
        <OauthReceiver
          code={queryParams.code}
          exchangeUrl={exchangeUrl}
          redirectUrl={redirectUrl}
          state={queryParams.state}
        />
      );
    } else {
      return <div>Geen code</div>;
    }
  }
  if (action === 'refresh') {
    const updateFunction = oauthSettings.updateSettings ?? oauthSettings.saveSettings;
    return (
      <>
        <Typography variant="h1">OAuth 2.0 refresh</Typography>
        <OauthRefresh refreshUrl={refreshUrl} token={session.userInfo[name].token}></OauthRefresh>
      </>
    );
  }

  const deleteFunction = oauthSettings.deleteSettings ?? defaultDeleteFunction(name);
  const updateFunction = oauthSettings.updateSettings ?? oauthSettings.saveSettings;
  return (
    <div>
      <Typography variant="h1">OAuth 2.0 {name}</Typography>
      <br />
      <OauthAuthorize
        className={classes.button}
        title="Connect"
        formatUrl={formatUrl}
        formatUrlKey={'format_url_' + name}
      />
      <br />
      <OauthRefresh
        className={classes.button}
        refreshUrl={refreshUrl}
        token={session.userInfo[name]?.token}
      ></OauthRefresh>
      <Button
        className={classes.deleteButton}
        onClick={() => {
          deleteFunction(session);
        }}
        variant="outlined"
      >
        Delete
      </Button>
      <br />
      <pre>{JSON.stringify(session.userInfo[name], null, 2)}</pre>
    </div>
  );
};

export default OAuthPage;
