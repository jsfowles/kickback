'use strict';

import {
  createUser as createUserAPI,
} from '../utils/api';

import { formatSession } from '../utils/session';
import Request from '../utils/request';
import { Alert } from 'react-native';
import { updateSessionEmail, fetchSessionSuccess } from './sessions';
import { closeModal } from './app';
import { pop } from './navigation';

export const fetchUserSuccess = user => ({ type: 'FETCH_USER_PROFILE_SUCCESS', user });
export const removeCurrentUser = _ => ({ type: 'REMOVE_CURRENT_USER' });
export const toggleFetching = bool => ({ type: 'TOGGLE_USER_FETCHING', bool });
export const receiveMoreProducts = userData => ({ type: 'RECEIVE_MORE_CURRENT_USER', userData });
export const editUser = edit => ({ type: 'EDIT_USER', edit });

export const fetchRequestFailure = msg => ({
  type: 'FETCH_REQUEST_FAILURE',
  message: msg || 'Invalid email or password',
});

export const fetchUser = (session = null) => (dispatch, getState) => {
  let { user } = getState().user;
  let localSession = session || getState().session.session;

  let requestObj = {
    path: `users/${user.id}`,
    method: 'GET',
    headers: localSession,
  };

  dispatch({ type: 'FETCH_USER_PROFILE_REQUEST' });

  return new Request(requestObj).then(res => dispatch(fetchUserSuccess(res)))
  .catch(_ => dispatch({ type: 'FETCH_USER_PROFILE_FAILURE' }));
};

export const createUser = credentials => (dispatch) => {
  Alert.alert(
    'Is this correct?',
    `You entered your email as: ${credentials.email}`,
    [
      { text: 'Cancel', onPress: () => dispatch(updateSessionEmail('')) },
      { text: 'Ok', onPress: () => {
        createUserAPI(credentials)
        .then(res => {
          if (res.status === 200) {
            dispatch(closeModal());
            // TODO: Should log you in.
            // return dispatch(createSession(res));
          }

          return { error: 'Email address already taken.' };
        })
        .then(res => {
          if (res.status === 'success') {
            // TODO: this isn't going to work either
            // dispatch(fetchUser(res));
          }
        });
      }},
    ]
  );
};

export const attachPayable = user => (dispatch, getState) => {
  let { session } = getState().session;

  let requestObj = {
    method: 'POST',
    path: `/users/${user.id}/payable_accounts`,
    headers: session,
    body: { email: user.payableEmail },
  };

  dispatch({ type: 'FETCH_USER_PAYABLE_REQUEST' });

  return new Request(requestObj)
  .then(res => {
    dispatch({ type: 'FETCH_USER_PAYABLE_SUCCESS' });
    dispatch(pop('profile'));
    return dispatch(fetchUserSuccess(res));
  })
  .catch(_ => dispatch({ type: 'FETCH_USER_PAYABLE_FAILURE' }));
};

export const updateUserProfile = user => (dispatch, getState) => {
  let { session } = getState().session;

  let requestObj = {
    method: 'PUT',
    path: `/auth`,
    headers: session,
    body: {
      email: user.email,
      name: user.name,
    },
    requestCallback: (res) => {
      if (res.status !== 200) { return dispatch(fetchRequestFailure()); }
      return dispatch(fetchSessionSuccess(formatSession(res)));
    },
  };

  dispatch({ type: 'FETCH_USER_UPDATE_REQUEST' });

  return new Request(requestObj)
  .then(res => {
    dispatch({ type: 'FETCH_USER_UPDATE_SUCCESS' });
    dispatch(pop('profile'));
    return dispatch(fetchUserSuccess(res));
  })
  .catch(_ => dispatch({ type: 'FETCH_USER_UPDATE_FAILURE' }));
};
