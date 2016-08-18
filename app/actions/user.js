'use strict'
import {
  serverUrl,
  apiVersion,
} from '../env';

const URL = `${serverUrl}/api/${apiVersion}/users`;

import { getCurrentUser } from '../utils/api';

export const removeCurrentUser = _ => ({ type: 'REMOVE_CURRENT_USER' });
export const receiveCurrentUser = userData => ({ type: 'RECEIVE_CURRENT_USER', userData });
export const toggleFetching = bool => ({ type: 'TOGGLE_USER_FETCHING', bool });
//
// TODO (Riley): Lets change this to something like appendProducts
export const receiveMoreProducts = userData => ({ type: 'RECEIVE_MORE_CURRENT_USER', userData });

export const loadCurrentUser = currentUser => {
  return (dispatch, getState) => {
    dispatch(toggleFetching(true));

    getCurrentUser(`${URL}/${currentUser}`)
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
