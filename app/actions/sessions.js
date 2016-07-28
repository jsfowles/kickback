'use strict';

import { loginUser } from '../utils/api';
import { loadCurrentUser, removeCurrentUser } from './user';
import { switchTab } from './navigation';

export const toggleSessionModal = (bool) => ({ type: 'TOGGLE_SESSION_MODAL', bool, });
export const setSession = (session, bool) => ({ type: 'SET_SESSION', session, bool, });

export const createSession = (credentials) => {
  return (dispatch, getState) => {
    loginUser(credentials)
    .then(res => {
      if (res.status === 200) {
        const session = {
          'client': res.headers.map['client'][0],
          'token-type': res.headers.map['token-type'][0],
          'access-token': res.headers.map['access-token'][0],
          'uid': res.headers.map['uid'][0],
          'expiry': res.headers.map['expiry'][0],
        };

        // TODO (Riley): I should probably cache the action taken before opening
        //               the modal, so that I don't need to have them redo their
        //               action from before. PRIORITY: Low
        dispatch(setSession(session, true));
        return res.json();
      } else {
        // TODO (Riley): Handle 401
      };
    })
    .then(res => {
      if (!!res) {
        // TODO (Riley): This could probably one day return the product data as
        //               as well, right now we are making to API requests.
        //               PRIORITY: Low
        dispatch(loadCurrentUser(res.data));
      } else {
        console.log('TODO: Show Error');
      };
    });
  };
};
