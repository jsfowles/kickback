'use strict';
import { combineReducers } from 'redux';
import * as baseProduct from './product';
import { isFetching as baseFetching } from './fetching';

const products = baseProduct.products('PRODUCT_FEED');
const isFetching = baseFetching('PRODUCT_FEED');

const featuredCategories = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRODUCT_FEED_SUCCESS':
      return action.featuredCategories;
    default: return state;
  }
};

export default combineReducers({
  products,
  isFetching,
  featuredCategories,
});
