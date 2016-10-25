'use strict';

import {
  createUser as createUserAPI,
  updateUser as updateUserAPI,
} from '../utils/api';

import Request from '../utils/request';
import { Alert } from 'react-native';
import { updateSessionEmail } from './sessions';
import { closeModal } from './app';
import { validateEmail } from '../utils/validations';
import { fetchRequestFailure } from './sessions';

export const fetchUserSuccess = user => ({ type: 'FETCH_USER_SUCCESS', user });
export const removeCurrentUser = _ => ({ type: 'REMOVE_CURRENT_USER' });
export const toggleFetching = bool => ({ type: 'TOGGLE_USER_FETCHING', bool });
export const receiveMoreProducts = userData => ({ type: 'RECEIVE_MORE_CURRENT_USER', userData });
export const editUser = edit => ({ type: 'EDIT_USER', edit });
export const updatePayableEmail = email => ({ type: 'UPDATE_PAYABLE_EMAIL', email });

export const fetchUser = _ => (dispatch, getState) => {
  let { user } = getState().user;
  let { session } = getState().session;

  let requestObj = {
    path: `users/${user.id}`,
    method: 'GET',
    headers: session,
  };

  return new Request(requestObj).then(
    res => dispatch(fetchUserSuccess({ ...res, id: res.user.id, email: res.user.email }))
  );
};

export const loadMoreCurrentUser = _ => {
  return (dispatch, getState) => {
    let nextPageUrl = getState().user.nextPageUrl;
    let isFetching = getState().user.isFetching;

    if (!isFetching) {
      dispatch(toggleFetching(true));

      getCurrentUser(nextPageUrl)
      .then(res => dispatch(receiveMoreProducts(res)));
    }
  };
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

export const attachPayable = _ => (dispatch, getState) => {
  let { user } = getState().user;
  let { enteredEmail, session } = getState().session;

  let creds = {
    email: enteredEmail || '',
  };

  let requestObj = {
    method: 'POST',
    path: `/users/${user.id}/payable_accounts`,
    headers: session,
    body: creds,
  };

  if (!validateEmail(creds)) { return dispatch(fetchRequestFailure()); }

  dispatch({ type: 'FETCH_SESSION_REQUEST' });

  return new Request(requestObj)
  .then(res => {
    console.log(res);
    return dispatch(fetchUserSuccess(res.data));
  });
};

export const updateUser = _ => {
  return (dispatch, getState) => {
    let { session } = getState().session;

    updateUserAPI(session)
    .then(res => {
      if (res.status === 200) {
      }
    })
    .then(res => {
      if (res.status === 'success') {
        return dispatch(loadCurrentUser(res));
      }
    });
  };
};
