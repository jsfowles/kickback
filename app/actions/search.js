'use strict';

import { getProducts } from '../utils/api';
import { push } from './navigation';

export const toggleSearchOverlay = () => ({ type: 'TOGGLE_SEARCH_OVERLAY' });
export const cancelSearch = () => ({ type: 'CANCEL_SEARCH' });

export const fetchSearch = searchTerm => (dispatch) => {
  dispatch({ type: 'FETCH_SEARCH_REQUEST' });
  dispatch(push({ key: 'search' }, 'shopping'));

  return getProducts(searchTerm).then(
    res => dispatch({ type: 'FETCH_SEARCH_SUCCESS', products: res }),
    err => dispatch({ type: 'FETCH_PRODUCT_FEED_FAILURE', err }),
  );
};
