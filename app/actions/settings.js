'use strict';

import { fetchUserSuccess } from './user';
import { addMessage } from './app';
import Request from '../utils/request';
import { pop } from './navigation';
import { NativeModules } from 'react-native';

export const fetchSessionSuccess = session => ({ type: 'FETCH_SESSION_SUCCESS', session });
export const updatePassword = (password, type) => ({ type: `UPDATE_${type}`, password });
export const updateProblemBody = (body, bool) => ({ type: 'UPDATE_PROBLEM_BODY', body, bool });
export const clearChangePassword = _ => ({ type: 'CLEAR_CHANGE_PASSWORD' });

export const submitProblem = user => (dispatch, getState) => {
  let { session } = getState().session;

  let requestObj = {
    method: 'POST',
    path: '/help',
    headers: session,
    body: {
      email: user.email,
      subject: user.subject,
      body: user.body,
    },
  };

  return new Request(requestObj)
  .then(_ => {
    dispatch(updateProblemBody('', false));
    NativeModules.RNAmplitude.logEvent('Feedback Submitted', {});
    return dispatch(addMessage('Feedback has been sent', 'success'));
  });
};

export const changePassword = passwordObj => (dispatch, getState) => {
  let { currentPassword, newPassword, passwordConfirmation } = passwordObj;
  let { session } = getState().session;

  let requestObj = {
    method: 'PUT',
    path: 'auth/password',
    headers: session,
    body: {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: passwordConfirmation,
    },
  };

  dispatch({ type: 'FETCH_USER_PASSWORD_REQUEST' });

  return new Request(requestObj)
  .then(res => {
    if (res.success) {
      dispatch({ type: 'FETCH_USER_PASSWORD_SUCCESS' });
      dispatch(clearChangePassword());
      dispatch(pop('profile'));
      dispatch(addMessage('Password successfully changed', 'success'));
      return dispatch(fetchUserSuccess(res.data));
    }

    return dispatch(addMessage(res.errors.full_messages[0], 'error'));
  })
  .catch(_ => dispatch({ type: 'FETCH_USER_PASSWORD_FAILURE' }));
};
