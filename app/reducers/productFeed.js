const initialState = {
  featuredProducts: [],
  productFeed: [],
}

export const productFeed = (state = initialState, action) => {
  switch(action.type) {
    case 'RECEIVE_PRODUCT_FEED':
      return {
        ...state,
        productFeed: action.feed,
      }
    default:
      return state
  }
}
