'use strict'

const initialState = {
  sharedProducts: [],
  nextPageUrl: null,
}

export const user = (state = initialState, action) => {
  switch(action.type) {
    case 'RECEIVE_CURRENT_USER':
      // TODO (Riley) : I need to receive the user profile as well
      return {
        ...state,
        sharedProducts: action.userData.products,
      }
    case 'RECEIVE_MORE_CURRENT_USER':
      return {
        ...state,
        sharedProducts: [
          ...state.sharedProducts,
          ...action.userData.products
        ],
      }
    default:
      return state
  }
}
