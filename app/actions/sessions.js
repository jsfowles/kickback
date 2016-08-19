'use strict';

import { loginUser } from '../utils/api';
import { switchTab } from './navigation';

import {
  loadCurrentUser,
  removeCurrentUser,
  createUser,
} from './user';

export const toggleSessionModal = (bool) => ({ type: 'TOGGLE_SESSION_MODAL', bool, });
export const setSession = (session, bool) => ({ type: 'SET_SESSION', session, bool, });
export const changeForm = tab => ({ type: 'CHANGE_FORM', tab });
export const updateUsername = username => ({ type: 'UPDATE_USERNAME', username });

export const destroySession = _ => {
  return (dispatch, getState) => {
    dispatch(setSession(null, false));
    dispatch(removeCurrentUser());
    dispatch(switchTab('SHOPPING_TAB'));
  };
};

export const createSession = (sess) => {
  return (dispatch, getState) => {
    let { status, headers } = sess;
    let { map } = headers;

    if (status === 200) {
      let session = getState().session.session;

      if (map.hasOwnProperty('client')) {
        session = {
          'client': map['client'][0],
          'token-type': map['token-type'][0],
          'access-token': map['access-token'][0],
          'uid': map['uid'][0],
          'expiry': map['expiry'][0],
        };
      }

      dispatch(setSession(session, true));
      return sess.json();
    } else {
      console.log('TODO: 401');
      dispatch(destroySession());
    };
  };
};

export const submitForm = password => {
  return (dispatch, getState) => {
    let { user, session } = getState();
    let credentials = {
      email: session.username,
      password,
    };

    if (session.currentTab === session.tabs.SIGN_UP) {
      dispatch(createUser(credentials));
    } else {
      loginUser(credentials)
      .then(res => dispatch(createSession(res)))
      .then(res => dispatch(loadCurrentUser(res.data)))
      .catch(e => console.log('error in submitForm'));
    }
  };
};
