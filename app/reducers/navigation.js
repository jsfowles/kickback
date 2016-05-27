const initialState = {
  tab: 'SHOPPING_TAB',
  searching: false,
}

export const navigation = (state = initialState, action) => {
  switch(action.type) {
    case 'SWITCH_TAB':
      return {
        ...state,
        tab: action.tab,
      }
    case 'NAVIGATE_SEARCH':
      return {
        ...state,
        searching: !state.searching,
      }
    default:
      return state
  }
}
