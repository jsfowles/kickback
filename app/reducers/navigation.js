const initialState = {
  tab: 'FEATURED_TAB'
}

export const navigation = (state = initialState, action) => {
  switch(action.type) {
    case 'SWITCH_TAB':
      return {
        ...state,
        tab: action.tab,
      }
    default:
      return state
  }
}
