const initialState = {
  tab: 'SHOPPING_TAB',
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
