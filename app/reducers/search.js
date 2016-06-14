'use strict'

const initialState = {
  searchResults: [],
  searching: false,
  searchOverlay: false,
  searchText: null,
  fetchingProducts: false,
  hasScrolled: false,
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
        searching: true,
        searchOverlay: false,
        searchResults: [],
      }
    case 'SET_SEARCH_HAS_SCROLLED':
      return {
        ...state,
        hasScrolled: !state.hasScrolled,
      }
    case 'CANCEL_SEARCH':
      return {
        ...state,
        searching: false,
        searchOverlay: false,
        searchText: null,
        fetchingProducts: false,
      }
    default:
      return state
  }
}
