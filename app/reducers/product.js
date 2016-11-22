import { combineReducers } from 'redux';

export const products = type => (state = [], action) => {
  switch (action.type) {
    case `FETCH_${type}_SUCCESS`:
      return action.products;
    case 'DESTROY_SESSION':
      return [];
    default: return state;
  }
};

export const nextPage = type => (state = null, action) => {
  if (action.type !== `FETCH_${type}_SUCCESS`) { return state; }
  return action.nextPage ? action.nextPage : state;
};

export const isFetching = type => (state = false, action) => {
  switch (action.type) {
    case `FETCH_${type}_REQUEST`:
      return true;
    case `FETCH_${type}_SUCCESS`:
    case `FETCH_${type}_FAILURE`:
      return false;
    default: return state;
  }
};

const isFetchingRecommend = isFetching('RECOMMEND');

export default combineReducers({ isFetchingRecommend });
