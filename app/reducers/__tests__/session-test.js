/* eslint-env node, jest */
'use strict';

import 'react-native';
import { session } from '../session';

jest.autoMockOff();

describe('session reducer', () => {
  it('is empty by default', () => {
    expect(session(undefined, {})).toEqual({});
  });
});
