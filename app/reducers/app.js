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

export const isConnected = (state = null, action) => {
  if (action.type === 'IS_CONNECTED') {
    return action.bool;
  }
  return state;
};

export const message = (state = null, action) => {
  switch (action.type) {
    case 'CLEAR_MESSAGE':
      return null;
    case 'ADD_MESSAGE':
      return {
        kind: action.kind,
        message: action.message,
      };
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

export const productModal = (state = null, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT_MODAL':
      return action.product;
    default: return state;
  }
};

export default combineReducers({
  modal,
  message,
  lastActionTaken,
  productModal,
  isConnected,
});
