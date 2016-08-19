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
  Alert,
} from 'react-native';

import {
  createSession,
  destroySession,
  updateUsername,
} from './sessions';

export const removeCurrentUser = _ => ({ type: 'REMOVE_CURRENT_USER' });
export const receiveCurrentUser = userData => ({ type: 'RECEIVE_CURRENT_USER', userData });
export const toggleFetching = bool => ({ type: 'TOGGLE_USER_FETCHING', bool });
export const receiveMoreProducts = userData => ({ type: 'RECEIVE_MORE_CURRENT_USER', userData });

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
    Alert.alert(
      'Is this correct?',
      `You entered your email as: ${credentials.email}`,
      [
        { text: 'Cancel', onPress: () => dispatch(updateUsername('')), },
        { text: 'Ok', onPress: () => {
          createUserAPI(credentials)
          .then(res => {
            if (res.status === 200) {
              return dispatch(createSession(res));
            } else {
              return { error: 'Email address already taken.' }
            }
          })
          .then(res => {
            if (res.status === 'success') {
              dispatch(loadCurrentUser(res))
            } else {
              console.log(res);
            }
          })
          .catch(e => console.error(e));
        }},
      ]
    );
  };
};
