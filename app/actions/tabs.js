'use strict';

import { push } from './navigation';

<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> abb85ac... Destroy User now works and returns to feed tab
=======
>>>>>>> 6c326f6b35df0be2faf8d272cb6d5f0bd0ec44ad
export const changeTab = index => ({ type: 'CHANGE_TAB', index });

export const onTabClick = index => (dispatch, getState) => {
  const { session } = getState().session;

  if (session === null && index !== 0) {
    return dispatch(push({ key: 'session' }, 'global'));
  }

  return dispatch(changeTab(index));
};
