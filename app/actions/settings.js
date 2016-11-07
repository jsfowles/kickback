'use strict';

import { submitProblem as submitProblemAPI } from '../utils/api';
import { fetchUserSuccess } from './user';
import { addMessage } from './app';
import Request from '../utils/request';
import { pop } from './navigation';

export const fetchSessionSuccess = session => ({ type: 'FETCH_SESSION_SUCCESS', session });
export const updatePassword = (password, type) => ({ type: `UPDATE_${type}`, password });
export const updateProblemBody = (body, bool) => ({ type: 'UPDATE_PROBLEM_BODY', body, bool });
export const clearChangePassword = _ => ({ type: 'CLEAR_CHANGE_PASSWORD' });

export const submitProblem = subject => {
  return (dispatch, getState) => {
    let { currentUser } = getState().user;
    let { problemBody } = getState().settings;

    return submitProblemAPI(currentUser, subject, problemBody)
    .then(_ => {
      dispatch(updateProblemBody('', false));
    });
  };
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
      return dispatch(fetchUserSuccess(res.data));
    }

    return dispatch(addMessage(res.errors.full_messages[0]));
  })
  .catch(_ => dispatch({ type: 'FETCH_USER_PASSWORD_FAILURE' }));
};
