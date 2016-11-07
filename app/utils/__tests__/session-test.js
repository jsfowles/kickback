/* eslint-env node, jest */
'use strict';

import { formatSession } from '../session';

jest.autoMockOff();

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

const invalidMockSessionResponse = { headers: { map: {}}};

describe('formatSession', () => {
  it('should correctly format the session when the correct params are passed in', () => {
    expect(formatSession(mockSessionResponse)).toEqual(validSessionObject);
  });

  it('should return null if the session is not valid', () => {
    expect(formatSession(invalidMockSessionResponse)).toEqual(null);
  });
});
