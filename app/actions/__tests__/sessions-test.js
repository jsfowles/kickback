/* eslint-env node, jest */
'use strict';

import * as actions from '../sessions';

const validSessionObject = {
  'uid': 'hello@underbelly.is',
  'client': 'esEn6p0ftGs7v9_6pvxViw',
  'expiry': 1474392944,
  'token-type': 'Bearer',
  'access-token': '88pu9HS1PVutlU59mH_kpw',
};

const mockSessionResponse = { headers: { map: {
  'uid': [ 'hello@underbelly.is' ],
  'client': [ 'esEn6p0ftGs7v9_6pvxViw' ],
  'expiry': [ 1474392944 ],
  'token-type': [ 'Bearer' ],
  'access-token': [ '88pu9HS1PVutlU59mH_kpw' ],
}}};

describe('fetchRequestFailure', () => {
  it('should create a action with a default message', () => {
    const expectedAction = { type: 'FETCH_REQUEST_FAILURE', message: 'Invalid username or password' };
    expect(actions.fetchRequestFailure()).toEqual(expectedAction);
  });

  it('should create a action with a custom message', () => {
    const expectedAction = { type: 'FETCH_REQUEST_FAILURE', message: 'Custom message!' };
    expect(actions.fetchRequestFailure('Custom message!')).toEqual(expectedAction);
  });
});

describe('fetchSessionSuccess', () => {
  it('should create a action with a valid session', () => {
    const expectedAction = { type: 'FETCH_SESSION_SUCCESS', session: validSessionObject };
    expect(actions.fetchSessionSuccess(mockSessionResponse)).toEqual(expectedAction);
  });
});

describe('changeSessionTab', () => {
  it('should create an action to switch the tab', () => {
    const tab = 'SIGN_UP';
    const expectedAction = { type: 'CHANGE_SESSION_TAB', tab: 'SIGN_UP' };

    expect(actions.changeSessionTab(tab)).toEqual(expectedAction);
  });
});

describe('updateSessionEmail', () => {
  it('should create an action to update the email with passed in email', () => {
    const email = 'monstro@underbelly.is';
    const expectedAction = { type: 'UPDATE_EMAIL', email: 'monstro@underbelly.is' };

    expect(actions.updateSessionEmail(email)).toEqual(expectedAction);
  });
});

describe('destroySession', () => {
  const expectedAction = { type: 'DESTROY_SESSION' };

  it('should create an action to destroy the session(logout)', () => {
    expect(actions.destroySession()).toEqual(expectedAction);
  });
});
