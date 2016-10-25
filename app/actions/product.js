'use strict';

import { ActionSheetIOS } from 'react-native';
import Request from '../utils/request';
import { triggerModal } from './app';

export const toggleCreatingRecommendation = (bool) => ({ type: 'TOGGLE_CREATING_RECOMMENDATION', bool });

/**
 * recommendProduct action
 * @param {object} product - product we are recommending
 * @param {function} dispatch - dispatch function for redux
 * @param {function} getState - get state function to get current state from redux
 * @returns {promise} typically this will be a error or a new link or if the user
 *                    is not logged in it will trigger the session modal
 */
export const recommendProduct = product => (dispatch, getState) => {
  /**
   * Get the session and the user from state
   */
  const { session } = getState().session;
  const { user } = getState().user;

  /**
   * If user and session is present we are goping to build the request and send it.
   */
  if (user && session) {
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
    .then(res => (
      ActionSheetIOS.showShareActionSheetWithOptions(
        { url: res.url },
        () => null,
        () => null,
      )
    ));
  }

  /**
   * If user && session is not present trigger the modal.
   */
  return dispatch(triggerModal('session'));
};
