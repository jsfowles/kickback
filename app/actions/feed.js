'use strict';

import Request from '../utils/request';
import { closeModal } from './app';

export const fetchFeed = () => dispatch => {
  const requestObj = {
    path: `product_feeds`,
    method: 'GET',
  };

  dispatch({ type: 'FETCH_PRODUCT_FEED_REQUEST' });
  // TODO create better method from closing modal
  dispatch(closeModal());

  return new Request(requestObj).then(
    res => dispatch({ type: 'FETCH_PRODUCT_FEED_SUCCESS', products: res.products })
  );
};
