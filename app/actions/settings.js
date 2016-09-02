'use strict';

import { submitProblem as submitProblemAPI } from '../utils/api';

export const updateProblemBody = (body, bool) => ({ type: 'UPDATE_PROBLEM_BODY', body, bool });

export const submitProblem = subject => {
  return (dispatch, getState) => {
    let { currentUser } = getState().user;
    let { problemBody } = getState().settings;

    return submitProblemAPI(currentUser, subject, problemBody)
    .then(_ => {
      dispatch(updateProblemBody('', false));
    });
  };
};
