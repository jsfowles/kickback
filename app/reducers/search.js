'use strict'

const initialState = {
  searchResults: [],
  searching: false,
  searchText: null,
}

export const search = (state = initialState, action) => {
  switch(action.type) {
    case 'RECEIVE_PRODUCTS':
      return {
        ...state,
        searchResults: action.products,
      }
    case 'TOGGLE_SEARCH_OVERLAY':
      return {
        ...state,
        searching: !state.searching,
      }
    case 'UPDATE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.string,
      }
    case 'CANCEL_SEARCH':
      return {
        ...state,
        searchText: null,
        searching: false,
      }
    default:
      return state
  }
}
