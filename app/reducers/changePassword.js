'use strict';
import { combineReducers } from 'redux';

const password = (type) => (state = null, action) => {
  switch (action.type) {
    case `UPDATE_${type}`:
      return action.password;
    case 'RESET_PASSWORDS':
      return null;
    default: return state;
  }
};

const currentPassword = password('CURRENT_PASSWORD');
const newPassword = password('NEW_PASSWORD');
const passwordConfirmation = password('PASSWORD_CONFIRMATION');

export default combineReducers({
  currentPassword,
  newPassword,
  passwordConfirmation,
});
