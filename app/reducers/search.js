'use strict'

const initialState = {
  searchResults: [],
  searching: false,
  searchOverlay: false,
  searchText: null,
  fetchingProducts: false,
}

export const search = (state = initialState, action) => {
  switch(action.type) {
    case 'RECEIVE_PRODUCTS':
      return {
        ...state,
        searchResults: action.products,
        fetchingProducts: false,
      }
    case 'TOGGLE_SEARCH_OVERLAY':
      return {
        ...state,
        searchOverlay: true,
        searching: true,
      }
    case 'FETCHING_PRODUCTS':
      return {
        ...state,
        searchText: action.string,
        fetchingProducts: true,
        searchOverlay: false,
        searchResults: [],
      }
    case 'CANCEL_SEARCH':
      return initialState
    default:
      return state
  }
}
