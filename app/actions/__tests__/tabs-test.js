/* eslint-env node, jest */
'use strict';
import * as actions from '../tabs';

jest.autoMockOff();

describe('tab actions', () => {
  describe('changeTab', () => {
    it('runs the correct action with args', () => {
      const index = 1;
      const expectedAction = { type: 'CHANGE_TAB', index: 1 };

      expect(actions.changeTab(index)).toEqual(expectedAction);
    });
  });
});
