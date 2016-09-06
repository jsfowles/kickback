'use strict';

export const currentUser = (state = {}, action) => {
  switch (action.type) {
  case 'DESTROY_CURRENT_USER':
    return {};
  case 'CREATE_CURRENT_USER':
    return action.currentUser;
  case 'UPDATE_CURRENT_USER':
    return action.currentUser;
  default:
    return state;
  }
};
