'use strict';

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST_FAILURE':
      return action.message;
    case 'FETCH_SESSION_SUCCESS':
    case 'FETCH_SESSION_REQUEST':
      return null;
    default:
      return state;
  }
};

export default errorMessage;
