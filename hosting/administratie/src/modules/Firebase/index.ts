import React, { useContext } from 'react';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCCyQmkLU5UFKg7C4mqEvTw0QaVZ5ZWKyU',
  authDomain: 'administratie-app.firebaseapp.com',
  databaseURL: 'https://administratie-app.firebaseio.com',
  projectId: 'administratie-app',
  storageBucket: 'administratie-app.appspot.com',
  messagingSenderId: '909589468874',
  appId: '1:909589468874:web:25a83d1464dd94f0',
};
firebase.initializeApp(firebaseConfig);

export const FirebaseContext = React.createContext({});

export const useFirebase = (): any => useContext(FirebaseContext); // eslint-disable-line

export default FirebaseContext;

export { firebase };
