import { combineReducers } from 'redux';

export const session = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_SESSION_SUCCESS':
      return action.session;
    default: return state;
  }
};

export const isFetching = (state = false) => {
  return state;
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
  session,
  isFetching,
  tab,
  enteredEmail,
});
