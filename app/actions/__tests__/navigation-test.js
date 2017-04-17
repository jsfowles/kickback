/* eslint-env node, jest */
'use strict';
import * as actions from '../navigation';

jest.autoMockOff();

describe('navigation actions', () => {
  describe('push', () => {
    it('runs the correct action with args', () => {
      const key = 'Search';
      const expectedAction = { type: 'PUSH_ROUTE', route: 'Search' };

      expect(actions.push(key)).toEqual(expectedAction);
    });
  });

  describe('pop', () => {
    it('runs the correct action with args', () => {
      const expectedAction = { type: 'POP_ROUTE' };
      expect(actions.pop()).toEqual(expectedAction);
    });
  });
});
