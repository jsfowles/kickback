'use strict';

import { push } from './navigation';

<<<<<<< HEAD
=======

>>>>>>> abb85ac... Destroy User now works and returns to feed tab
export const changeTab = index => ({ type: 'CHANGE_TAB', index });

export const onTabClick = index => (dispatch, getState) => {
  const { session } = getState().session;

  if (session === null && index !== 0) {
    return dispatch(push({ key: 'session' }, 'global'));
  }

  return dispatch(changeTab(index));
};
