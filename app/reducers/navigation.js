const initialState = {
  tab: 'SHOPPING_TAB',
  route: 'SHOPPING',
};

export const navigation = (state = initialState, action) => {
  switch (action.type) {
  case 'SET_ROUTE':
    return {
      ...state,
      navigator: action.navigator,
      route: action.route,
    };
  case 'SWITCH_TAB':
    return {
      ...state,
      tab: action.tab,
    };
  default:
    return state;
  }
};
