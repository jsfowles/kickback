'use strict'

const initialState = {
  searchResults: [],
}

export const search = (state = initialState, action) => {
  switch(action.type) {
    case 'RECEIVE_PRODUCTS':
      return {
        ...state
      }
    default:
      return state
  }
}
