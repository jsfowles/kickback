'use strict';

import { loginUser } from '../utils/api';
import { validateEmail, validatePassword } from '../utils/validations';
import { switchTab } from './navigation';

import {
  loadCurrentUser,
  removeCurrentUser,
  createUser,
} from './user';

export const setSession = (session, bool) => ({ type: 'SET_SESSION', session, bool });
export const changeSessionTab = tab => ({ type: 'CHANGE_SESSION_TAB', tab });
export const toggleError = bool => ({ type: 'TOGGLE_ERROR', bool });
export const updateSessionEmail = string => ({ type: 'UPDATE_EMAIL', string });

export const destroySession = _ => (dispatch) => {
  dispatch(switchTab('SHOPPING_TAB'));
  dispatch(setSession(null, false));
  dispatch(removeCurrentUser());
};

export const createSession = (sess) => (dispatch, getState) => {
  let { headers } = sess;
  let { map } = headers;

  let session = getState().session.session;

  if (map.hasOwnProperty('client')) {
    session = {
      'client': map.client[0],
      'token-type': map['token-type'][0],
      'access-token': map['access-token'][0],
      'uid': map.uid[0],
      'expiry': map.expiry[0],
    };
  }

  dispatch(setSession(session, true));
  return sess.json();
};

export const submitForm = password => (dispatch, getState) => {
  let { session } = getState();
  let credentials = {
    email: session.username,
    password,
  };

  let emailPresentAndValid = credentials.email !== '' && validateEmail(credentials.email);
  let passwordPresentAndValid = credentials.password !== '' && validatePassword(credentials.password);

  if (emailPresentAndValid && passwordPresentAndValid) {
    if (session.currentTab === session.tabs.SIGN_UP) {
      dispatch(createUser(credentials));
    } else {
      loginUser(credentials)
      .then(res => {
        if (res.status === 401) {
          return { error: 'Incorrect username or password.' };
        }

        return dispatch(createSession(res));
      })
      .then(res => {
        if (res.hasOwnProperty('data')) {
          dispatch(loadCurrentUser(res));
        } else {
          return dispatch(toggleError(true));
        }
      })
      .catch(e => e);
    }
  } else {
    dispatch(toggleError(true));
  }
};
