'use strict';

import Request from '../utils/request';

export const fetchFeed = () => (dispatch, getState) => {
  let { session } = getState().session;

  const requestObj = {
    path: `product_feeds`,
    method: 'GET',
    headers: session ? session : {},
  };

  dispatch({ type: 'FETCH_PRODUCT_FEED_REQUEST' });

  return new Request(requestObj)
  .then(res => dispatch({ type: 'FETCH_PRODUCT_FEED_SUCCESS', ...res }));
};
