/* eslint-disable react/no-multi-comp */
import React, { FunctionComponent } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { InferProps } from 'prop-types';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import { Main as MainLayout, Minimal as MinimalLayout } from 'layouts';
import { useAppSettings, useSession, useTranslation } from 'appelent-react/lib/hooks';

import {
  SignIn,
  Account,
  NotFound,
  Testpage
} from 'views';

const translation = {
  en: {
    account: 'Account',
    meter_readings: 'Meter readings',
    administration: 'Administration',
    financial: 'Financial',
    accounts: 'Accounts',
    automation: 'Automation',
    events: 'Events'
  }, 
  nl: {
    account: 'Account',
    meter_readings: 'Meterstanden',
    administration: 'Administratie',
    financial: 'Financieel',
    accounts: 'Rekeningen',
    automation: 'Automatisering',
    events: 'Logboeken'
  }
}

const RouteWithLayout: any = (props: InferProps<typeof RouteWithLayout.propTypes>): JSX.Element => {
  const { t } = useTranslation('navigation', translation);

  const navigation = [
    {
      groupname: '',
      routes: [
        {
          title: t('navigation:account'),
          href: '/account',
          icon: <AccountBoxIcon />,
        },
      ],
    },
    {
      groupname: t('navigation:administration'),
      routes: [
        {
          title: t('navigation:meter_readings'),
          href: '/meterstanden',
          icon: <DashboardIcon />,
        },
      ],
    },
    {
      groupname: t('navigation:financial'),
      routes: [
        {
          title: t('navigation:accounts'),
          href: '/rekeningen',
          icon: <DashboardIcon />,
          children: [
            {
              title: t('navigation:accounts'),
              href: '/rekeningen',
              icon: <DashboardIcon />,
            },
            {
              title: 'Test 2',
              href: '/rekeningen?tab=2',
              icon: <DashboardIcon />,
            },
          ],
        },
        {
          title: 'Bunq',
          href: '/bunq',
          icon: <DashboardIcon />,
        },
      ],
    },
    {
      groupname: t('navigation:automation'),
      routes: [
        {
          title: t('navigation:events'),
          href: '/events',
          icon: <DashboardIcon />,
        },
      ],
    },
  ];

  const { user } = useSession();
  const { appSettings } = useAppSettings();

  const { layout: Layout, component: Component, protectedRoute, ...rest } = props;
  const FinalComponent = user === null && protectedRoute ? SignIn : Component;
  const FinalLayout = user === null && protectedRoute ? MinimalLayout : Layout;

  return (
    <Route
      {...rest}
      render={(matchProps): JSX.Element => (
        <FinalLayout navigation={navigation} title={appSettings['name']} user={user}>
          <FinalComponent {...matchProps} />
        </FinalLayout>
      )}
    />
  );
};

const Routes: FunctionComponent = () => {
  return (
    <Switch>
      <Redirect exact from="/" to="/account" />
      <RouteWithLayout component={SignIn} exact layout={MinimalLayout} path="/sign-in" />
      <RouteWithLayout component={Account} exact layout={MainLayout} path="/account" protectedRoute />
      <RouteWithLayout component={Testpage} exact layout={MainLayout} path="/testpage" protectedRoute />

      <RouteWithLayout component={NotFound} exact layout={MinimalLayout} path="/not-found" />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
