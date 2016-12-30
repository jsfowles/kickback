'use strict';

import { NativeModules } from 'react-native';

export const clearMessage = _ => ({ type: 'CLEAR_MESSAGE' });
export const addMessage = (message, kind) => ({ type: 'ADD_MESSAGE', message, kind });
export const lastActionTaken = (action, args = null) => ({ type: 'LAST_ACTION_TAKEN', action, args });

export const triggerModal = modal => dispatch => {
  NativeModules.RNAmplitude.logEvent(`${modal} modal tap`, {});
  return dispatch({ type: 'TRIGGER_MODAL', modal });
};

export const triggerProductModal = product => dispatch => {
  dispatch({ type: 'ADD_PRODUCT_MODAL', product });
  return dispatch(triggerModal('ProductModal'));
};

export const closeModal = _ => (dispatch, getState) => {
  if (getState().app.modal) {
    return dispatch({ type: 'CLOSE_MODAL' });
  }
};

export const connectionChanged = bool => (dispatch, getState) => {
  const { message } = getState().app;

  dispatch({ type: 'IS_CONNECTED', bool });

  if (!bool) {
    return dispatch(addMessage('Not connected to network', 'neutral'));
  }

  if (bool && message) {
    return dispatch(clearMessage());
  }
};
