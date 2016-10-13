'use strict';

import { createLink } from '../utils/api';
import { ActionSheetIOS } from 'react-native';
import { triggerModal } from './app';

export const toggleCreatingRecommendation = (bool) => ({ type: 'TOGGLE_CREATING_RECOMMENDATION', bool });

export const recommendProduct = (product) => {
  return (dispatch, getState) => {
    const { user } = getState().user;

    if (user) {
      dispatch(toggleCreatingRecommendation(true));

      createLink(product, user.id).then((res) => {
        dispatch(toggleCreatingRecommendation(false));

        ActionSheetIOS.showShareActionSheetWithOptions(
          { url: `http://www.${res.url}` },
          () => null,
          () => null,
        );
      }).catch((_) => {
        dispatch(toggleCreatingRecommendation(false));
      });
    } else {
      dispatch(triggerModal('session'));
    }
  };
};
