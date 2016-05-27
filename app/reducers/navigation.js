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
    case 'TOGGLE_SEARCH_OVERLAY':
      return {
        ...state,
        searching: !state.searching,
      }
    default:
      return state
  }
}
