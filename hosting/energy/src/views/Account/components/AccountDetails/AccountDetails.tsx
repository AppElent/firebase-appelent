import React from 'react';
import clsx from 'clsx';
import PropTypes, { InferProps } from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  InputLabel,
  FormControl,
  Grid,
  TextField,
  Theme,
} from '@material-ui/core';
import firebaseModule from 'firebase/app';

import { useAppSettings, useSession, useForm, useTranslation } from 'appelent-react/lib/hooks';
import { Button, ResponsiveSelect, ResponsiveSelectItem } from 'appelent-react/lib/components';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const translations = {
  en: {
    name: 'Name',
    email: 'E-mail',
    phone: 'Phone',
    language: 'Language',
    bio: 'Bio / quote',
    backend: 'API Address'
  }, 
  nl: {
    name: 'Naam',
    email: 'E-mail',
    phone: 'Telefoon',
    language: 'Taal',
    bio: 'Bio / quote',
    backend: 'API Adres'
  }
}

const AccountDetails: any = (props: InferProps<typeof AccountDetails.propTypes>): JSX.Element => {
  const { className, ...rest } = props;

  const { user, firebase } = useSession();
  const { t, i18n, translationLoaded } = useTranslation('views.accountdetails', translations);
  const { appSettings, setAppSettings } = useAppSettings();

  const classes = useStyles();

  const saveUserInfo = (user: firebaseModule.User) => async (state: any): Promise<void> => {
    if(state.name.touched){
      await user.updateProfile({
        displayName: state.name.value,
      });
    }
    if(state.backend.touched) setAppSettings('apiUrl', state.backend.value)
    return;
  };

  const { isDirty, state, submitting, handleOnChange, handleOnSubmit }: any = useForm(
    { name: user.displayName, email: user.email, phone: user.phoneNumber, bio: 'Brain Director', backend: appSettings.apiUrl },
    {},
    saveUserInfo(user),
  );

  if (!translationLoaded) return <div>Loading translations</div>;

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form autoComplete="off" noValidate>
        <CardHeader subheader={t('greetName', { name: user.displayName })} title={'Profile'} />
        <Divider />
        <CardContent>
          <Grid container spacing={1}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label={t('views.accountdetails:name')}
                margin="dense"
                name="name"
                onChange={handleOnChange}
                required
                value={state.name.value}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label={t('views.accountdetails:email')}
                margin="dense"
                name="email"
                onChange={handleOnChange}
                required
                value={state.email.value}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label={t('views.accountdetails:phone')}
                margin="dense"
                name="phone"
                onChange={handleOnChange}
                type="text"
                value={state.phone.value || ''}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="from-account-placeholder" shrink>
                  {t('views.accountdetails:language')}
                </InputLabel>
                <ResponsiveSelect
                  inputProps={{
                    name: 'lng',
                    id: 'lng',
                  }}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => {
                    i18n.changeLanguage(e.target.value);
                  }}
                  value={i18n.language || 'English'}
                >
                  <ResponsiveSelectItem value="en">English</ResponsiveSelectItem>
                  <ResponsiveSelectItem value="nl">Nederlands</ResponsiveSelectItem>
                </ResponsiveSelect>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label={t('views.accountdetails:bio')}
                margin="dense"
                name="bio"
                onChange={handleOnChange}
                type="text"
                value={state.bio.value || ''}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label={t('views.accountdetails:backend')}
                margin="dense"
                name="backend"
                onChange={handleOnChange}
                type="text"
                value={state.backend.value || ''}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" disabled={!isDirty} loading={submitting} onClick={handleOnSubmit} variant="contained">
            {t('common:buttons.save')}
          </Button>
          <Button color="primary" onClick={(): void => firebase.auth().signOut()} variant="contained">
            {t('common:buttons.logout')}
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

AccountDetails.propTypes = {
  className: PropTypes.string,
};

export default AccountDetails;
