'use strict'
import {
  serverUrl,
  apiVersion,
} from '../env';

import { getProductFeed } from '../utils/api';
import request from '../utils/request';

const URL = `${serverUrl}/api/${apiVersion}/product_feeds`;

export const fetchFeed = () => (dispatch) => {
  dispatch({ type: 'FETCH_PRODUCT_FEED_REQUEST' });

  return request().then(
    res => dispatch({ type: 'FETCH_PRODUCT_FEED_SUCCESS', res }),
    err => dispatch({ type: 'FETCH_PRODUCT_FEED_FAILURE', err }),
  );
};
