'use strict';

import { NativeModules } from 'react-native';

export const triggerModal = modal => ({ type: 'TRIGGER_MODAL', modal });
export const clearMessage = _ => ({ type: 'CLEAR_MESSAGE' });
export const addMessage = (message, kind) => ({ type: 'ADD_MESSAGE', message, kind });
export const lastActionTaken = (action, args = null) => ({ type: 'LAST_ACTION_TAKEN', action, args });

export const triggerProductModal = product => dispatch => {
  NativeModules.RNAmplitude.logEvent('Product Modal Tap', product);
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
