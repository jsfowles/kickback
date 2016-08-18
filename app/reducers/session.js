const initialState = {
  modalVisible: false,
  currentSession: false,
  session: null,
  tabs: {
    SIGN_UP: 'SIGN_UP',
    LOG_IN: 'LOG_IN',
  },
  currentTab: 'SIGN_UP',
  username: null,
};

export const session = (state = initialState, action) => {
  switch(action.type) {
    case 'TOGGLE_SESSION_MODAL':
      return {
        ...state,
        modalVisible: action.bool,
      };
    case 'SET_SESSION':
      return {
        ...state,
        session: action.session,
        currentSession: action.bool,
        modalVisible: false,
      };
    case 'CHANGE_FORM':
      return {
        ...state,
        currentTab: action.tab,
      };
    case 'UPDATE_USERNAME':
      return {
        ...state,
        username: action.username
      };
    default:
      return state;
  }
};
