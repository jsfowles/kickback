'use strict';
import { combineReducers } from 'redux';
import * as baseProduct from './product';
import { isFetching as baseFetching } from './fetching';

const products = baseProduct.products('PRODUCT_FEED');
const isFetching = baseFetching('PRODUCT_FEED');
const errorMessage = baseProduct.errorMessage('PRODUCT_FEED');

export default combineReducers({
  products,
  isFetching,
  errorMessage,
});
