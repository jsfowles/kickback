'use strict';

import Request from '../utils/request';
import { validateCredentials } from '../utils/validations';
import { formatSession } from '../utils/session';
import { pop } from './navigation';
import { changeTab } from './tabs';
import { closeModal } from './app';
import { fetchFeed } from './feed';
import { createUser, fetchUser, fetchUserSuccess } from './user';
import { fetchUserProducts } from './user-products';

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

export const destroySession = (session = null) => (dispatch, getState) => {
  let localSession = session || getState().session.session;

  let requestObj = {
    method: 'DELETE',
    path: 'auth/sign_out',
    headers: localSession,
  };

  return new Request(requestObj)
  .then(_ => {
    dispatch(pop('profile'));
    dispatch(changeTab(0));
    dispatch({ type: 'DESTROY_SESSION' });
    return dispatch(fetchFeed());
  });
};

/**
 * Validates the current session.
 * @returns { function } either will destroy the session or get the user profile and products
 */
export const fetchValidateSession = () => (dispatch, getState) => {
  let { session } = getState().session;

  if (session) {
    let requestObj = {
      method: 'GET',
      path: 'auth/validate_token',
      headers: session,
    };

    return new Request(requestObj)
    .then(res => {
      if (res.success === true) {
        dispatch(fetchUser(session));
        return dispatch(fetchUserProducts(session));
      }

      return dispatch(destroySession(session));
    });
  }
};
