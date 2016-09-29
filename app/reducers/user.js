'use strict';
import { combineReducers } from 'redux';
import * as base from './product';

const products = base.products('USER_PRODUCTS');
const nextPage = base.nextPage('USER_PRODUCTS');

export const user = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_USER_SUCCESS':
      return {
        ...state,
        ...action.user,
      };
    case 'DESTROY_SESSION':
      return null;
    default: return state;
  }
};

export const editUser = (state = null, action) => {
  switch (action.type) {
    case 'EDIT_USER':
      if (state) {
        return { ...state, ...action.edit };
      }

      return action.edit;
    default: return state;
  }
};

export default combineReducers({
  user,
  products,
  nextPage,
});
