'use strict';

import { push } from './navigation';
import Request from '../utils/request';

export const toggleSearchOverlay = () => ({ type: 'TOGGLE_SEARCH_OVERLAY' });
export const cancelSearch = () => ({ type: 'CANCEL_SEARCH' });

export const fetchSearch = searchTerm => (dispatch, getState) => {
  let { session } = getState().session;

  dispatch({ type: 'FETCH_SEARCH_REQUEST' });
  dispatch(push({ key: 'search' }, 'shopping'));

  const requestObj = {
    path: 'searches',
    method: 'POST',
    headers: session ? session : {},
    body: { search: { search_term: searchTerm.toLowerCase().trim() }},
  };

  return new Request(requestObj)
  .then(res => dispatch({ type: 'FETCH_SEARCH_SUCCESS', products: res }));
};
