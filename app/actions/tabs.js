'use strict';

import { triggerModal } from './app';

export const changeTab = index => ({ type: 'CHANGE_TAB', index });

export const onTabClick = index => (dispatch, getState) => {
  const { session } = getState().session;

  if (session === null && index !== 0) {
    return dispatch(triggerModal('session'));
  }

  return dispatch(changeTab(index));
};
