'use strict';

import { loginUser } from '../utils/api';
import { validateCredentials } from '../utils/validations';
import { formatSession } from '../utils/session';
import { pop } from './navigation';

import {
  createUser,
} from './user';

export const changeSessionTab = tab => ({ type: 'CHANGE_SESSION_TAB', tab });
export const updateSessionEmail = string => ({ type: 'UPDATE_EMAIL', string });
export const fetchSessionSuccess = res => ({ type: 'FETCH_SESSION_SUCCESS', session: formatSession(res) });
export const destroySession = _ => ({ type: 'DESTROY_SESSION' });

export const fetchRequestFailure = msg => ({
  type: 'FETCH_REQUEST_FAILURE',
  message: msg || 'Invalid username or password',
});

export const fetchSession = password => (dispatch, getState) => {
  let { enteredEmail, tab } = getState().session;
  let creds = {
    email: enteredEmail || '',
    password,
  };

  if (!validateCredentials(creds)) { return dispatch(fetchRequestFailure()); }
  if (tab === 'SIGN_UP') { return dispatch(createUser(creds)); }

  dispatch({ type: 'FETCH_SESSION_REQUEST' });

  return loginUser(creds).then(res => {
    if (res.status === 401) { return dispatch(fetchRequestFailure()); }

    dispatch(pop('global'));
    return dispatch(fetchSessionSuccess(res));
  });
};

