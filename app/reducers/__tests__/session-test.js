/* eslint-env node, jest */
'use strict';

import 'react-native';
import { currentSession, tab, enteredEmail } from '../session';

jest.autoMockOff();

const sessionObj = {
  'uid': 'hello@underbelly.is',
  'client': 'esEn6p0ftGs7v9_6pvxViw',
  'expiry': 1474392944,
  'token-type': 'Bearer',
  'access-token': '88pu9HS1PVutlU59mH_kpw',
};

describe('session reducer', () => {
  it('is empty by default', () => {
    expect(currentSession(undefined, {})).toEqual({});
  });

  it('sets session when logging in', () => {
    expect(currentSession(undefined, { type: 'CREATE_SESSION', session: sessionObj }))
    .toEqual(sessionObj);
  });

  it('removes the session when logging out', () => {
    expect(currentSession(sessionObj, { type: 'DESTROY_SESSION' }))
    .toEqual({});
  });

  describe('updates session when needed (typically when a post request comes back)', () => {
    const newSessionObj = {
      'uid': 'hello@underbelly.is',
      'client': 'qQfDFKRfyQCDwR-hQY9vxQ',
      'expiry': 1474394035,
      'token-type': 'Bearer',
      'access-token': 'iZC8bY3EbxpCMo5OjLNWFQ',
    };

    it('updates correctly', () => {
      expect(currentSession(sessionObj, { type: 'UPDATE_SESSION', session:  newSessionObj }))
      .toEqual(newSessionObj);
    });
  });
});

describe('sets up the session form tabs', () => {
  it('should initially be on SIGN_UP', () => {
    expect(tab(undefined, {})).toEqual('SIGN_UP');
  });

  it('should switch tabs to provided string when CHANGE_SESSION_TAB comes in', () => {
    const action = { type: 'CHANGE_SESSION_TAB', tab: 'LOG_IN' };
    expect(tab(undefined, action)).toEqual('LOG_IN');
  });

  it('should immediatly exit out of reducer if state === new tab', () => {
    const action = { type: 'CHANGE_SESSION_TAB', tab: 'SIGN_UP' };
    expect(tab('SIGN_UP', action)).toEqual('SIGN_UP');
  });
});

describe('sets up the session form entered email', () => {
  it('should be initiall null', () => {
    expect(enteredEmail(undefined, {})).toBeNull();
  });

  it('should update the email with the provided string', () => {
    const action = { type: 'UPDATE_EMAIL', string: 'monstro@underbelly.is' };
    expect(enteredEmail(undefined, action)).toEqual('monstro@underbelly.is');
  });

  it('should return to null if string is blank', () => {
    const action = { type: 'UPDATE_EMAIL', string: '' };
    expect(enteredEmail('monstro@underbelly.is', action)).toBeNull();
  });
});
