/* eslint-env node, jest */
'use strict';

import { fetchUserSuccess } from '../user';

jest.autoMockOff();

describe('fetchUserSuccess', () => {
  it('should create a action with a user object', () => {
    const user = {
      email: 'monstro@underbelly.is',
      name: 'Captain Ahab',
      id: 1,
      provider: 'email',
      role: 'user',
      uid: 'monstro@underbelly.is',
    };

    const expectedAction = { type: 'FETCH_USER_SUCCESS', user };

    expect(fetchUserSuccess(user)).toEqual(expectedAction);
  });
});
