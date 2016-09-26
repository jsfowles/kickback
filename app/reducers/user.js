'use strict';
import { combineReducers } from 'redux';

export const user = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_USER_SUCCESS':
      return action.user;
    case 'DESTROY_SESSION':
      return null;
    default: return state;
  }
};

export default combineReducers({
  user,
});
