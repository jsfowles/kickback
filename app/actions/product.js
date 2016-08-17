'use strict';

import { createLink } from '../utils/api';
import { toggleSessionModal } from './sessions';
import { ActionSheetIOS } from 'react-native';

export const toggleCreatingRecommendation = (bool) => ({ type: 'TOGGLE_CREATING_RECOMMENDATION', bool });

export const recommendProduct = (product) => {
  return (dispatch, getState) => {
    const { user } = getState();

    if (user.currentUser) {
      // If user is currently logged in
      dispatch(toggleCreatingRecommendation(true));

      createLink(product, user.currentUser.id).then((res) => {
        dispatch(toggleCreatingRecommendation(false));

        ActionSheetIOS.showShareActionSheetWithOptions(
          { url: `http://www.${res.url}` },
          (e) => console.error(e),
          (success,method) => {
            // TODO (Riley) : Show success
          }
        )
      // TODO (Riley) : Show some type of error
      }).catch((res) => {
        dispatch(toggleCreatingRecommendation(false));
      });
    } else {
      // User is not logged in
      dispatch(toggleSessionModal(true));
    }
  }
};
