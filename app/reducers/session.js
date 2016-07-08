const initialState = {
  modalVisible: false,
  currentSession: false,
  session: {
    'client': null,
    'token-type': null,
    'access-token': null,
    'uid': null,
    'expiry': null,
  },
}

export const session = (state = initialState, action) => {
  switch(action.type) {
    case 'TOGGLE_SESSION_MODAL':
      return {
        ...state,
        modalVisible: action.bool,
      }
    case 'SET_SESSION':
      return {
        ...state,
        session: action.session,
        currentSession: action.bool,
        modalVisible: false,
      }
    default:
      return state
  }
}
