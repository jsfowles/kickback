import { combineReducers } from 'redux';

export const modal = (state = null, action) => {
  switch (action.type) {
    case 'TRIGGER_MODAL':
      return action.modal;
    case 'CLOSE_MODAL':
      return null;
    default: return state;
  }
};

export const message = (state = null, action) => {
  switch (action.type) {
    case 'CLEAR_MESSAGE':
      return null;
    case 'ADD_MESSAGE':
      return action.message;
    default: return state;
  }
};

export const lastActionTaken = (state = null, action) => {
  switch (action.type) {
    case 'LAST_ACTION_TAKEN':
      return {
        action: action.action,
        args: action.args,
      };
    case 'CLEAR_LAST_ACTION_TAKEN':
      return null;
    default: return state;
  }
};

export default combineReducers({
  modal,
  message,
  lastActionTaken,
});
