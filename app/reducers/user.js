'use strict';
import { combineReducers } from 'redux';
import * as base from './product';
import { isFetching } from './fetching';


const products = base.products('USER_PRODUCTS');
const nextPage = base.nextPage('USER_PRODUCTS');
const isFetchingUserPayable = isFetching('USER_PAYABLE');
const isFetchingUserProducts = isFetching('USER_PRODUCTS');
const isFetchingUserProfile = isFetching('USER_PROFILE');
const isFetchingEmail = isFetching('USER_EMAIL');
const isFetchingName = isFetching('USER_NAME');
const isFetchingRecommend = isFetching('RECOMMEND');

export const user = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_USER_PROFILE_SUCCESS':
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
  isFetchingUserPayable,
  isFetchingUserProducts,
  isFetchingUserProfile,
  isFetchingEmail,
  isFetchingName,
  isFetchingRecommend
});
