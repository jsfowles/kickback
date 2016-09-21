'use strict';

import { loginUser } from '../utils/api';
import { validateCredentials } from '../utils/validations';
import { switchTab } from './navigation';

import {
  loadCurrentUser,
  removeCurrentUser,
  createUser,
} from './user';

export const receiveSession = (session, bool) => ({ type: 'SET_SESSION', session, bool });
export const changeSessionTab = tab => ({ type: 'CHANGE_SESSION_TAB', tab });
export const toggleError = bool => ({ type: 'TOGGLE_ERROR', bool });
export const updateSessionEmail = string => ({ type: 'UPDATE_EMAIL', string });

export const destroySession = _ => (dispatch) => {
  dispatch(switchTab('SHOPPING_TAB'));
  dispatch(receiveSession(null, false));
  dispatch(removeCurrentUser());
};

export const createSession = ({ headers }) => dispatch => {
  let { map } = headers;
  let session = {};

  if (map.hasOwnProperty('client')) {
    session = {
      'client': map.client[0],
      'token-type': map['token-type'][0],
      'access-token': map['access-token'][0],
      'uid': map.uid[0],
      'expiry': map.expiry[0],
    };
  }

  return dispatch(receiveSession(session, true));
};

export const submitForm = password => (dispatch, getState) => {
  let { enteredEmail, tab } = getState().session;
  let credentials = {
    email: enteredEmail,
    password,
  };

  if (validateCredentials(credentials)) {
    if (tab === 'SIGN_UP') {
      dispatch(createUser(credentials));
    } else {
      loginUser(credentials)
      .then(res => {
        if (res.status === 401) {
          return { error: 'Incorrect username or password.' };
        }

        return dispatch(createSession(res));
      })
      .catch(e => e);
    }
  } else {
    dispatch(toggleError(true));
  }
};
