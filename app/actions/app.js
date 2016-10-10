'use strict';

export const triggerModal = modal => ({ type: 'TRIGGER_MODAL', modal });
export const closeModal = _ => ({ type: 'CLOSE_MODAL' });
