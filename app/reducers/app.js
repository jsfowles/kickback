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

export default combineReducers({
  modal,
});
