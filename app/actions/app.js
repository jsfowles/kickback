'use strict';

export const triggerModal = modal => ({ type: 'TRIGGER_MODAL', modal });
export const clearMessage = _ => ({ type: 'CLEAR_MESSAGE' });
export const addMessage = (message, kind) => ({ type: 'ADD_MESSAGE', message, kind });
export const lastActionTaken = (action, args = null) => ({ type: 'LAST_ACTION_TAKEN', action, args });

export const triggerProductModal = product => dispatch => {
  dispatch({ type: 'ADD_PRODUCT_MODAL', product });
  return dispatch(triggerModal('ProductModal'));
};

export const closeModal = _ => (dispatch, getState) => {
  if (getState().app.modal) {
    return dispatch({ type: 'CLOSE_MODAL' });
  }
};
