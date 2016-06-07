'use strict'

const initialState = {
  sharedProducts: [],
}

export const user = (state = initialState, action) => {
  switch(action.type) {
    case 'RECEIVE_CURRENT_USER':
      // TODO (Riley) : I need to receive the user profile as well
      return {
        ...state,
        sharedProducts: action.userData.products,
      }
    default:
      return state
  }
}
