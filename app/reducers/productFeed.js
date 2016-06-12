const initialState = {
  featuredSearches: [],
  featuredCategories: [],
  products: [],
  selectedIndex: 0,
  nextPageUrl: null,
}

export const productFeed = (state = initialState, action) => {
  switch(action.type) {
    case 'RECEIVE_PRODUCT_FEED':
      return {
        ...state,
        products: action.feed.products,
        featuredSearches: action.feed.featuredSearches,
        featuredCategories: action.feed.featuredCategories,
        nextPageUrl: action.feed.nextPage,
      }
    case 'RECEIVE_MORE_PRODUCT_FEED':
      return {
        ...state,
        products: [
          ...state.products,
          ...action.feed.products,
        ],
        nextPageUrl: action.feed.nextPage,
      }
    case 'CHANGE_CAROUSEL_POSITION':
      return {
        ...state,
        selectedIndex: action.pos,
      }
    default:
      return state
  }
}
