const initialState = {
  creatingRecommendation: false,
};

export const products = type => (state = [], action) => {
  switch (action.type) {
    case `FETCH_${type}_SUCCESS`:
      return action.products;
    case 'DESTROY_SESSION':
      return [];
    default: return state;
  }
};

export const nextPage = type => (state = null, action) => {
  if (action.type !== `FETCH_${type}_SUCCESS`) { return state; }
  return action.nextPage ? action.nextPage : state;
};

export const isFetching = type => (state = false, action) => {
  switch (action.type) {
    case `FETCH_${type}_REQUEST`:
      return true;
    case `FETCH_${type}_SUCCESS`:
    case `FETCH_${type}_FAILURE`:
      return false;
    default: return state;
  }
};

export const errorMessage = type => (state = null, action) => {
  switch (action.type) {
    case `FETCH_${type}_REQUEST`:
    case `FETCH_${type}_SUCCESS`:
      return null;
    case `FETCH_${type}_FAILURE`:
      return action.message;
    default: return state;
  }
};

/**
 * OLD STUFF
 */
export const product = (state = initialState, action) => {
  switch(action.type) {
    case 'TOGGLE_CREATING_RECOMMENDATION':
      return {
        creatingRecommendation: action.bool,
      }
    default:
      return state
  }
}
