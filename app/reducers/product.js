const initialState = {
  creatingRecommendation: false,
}

export const product = (state = initialState, action) => {
  switch(action.type) {
    case 'TOGGLE_CREATING_RECOMMENDATION':
      return {
        creatingRecommendation: !state.creatingRecommendation
      }
    default:
      return state
  }
}
