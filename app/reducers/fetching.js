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
