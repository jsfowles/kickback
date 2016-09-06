/* eslint-env node, jest */
'use strict';

import 'react-native';
import { session } from '../session';

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
    expect(session(undefined, {})).toEqual({});
  });

  it('sets session when logging in', () => {
    expect(session(undefined, { type: 'CREATE_SESSION', session: sessionObj }))
    .toEqual(sessionObj);
  });

  it('removes the session when logging out', () => {
    expect(session(sessionObj, { type: 'DESTROY_SESSION' }))
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
      expect(session(sessionObj, { type: 'UPDATE_SESSION', session:  newSessionObj }))
      .toEqual(newSessionObj);
    });
  });
});
