/* eslint-env node, jest */
'use strict';

import 'react-native';
import { user } from '../user';

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
    const action = { type: 'RECEIVE_CURRENT_USER', user: userObj };
    expect(user(undefined, action)).toEqual(userObj);
  });

  it('should set the user to null when DESTROY_SESSION is called', () => {
    const action = { type: 'DESTROY_SESSION' };
    expect(user(userObj, action)).toBeNull();
  });
});
