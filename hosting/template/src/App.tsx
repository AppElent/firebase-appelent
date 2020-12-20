import React, { useState, useEffect } from 'react';
import { Router } from 'react-router-dom';
import logo from './logo.svg';
import theme from 'theme';
import './App.css';

import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from '@material-ui/styles';
import { SnackbarProvider } from 'notistack';
import { createBrowserHistory } from 'history';
import { QueryClient, QueryClientProvider } from 'react-query';

import Log from 'appelent-react/lib/modules/Log';
import { CacheContext, getCache, setCache, clearCache, clearKey } from 'appelent-react/lib/context/CacheContext';
import { SocketIOProvider } from 'appelent-react/lib/modules/SocketIO';
import FirebaseContext from 'appelent-react/lib/context/FirebaseContext';
import { AppSettingsContext, setAppSettings } from 'appelent-react/lib/context/AppSettings';
import i18n from 'appelent-react/lib/modules/I18NEXT';
import 'assets/scss/index.scss';

import Routes from './Routes';
 
/**
 * Create browser history
 */
const browserHistory = createBrowserHistory();

/**
 * Create logger
 */
localStorage.setItem('debug', 'administratie-app:*');
const log = new Log(process.env.NODE_ENV !== 'production');
log.info('Starting application');

/**
 * Firebase configuration.
 */
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf6WbdUN-SjSPRKWrjJAs3VQLYxhJ_N2w",
  authDomain: "app-elent.firebaseapp.com",
  projectId: "app-elent",
  storageBucket: "app-elent.appspot.com",
  messagingSenderId: "940844938383",
  appId: "1:940844938383:web:433f3eb346cb28d63aecfa",
  measurementId: "G-LD3KJRT561"
};
firebase.initializeApp(firebaseConfig);

// Typescript type for auth data
type AuthDataType = {
  user?: firebase.User | null | undefined;
  firebase?: typeof firebase | null;
  isInitializing?: boolean;
  ref?: firebase.firestore.DocumentReference | null;
  userInfo?: any;
  userDataRef?: firebase.firestore.CollectionReference | null;
  log: InstanceType<typeof Log>;
};

/**
 * React-Query queryclient to cache queries
 */
const queryClient = new QueryClient()

function App() {
  if (window.location.protocol !== 'https:' && process.env.NODE_ENV !== 'development') {
    window.location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
  }

  const [authData, setAuthData] = useState<AuthDataType>({
    firebase,
    user: undefined,
    isInitializing: true,
    ref: null,
    userDataRef: null,
    userInfo: {},
    log,
  });

  /**
   * Initialize appsettings
   */
  const name = 'Energy'

  let environment = 'production';
  let apiUrl = 'https://appelent-api.herokuapp.com';
  if (window.location.host.toLowerCase().startsWith('localhost')) {
    //environment = 'local';
    //apiUrl = 'http://localhost:8000';
  } else if (window.location.host.toLowerCase().startsWith('dev.')) {
    environment = 'development';
    apiUrl = 'https://appelent-api-dev.herokuapp.com';
  } else if (window.location.host.toLowerCase().startsWith('staging.')) {
    environment = 'staging';
    apiUrl = 'https://appelent-api-staging.herokuapp.com';
  }

  const [ appSettings, setAppSettingsLocal ] = useState({ name, environment, apiUrl });
  const [ cacheData, setCacheData ] = useState({  });

  useEffect(() => {
    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(async returnedUser => {
      clearCache(setCacheData);
      let ref = null;
      let userDataRef = null;
      if (returnedUser) {
        ref = firebase
          .firestore()
          .doc('/env/' + process.env.REACT_APP_FIRESTORE_ENVIRONMENT + '/users/' + returnedUser.uid);
        userDataRef = ref.collection('config');
      }
      log.log('User auth wijziging', returnedUser);
      setAuthData({ ...authData, user: returnedUser, isInitializing: false, ref, userDataRef });
    });
    // unsubscribe to the listener when unmounting
    return (): void => unsubscribe();
  }, []); // eslint-disable-line

  if (authData.isInitializing) {
    return <div>Loading</div>;
  }

  // Set SocketIO options
  const socketIoOptions = { query: { token: '' } };

  return (
    <SocketIOProvider url={apiUrl} opts={socketIoOptions}>
      <QueryClientProvider client={queryClient}>
        <I18nextProvider i18n={i18n}>
          <AppSettingsContext.Provider value={{ appSettings, setAppSettings: setAppSettings(setAppSettingsLocal) }}>
            <FirebaseContext.Provider value={authData}>
              <CacheContext.Provider
                value={{
                  data: cacheData,
                  get: getCache(cacheData),
                  set: setCache(setCacheData),
                  clear: clearCache(setCacheData),
                  clearKey: clearKey(setCacheData),
                }}
              >
                <ThemeProvider theme={theme}>
                  <SnackbarProvider maxSnack={3}>
                    <Router history={browserHistory}>
                      <Routes />
                    </Router>
                  </SnackbarProvider>
                </ThemeProvider>
              </CacheContext.Provider>
            </FirebaseContext.Provider>
          </AppSettingsContext.Provider>
        </I18nextProvider>
      </QueryClientProvider>
    </SocketIOProvider>
  );
}

export default App;
