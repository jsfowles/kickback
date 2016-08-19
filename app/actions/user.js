'use strict'
import {
  serverUrl,
  apiVersion,
} from '../env';

const URL = `${serverUrl}/api/${apiVersion}/users`;

import {
  getCurrentUser,
  createUser as createUserAPI,
} from '../utils/api';

import {
  createSession,
  destroySession,
} from './sessions';

export const removeCurrentUser = _ => ({ type: 'REMOVE_CURRENT_USER' });
export const receiveCurrentUser = userData => ({ type: 'RECEIVE_CURRENT_USER', userData });
export const toggleFetching = bool => ({ type: 'TOGGLE_USER_FETCHING', bool });
export const receiveMoreProducts = userData => ({ type: 'RECEIVE_MORE_CURRENT_USER', userData });
export const toggleError = bool => ({ type: 'TOGGLE_ERROR', bool });

export const loadCurrentUser = currentUser => {
  return (dispatch, getState) => {
    let { session } = getState();
    dispatch(toggleFetching(true));

    getCurrentUser(`${URL}/${currentUser.id}`, session.session)
    .then(res => dispatch(createSession(res)))
    .then(res => dispatch(receiveCurrentUser({ ...res, currentUser })))
    .catch(e => console.error(e));
  };
};

export const loadMoreCurrentUser = _ => {
  return (dispatch, getState) => {
    let nextPageUrl = getState().user.nextPageUrl;
    let isFetching = getState().user.isFetching;

    if (!isFetching) {
      dispatch(toggleFetching(true));

      getCurrentUser(nextPageUrl)
      .then(res => dispatch(receiveMoreProducts(res)))
      .catch(e => console.error(e));
    }
  };
};

export const createUser = credentials => {
  return (dispatch, getState) => {
    let emailPresentAndValid = credentials.email !== '';
    let passwordPresentAndValid = credentials.password !== '';

    if (emailPresentAndValid && passwordPresentAndValid) {
      createUserAPI(credentials)
      .then(res => dispatch(createSession(res)))
      .then(res => dispatch(loadCurrentUser(res)))
      .catch(e => console.error(e));
    } else {
      dispatch(toggleError(true));
    }
  };
};
