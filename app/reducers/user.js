'use strict'

const initialState = {
  sharedProducts: [],
  nextPageUrl: null,
  hasScrolled: false,
  isFetching: false,
}

export const user = (state = initialState, action) => {
  switch(action.type) {
    case 'RECEIVE_CURRENT_USER':
      // TODO (Riley) : I need to receive the user profile as well
      return {
        ...state,
        sharedProducts: action.userData.products,
        nextPageUrl: action.userData.nextPage,
      }
    case 'RECEIVE_MORE_CURRENT_USER':
      return {
        ...state,
        sharedProducts: [
          ...state.sharedProducts,
          ...action.userData.products
        ],
        nextPageUrl: action.userData.nextPage,
      }
    case 'TOGGLE_USER_FETCHING':
      return {
        ...state,
        isFetching: action.bool,
      }
    case 'SET_USER_HAS_SCROLLED':
      return {
        ...state,
        hasScrolled: !state.hasScrolled,
      }
    default:
      return state
  }
}
