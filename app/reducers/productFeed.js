const initialState = {
  featuredSearches: [],
  featuredCategories: [],
  products: [],
  selectedIndex: 0,
}

export const productFeed = (state = initialState, action) => {
  switch(action.type) {
    case 'RECEIVE_PRODUCT_FEED':
      return {
        ...state,
        products: action.feed.products,
        featuredSearches: action.feed.featuredSearches,
        featuredCategories: action.feed.featuredCategories,
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
