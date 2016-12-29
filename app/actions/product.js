'use strict';

import {
  ActionSheetIOS,
  NativeModules,
} from 'react-native';

import Request from '../utils/request';
import {
  triggerModal,
  triggerProductModal,
  lastActionTaken,
  addMessage,
} from './app';

/**
 * recommendProduct action
 * @param {object} product - product we are recommending
 * @param {function} dispatch - dispatch function for redux
 * @param {function} getState - get state function to get current state from redux
 * @returns {promise} typically this will be a error or a new link or if the user
 *                    is not logged in it will trigger the session modal
 */
export const recommendProduct = (product, showActionSheet = true) => (dispatch, getState) => {
  /**
   * Get the session and the user from state
   */
  const { session } = getState().session;
  const { user } = getState().user;

  NativeModules.RNAmplitude.logEvent("product recommended", product);

  /**
   * If user and session is present we are goping to build the request and send it.
   */
  if (user && session) {
    dispatch({ type: 'FETCH_RECOMMEND_REQUEST' });

    let requestObj = {
      method: 'POST',
      path: `/links`,
      headers: session,
      body: {
        given_url: product.givenUrl,
        user_id: user.id,
        product,
      },
    };

    return new Request(requestObj)
    .then(res => {
      dispatch({ type: 'FETCH_RECOMMEND_SUCCESS' });

      if (showActionSheet) {
        return ActionSheetIOS.showShareActionSheetWithOptions(
          { url: `http://www.${res.link.shortenedUrl}` },
          () => null,
          () => null,
        );
      }
      return dispatch(triggerProductModal(res));
    });
  }

  /**
   * If user && session is not present trigger the modal.
   */
  dispatch(lastActionTaken(recommendProduct, product));
  dispatch(addMessage('You must be logged in to recommend', 'error'));
  return dispatch(triggerModal('session'));
};
