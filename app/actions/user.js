'use strict';

import { formatSession } from '../utils/session';
import Request from '../utils/request';
import {
  Alert,
  NativeModules,
} from 'react-native';

import { updateSessionEmail, fetchSessionSuccess } from './sessions';
import { closeModal, addMessage } from './app';
import { pop } from './navigation';

export const fetchUserSuccess = user => ({ type: 'FETCH_USER_PROFILE_SUCCESS', user });
export const removeCurrentUser = _ => ({ type: 'REMOVE_CURRENT_USER' });
export const toggleFetching = bool => ({ type: 'TOGGLE_USER_FETCHING', bool });
export const receiveMoreProducts = userData => ({ type: 'RECEIVE_MORE_CURRENT_USER', userData });
export const editUser = edit => ({ type: 'EDIT_USER', edit });

export const fetchRequestFailure = msg => ({
  type: 'FETCH_REQUEST_FAILURE',
  message: msg || 'Email already taken',
});

export const fetchUser = (session = null) => (dispatch, getState) => {
  let { user } = getState().user;
  let localSession = session || getState().session.session;

  let requestObj = {
    path: `users/${user.id}`,
    method: 'GET',
    headers: localSession,
  };
  console.log(user);
  dispatch({ type: 'FETCH_USER_PROFILE_REQUEST' });

  return new Request(requestObj).then(res => dispatch(fetchUserSuccess(res)))
  .catch(_ => dispatch({ type: 'FETCH_USER_PROFILE_FAILURE' }));
};

export const createUser = credentials => (dispatch, getState) => {
  let { lastActionTaken } = getState().app;

  Alert.alert(
    'Is this correct?',
    `You entered your email as: ${credentials.email}`,
    [
      { text: 'Cancel', onPress: () => dispatch(updateSessionEmail('')) },
      { text: 'Ok', onPress: () => {
        let requestObj = {
          method: 'POST',
          path: `auth`,
          body: credentials,
          requestCallback: res => {
            if (res.status === 200) {
              dispatch(closeModal());
              dispatch(addMessage('Your account has been created', 'success'));
              return dispatch(fetchSessionSuccess(formatSession(res)));
            }

            return dispatch(addMessage('Email already taken', 'error'));
          },
        };

        return new Request(requestObj)
        .then(res => {
          if (res.status === 'success') {
            dispatch(fetchUserSuccess({
              ...res.data,
              name: null,
              totalApproved: 0,
              totalPending: 0,
              totalWaitingApproval: 0,
              totalEarned: 0,
              totalPendingOrWaitingApproval: 0,
            }));
            NativeModules.RNAmplitude.setUserId(`${res.data.id} - ${res.data.email}`);
            NativeModules.RNAmplitude.logEvent('User Signup', { action: lastActionTaken.action.name });
            dispatch(lastActionTaken.action(lastActionTaken.args));
            return dispatch({ type: 'CLEAR_LAST_ACTION_TAKEN' });
          }
        });
      }},
    ]
  );
};

export const attachPayable = u => (dispatch, getState) => {
  let { session } = getState().session;
  let { user } = getState().user;

  let requestObj = {
    method: 'POST',
    path: `/users/${user.id}/payable_accounts`,
    headers: session,
    body: { email: u.email },
  };

  dispatch({ type: 'FETCH_USER_PAYABLE_REQUEST' });

  return new Request(requestObj)
  .then(res => {
    dispatch({ type: 'FETCH_USER_PAYABLE_SUCCESS' });
    dispatch(pop('profile'));
    NativeModules.RNAmplitude.logEvent('Attach Payable', {});
    dispatch(addMessage('Check email for enrollment instructions', 'success'));
    return dispatch(fetchUserSuccess(res));
  })
  .catch(_ =>{
    return dispatch({ type: 'FETCH_USER_PAYABLE_FAILURE' });
  });
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
      avatar: user.avatarUrl,
    },
    requestCallback: (res) => {
      if (res.status !== 200) { return dispatch(fetchRequestFailure()); }
      return dispatch(fetchSessionSuccess(formatSession(res)));
    },
  };
  console.log(requestObj);
  dispatch({ type: 'FETCH_USER_UPDATE_REQUEST' });

  return new Request(requestObj)
  .then(res => {
    dispatch({ type: 'FETCH_USER_UPDATE_SUCCESS' });
    dispatch(pop('profile'));
    dispatch(addMessage('Your profile has been updated', 'success'));
    console.log(res);
    return dispatch(fetchUserSuccess(res));
  })
  .catch(_ => dispatch({ type: 'FETCH_USER_UPDATE_FAILURE' }));
};
