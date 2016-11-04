'use strict';

export const triggerModal = modal => ({ type: 'TRIGGER_MODAL', modal });
export const clearMessage = _ => ({ type: 'CLEAR_MESSAGE' });
export const addMessage = message => ({ type: 'ADD_MESSAGE', message });
export const lastActionTaken = (action, args = null) => ({ type: 'LAST_ACTION_TAKEN', action, args });

export const closeModal = _ => (dispatch, getState) => {
  if (getState().app.modal) {
    return dispatch({ type: 'CLOSE_MODAL' });
  }
};
