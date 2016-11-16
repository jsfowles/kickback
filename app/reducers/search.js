'use strict';
import { combineReducers } from 'redux';
import * as base from './product';
import * as fm from './flashMessage';

const products = base.products('SEARCH');
const isFetching = base.isFetching('SEARCH', false);
const flashMessage = fm.flashMessage('SEARCH');

export const searchOverlay = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SEARCH_OVERLAY': {
      return !state;
    }
    default: return state;
  }
};

export default combineReducers({
  products,
  isFetching,
  flashMessage,
  searchOverlay,
});
