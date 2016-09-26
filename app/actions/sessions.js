'use strict';

import Request from '../utils/request';
import { loginUser } from '../utils/api';
import { validateCredentials } from '../utils/validations';
import { formatSession } from '../utils/session';
import { pop } from './navigation';
import { fetchUserSuccess } from './user';

import {
  createUser,
} from './user';

export const changeSessionTab = tab => ({ type: 'CHANGE_SESSION_TAB', tab });
export const updateSessionEmail = email => ({ type: 'UPDATE_EMAIL', email });
export const fetchSessionSuccess = session => ({ type: 'FETCH_SESSION_SUCCESS', session: formatSession(session) });
export const destroySession = _ => ({ type: 'DESTROY_SESSION' });

export const fetchRequestFailure = msg => ({
  type: 'FETCH_REQUEST_FAILURE',
  message: msg || 'Invalid email or password',
});

export const fetchSession = password => (dispatch, getState) => {
  let { enteredEmail, tab } = getState().session;

  let creds = {
    email: enteredEmail || '',
    password,
  };

  let requestObj = {
    method: 'POST',
    path: '/auth/sign_in',
    body: creds,
    requestCallback: (res) => {
      if (res.status === 401) { return dispatch(fetchRequestFailure()); }

      dispatch(pop('global'));
      dispatch(fetchSessionSuccess(res));
    },
  };

  if (!validateCredentials(creds)) { return dispatch(fetchRequestFailure()); }
  if (tab === 'SIGN_UP') { return dispatch(createUser(creds)); }

  dispatch({ type: 'FETCH_SESSION_REQUEST' });

  return new Request(requestObj)
  .then(res => dispatch(fetchUserSuccess(res.data)));
};
