'use strict';
import { combineReducers } from 'redux';
import * as base from './product';

const products = base.products('PRODUCT_FEED');
const isFetching = base.isFetching('PRODUCT_FEED');
const errorMessage = base.errorMessage('PRODUCT_FEED');

export default combineReducers({
  products,
  isFetching,
  errorMessage,
});
