const initialState = {
  modalVisible: false,
  currentSession: false,
  session: null,
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
    default:
      return state;
  }
};
