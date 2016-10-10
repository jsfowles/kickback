'use strict';
import { combineReducers } from 'redux';
import * as base from './product';

const products = base.products('SEARCH');
const isFetching = base.isFetching('SEARCH', false);
const errorMessage = base.errorMessage('SEARCH');

export const searchOverlay = (state = false, action) => {
  switch (action.type) {
    case 'FETCH_SEARCH_REQUEST':
    case 'TOGGLE_SEARCH_OVERLAY': {
      return !state;
    }
    default: return state;
  }
};

export default combineReducers({
  products,
  isFetching,
  errorMessage,
  searchOverlay,
});
