'use strict';

export const triggerModal = modal => ({ type: 'TRIGGER_MODAL', modal });

export const closeModal = _ => (dispatch, getState) => {
  if (getState().app.modal) {
    return dispatch({ type: 'CLOSE_MODAL' });
  }
};
