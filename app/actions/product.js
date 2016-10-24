'use strict';

import Request from '../utils/request';
import { createLink } from '../utils/api';
import { ActionSheetIOS } from 'react-native';
import { triggerModal } from './app';

export const toggleCreatingRecommendation = (bool) => ({ type: 'TOGGLE_CREATING_RECOMMENDATION', bool });

export const recommendProduct = (product) => (dispatch, getState) => {
  let { user } = getState().user;
  let { session } = getState().session;
  let requestObj = {
    path: `/links`,
    method: 'POST',
    headers: session,
    body: {
      given_url: product.buyUrl,
      user_id: user,
      product,
    },
  };

  console.log(requestObj);

  // { product: {...}}
  // { ... }

  // dispatch({ type: 'TOGGLE_CREATING_RECOMMENDATION' });

  return new Request(requestObj)
  .then(res => {
    console.log(res);
    // dispatch(toggleCreatingRecommendation(res.bool))
  });
};
