/* eslint-env node, jest */
'use strict';

import 'react-native';
import { session, tab, enteredEmail } from '../session';

jest.autoMockOff();

const sessionObj = {
  'uid': 'hello@underbelly.is',
  'client': 'esEn6p0ftGs7v9_6pvxViw',
  'expiry': 1474392944,
  'token-type': 'Bearer',
  'access-token': '88pu9HS1PVutlU59mH_kpw',
};

describe('session reducer', () => {
  it('should initially be null', () => {
    expect(session(undefined, {})).toBeNull();
  });

  it('should set the session when a session successfully comes through', () => {
    const action = { type: 'FETCH_SESSION_SUCCESS', session: sessionObj };
    expect(session(undefined, action)).toEqual(sessionObj);
  });

  it('should be able to destroy the session', () => {
    const action = { type: 'DESTROY_SESSION' };
    expect(session(sessionObj, action)).toEqual(null);
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
