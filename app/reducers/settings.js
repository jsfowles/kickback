'use strict';

const initialState = {
  problemBody: '',
  canSubmitProblem: false,
};

export const settings = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_PROBLEM_BODY':
    return {
      ...state,
      problemBody: action.body,
      canSubmitProblem: action.bool,
    };
  default:
    return state;
  }
};
