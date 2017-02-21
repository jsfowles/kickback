'use strict';

import { push } from './navigation';
import Request from '../utils/request';
import { NativeModules } from 'react-native';

export const toggleSearchOverlay = () => ({ type: 'TOGGLE_SEARCH_OVERLAY' });
export const cancelSearch = () => ({ type: 'CANCEL_SEARCH' });
export const updateSearchText = (string) => ({ type: 'UPDATE_SEARCH_TEXT', string })

export const fetchSearch = searchTerm => (dispatch, getState) => {
  let { session } = getState().session;

  NativeModules.RNAmplitude.logEvent('Search Submitted', { search_term: searchTerm });
  dispatch({ type: 'FETCH_SEARCH_REQUEST' });
  dispatch(push({ key: 'search' }, 'shopping'));

  const requestObj = {
    path: 'searches',
    method: 'POST',
    headers: session ? session : {},
    body: { search: { search_term: searchTerm.toLowerCase().trim() }},
  };

  return new Request(requestObj)
  .then(products => dispatch({ type: 'FETCH_SEARCH_SUCCESS', products }));
};


export const requestProducts = (searchTerm) => {
  return (dispatch) => {
    dispatch(updateSearchText(searchTerm))

    getProducts(searchTerm).then(res => {
      dispatch((receiveProducts(res)))
    })
  }
}
