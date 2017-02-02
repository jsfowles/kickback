'use strict';
import { combineReducers } from 'redux';
import * as baseProduct from './product';
import { isFetching as baseFetching } from './fetching';

const products = baseProduct.products('PRODUCT_FEED');
const isFetching = baseFetching('PRODUCT_FEED');
const initialState = {
  featuredSearches: [],
  products: [],
  selectedIndex: 0,
};

const featuredCategories = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRODUCT_FEED_SUCCESS':
      return action.featuredCategories;
    default: return state;
  }
};

const featuredSearches = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_PRODUCT_FEED_SUCCESS':
      return action.featuredSearches;
    default: return state;
  }
};

const productFeed = (state = initialState, action) => {
  switch (action.type) {
    case 'RECEIVE_PRODUCT_FEED':
      return {
        ...state,
        products: action.feed.products,
        featuredSearches: action.feed.featuredSearches,
      };
    case 'CHANGE_CAROUSEL_POSITION':
      return {
        ...state,
        selectedIndex: action.pos,
      };
    default:
      return state;
  }
};

export default combineReducers({
  products,
  isFetching,
  featuredCategories,
  featuredSearches,
  productFeed,
});
