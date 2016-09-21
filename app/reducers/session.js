import { combineReducers } from 'redux';

export const currentSession = (state = {}, action) => {
  switch (action.type) {
    case 'CREATE_SESSION':
      return action.session;
    case 'UPDATE_SESSION':
      return action.session;
    case 'DESTROY_SESSION':
      return {};
    default:
      return state;
  }
};

export const tab = (state = 'SIGN_UP', action) => {
  if (state === action.tab) { return state; }

  switch (action.type) {
    case 'CHANGE_SESSION_TAB':
      return action.tab;
    default: return state;
  }
};

export const enteredEmail = (state = null, action) => {
  if (action.string === '') { return null; }

  switch (action.type) {
    case 'UPDATE_EMAIL':
      return action.string;
    default: return state;
  }
};

export default combineReducers({
  currentSession,
  tab,
  enteredEmail,
});
