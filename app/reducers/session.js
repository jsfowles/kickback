export const session = (state = {}, action) => {
  switch (action.type) {
  case 'CREATE_SESSION':
    return action.session;
  case 'UPDATE_SESSION':
    return action.session;
  case 'DESTROY_SESSION':
    return {};
  default:
    return state;
  }
};
