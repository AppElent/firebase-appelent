import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid, Theme } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

import { useSession, useQuery } from 'appelent-react/lib/hooks';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const fetchBackend = async (url: string, options: any) => {
  url = 'http://localhost:8000' + url;
  const token = await options.user.getIdToken();
  if (options.body === null) {
    options.body = undefined;
  }
  if (options.method === undefined) options.method = 'GET';
  return fetch(url, {
    method: options.method,
    headers: {
      Authorization: 'Firebase ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }) //.catch(error => console.error(error))
    .then(async response => {
      if (!response.ok) {
        throw await response.json();
      }
      return response;
    })
    .then(response =>
      response
        .clone()
        .json()
        .catch(() => response.text()),
    );
};
const TestPage = (): any => {
  const classes = useStyles();
  const session = useSession();
  const { t } = useTranslation();

  const processmeterstanden = async (result: any) => result.map((row: any) => { return row.id = 'abc123'})

  const test = useQuery('/api/events');
  console.log(test);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item md={7} xs={12}>
          {t('greet')}
          {t('greetName', { name: 'Eric' })}
          <button
            onClick={async (): Promise<void> => {
              const data = await fetchBackend(
                '/api/events/',
                { user: session.user },
              );
              console.log(data);
            }}
          >
            Test fetch
          </button>
          { JSON.stringify(test.data) }
          <button
            onClick={() => test.refetch()}
          >
            Refetch
          </button>
        </Grid>
      </Grid>
    </div>
  );
};

export default TestPage;
