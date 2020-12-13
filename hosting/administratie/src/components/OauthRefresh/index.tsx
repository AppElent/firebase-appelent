import React, { useState } from 'react';
import { Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { Button } from 'components';
import { useSession } from 'hooks';
import { refreshOauth } from 'helpers';

type OauthRefreshType = {
  refreshUrl: string;
  saveFunction: (session: any, token: any) => void;
  token: any;
};

const OauthRefresh: React.FC<any> = ({ refreshUrl, saveFunction, token, ...rest }: any) => {
  const session = useSession();
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [forceRefresh, setForceRefresh] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const refreshToken = async () => {
    setLoading(true);
    try {
      const refreshedtoken = await refreshOauth(session, refreshUrl, token, saveFunction, forceRefresh);
      if (!refreshedtoken) {
        enqueueSnackbar('Token hasnt expired and Force is unchecked', { variant: 'error' });
      }
      if (typeof saveFunction === 'function') {
        await saveFunction(session, refreshedtoken);
      } else {
        console.log('AccessToken', refreshedtoken);
      }
    } catch (error) {
      console.log(error);
      setError(JSON.stringify(error));
    }
    setLoading(false);
  };

  return (
    <div>
      <Button color="primary" loading={loading} variant="contained" onClick={refreshToken} {...rest}>
        Refresh
      </Button>
      <FormControlLabel
        control={
          <Checkbox
            checked={forceRefresh}
            onChange={() => {
              setForceRefresh(!forceRefresh);
            }}
            name="checkedA"
          />
        }
        label="Forceer"
      />
    </div>
  );
};

export default OauthRefresh;
