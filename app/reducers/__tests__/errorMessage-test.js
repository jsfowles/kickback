/* eslint-env node, jest */
'use strict';

import errorMessage from '../errorMessage';

jest.autoMockOff();

describe('errorMessage', () => {
  it('has the correct initial state', () => {
    expect(errorMessage(undefined, {})).toBeNull();
  });
});
