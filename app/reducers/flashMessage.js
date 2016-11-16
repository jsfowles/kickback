import { combineReducers } from 'redux';

export const flashMessage = type => (state = null, action) => {
  switch (action.type) {
    case `FETCH_${type}_REQUEST`:
    case `FETCH_${type}_SUCCESS`:
      return null;
    case `FETCH_${type}_FAILURE`:
      return action.message;
    default: return state;
  }
};

export default combineReducers({
  flashMessage,
});
