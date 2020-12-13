import _ from 'lodash';

let apiUrl = 'https://api.appelent.com';
if (window.location.host.toLowerCase().startsWith('localhost')) {
  apiUrl = 'http://localhost:3001';
} else if (window.location.host.toLowerCase().startsWith('dev.')) {
  apiUrl = 'https://appelent-api-dev.herokuapp.com';
} else if (window.location.host.toLowerCase().startsWith('staging.')) {
  apiUrl = 'https://appelent-api-staging.herokuapp.com';
}

'use strict';
import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://rosehulmangolf.com',
  baseURL: apiUrl,
  timeout: 1000,
  headers: {},
});

export default api;

const fetchBackend = async (url: string, options: any) => {
  url = apiUrl + url;
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
    body: JSON.stringify(options.body),
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
