'use strict'

const initialState = {
  searchResults: [],
  searching: false,
}

export const search = (state = initialState, action) => {
  switch(action.type) {
    case 'RECEIVE_PRODUCTS':
      return {
        ...state
      }
    case 'TOGGLE_SEARCH_OVERLAY':
      return {
        ...state,
        searching: !state.searching,
      }
    default:
      return state
  }
}
