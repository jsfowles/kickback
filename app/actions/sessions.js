'use strict';

import Request from '../utils/request';
import { validateCredentials } from '../utils/validations';
import { formatSession } from '../utils/session';
import { pop } from './navigation';
import { fetchUserSuccess } from './user';
import { changeTab } from './tabs';
import { closeModal } from './app';
import { fetchFeed } from './feed';
import {
  createUser,
} from './user';

export const changeSessionTab = tab => ({ type: 'CHANGE_SESSION_TAB', tab });
export const updateSessionEmail = email => ({ type: 'UPDATE_EMAIL', email });
export const fetchSessionSuccess = session => ({ type: 'FETCH_SESSION_SUCCESS', session: formatSession(session) });

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
    path: 'auth/sign_in',
    body: creds,
    requestCallback: (res) => {
      if (res.status === 401) { return dispatch(fetchRequestFailure()); }
      dispatch(closeModal());
      dispatch(fetchSessionSuccess(res));
    },
  };

  if (!validateCredentials(creds)) { return dispatch(fetchRequestFailure()); }
  if (tab === 'SIGN_UP') { return dispatch(createUser(creds)); }

  dispatch({ type: 'FETCH_SESSION_REQUEST' });

  return new Request(requestObj)
  .then(res => {
    return dispatch(fetchUserSuccess(res));
  });
};

export const destroySession = _ => (dispatch, getState) => {
  let { session } = getState().session;

  let requestObj = {
    method: 'DELETE',
    path: 'auth/sign_out',
    headers: session,
  };

  return new Request(requestObj)
  .then(_ => {
    dispatch(pop('profile'));
    dispatch(changeTab(0));
    dispatch({ type: 'DESTROY_SESSION' });
    return dispatch(fetchFeed());
  });
};
