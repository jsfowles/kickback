/* eslint-env node, jest */
'use strict';

import flashMessage from '../flashMessage';

jest.autoMockOff();

describe('flashMessage', () => {
  it('has the correct initial state', () => {
    expect(flashMessage(undefined, {})).toBeNull();
  });
});
