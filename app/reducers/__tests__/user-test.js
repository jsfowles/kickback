/* eslint-env node, jest */
'use strict';

import { user, editUser } from '../user';

jest.autoMockOff();

const userObj = {
  username: 'riley@underbelly.is',
  pendingAmount: 1000,
  paidAmount: 1000,
};

describe('user', () => {
  it('should initially be null', () => {
    expect(user(undefined, {})).toBeNull();
  });

  it('should add the user to the reducer', () => {
    const action = { type: 'FETCH_USER_SUCCESS', user: userObj };
    expect(user(undefined, action)).toEqual(userObj);
  });

  it('should set the user to null when DESTROY_SESSION is called', () => {
    const action = { type: 'DESTROY_SESSION' };
    expect(user(userObj, action)).toBeNull();
  });

  it('DESTROY_SESSION should set user to null', () => {
    const action = { type: 'DESTROY_SESSION' };
    expect(user(userObj, action)).toEqual(null);
  });
});

describe('editUser', () => {
  it('should initially be null', () => {
    expect(editUser(undefined, {})).toBeNull();
  });

  it('should replace the editUSer if no edit has been set yet', () => {
    const edit = { name: 'Monstro' };
    const action = { type: 'EDIT_USER', edit };
    expect(editUser(undefined, action)).toEqual(edit);
  });

  it('should merge existing data and new date if an edit is present', () => {
    const existing = { email: 'hello@underbelly.is' };
    const edit = { name: 'Monstro' };
    const action = { type: 'EDIT_USER', edit };
    expect(editUser(existing, action)).toEqual({ ...existing, ...edit });
  });
});
