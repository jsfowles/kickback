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
        searchOverlay: !state.searchOverlay,
        searching: true,
      }
    case 'FETCHING_PRODUCTS':
      return {
        ...state,
        searchText: action.string,
        fetchingProducts: true,
      }
    case 'CANCEL_SEARCH':
      return {
        ...state,
        searchText: null,
        searching: false,
        searchOverlay: false,
        fetchingProducts: false,
      }
    default:
      return state
  }
}
