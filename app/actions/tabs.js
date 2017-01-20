'use strict';

import { triggerModal, lastActionTaken } from './app';
import { NativeModules } from 'react-native';


export const changeTab = index => ({ type: 'CHANGE_TAB', index });

export const onTabClick = index => (dispatch, getState) => {
  const { session } = getState().session;

  if (session === null && index !== 0) {
    dispatch(lastActionTaken(onTabClick, index));
    return dispatch(triggerModal('session'));
  }

  NativeModules.RNAmplitude.logEvent(index ? 'Profile Tab' : 'Feed Tab', {});
  return dispatch(changeTab(index));
};
