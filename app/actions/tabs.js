'use strict';

import { push } from './navigation';

const changeTab = index => ({ type: 'CHANGE_TAB', index });

export const onTabClick = index => (dispatch, getState) => {
  const { currentUser } = getState();

  if (!currentUser.id && index !== 0) {
    return dispatch(push({ key: 'session' }, 'global'));
  }

  return dispatch(changeTab(index));
};
