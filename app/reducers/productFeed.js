const initialState = {
  featuredProducts: [],
  products: [],
}

export const productFeed = (state = initialState, action) => {
  switch(action.type) {
    case 'RECEIVE_PRODUCT_FEED':
      return {
        ...state,
        products: action.feed,
      }
    default:
      return state
  }
}
