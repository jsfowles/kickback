'use strict';

const initialState = {
  sharedProducts: [],
  currentUser: null,
  nextPageUrl: null,
  hasScrolled: false,
  isFetching: false,
};

export const user = (state = initialState, action) => {
  switch(action.type) {
    case 'RECEIVE_CURRENT_USER':
      return {
        ...state,
        sharedProducts: action.userData.products,
        nextPageUrl: action.userData.nextPage,
        currentUser: action.userData.currentUser,
        isFetching: false,
      };
    case 'RECEIVE_MORE_CURRENT_USER':
      return {
        ...state,
        sharedProducts: [
          ...state.sharedProducts,
          ...action.userData.products
        ],
        nextPageUrl: action.userData.nextPage,
        isFetching: false,
      };
    case 'TOGGLE_USER_FETCHING':
      return {
        ...state,
        isFetching: action.bool,
      };
    case 'SET_USER_HAS_SCROLLED':
      return {
        ...state,
        hasScrolled: !state.hasScrolled,
      };
    case 'REMOVE_CURRENT_USER':
      return initialState;
    default:
      return state;
  }
};
