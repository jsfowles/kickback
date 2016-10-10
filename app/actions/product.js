'use strict';

import { createLink } from '../utils/api';
import { toggleSessionModal } from './sessions';
import { ActionSheetIOS } from 'react-native';

export const toggleCreatingRecommendation = (bool) => ({ type: 'TOGGLE_CREATING_RECOMMENDATION', bool });

export const recommendProduct = (product) => {
  return (dispatch, getState) => {
    const { currentUser } = getState();

    if (currentUser) {
      dispatch(toggleCreatingRecommendation(true));

      createLink(product, currentUser.data.id).then((res) => {
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
      dispatch(toggleSessionModal(true));
    }
  };
};
