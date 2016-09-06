/* eslint-env node, jest */
'use strict';

import 'react-native';
import { currentUser } from '../user';

jest.autoMockOff();

const currentUserObj = {
  username: 'riley@underbelly.is',
  pendingAmount: 1000,
  paidAmount: 1000,
};

describe('user reducer', () => {
  it('is empty by default', () => {
    expect(currentUser(undefined, {})).toEqual({});
  });

  it('sets the user when logging in', () => {
    expect(currentUser(undefined, { type: 'CREATE_CURRENT_USER', currentUser: currentUserObj }))
    .toEqual(currentUserObj);
  });

  it('removes the user when logging out', () => {
    expect(currentUser(currentUserObj, { type: 'DESTROY_CURRENT_USER' }))
    .toEqual({});
  });

  describe('updates currentUser when needed (this would be when they update username, or email)', () => {
    const newCurrentUser = {
      username: 'Riley Bracken',
      pendingAmount: 1000,
      paidAmount: 1000,
    };

    it('updates correctly', () => {
      expect(currentUser(currentUserObj, { type: 'UPDATE_CURRENT_USER', currentUser:  newCurrentUser }))
      .toEqual(newCurrentUser);
    });
  });
});
