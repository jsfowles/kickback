/* eslint-env node, jest */
'use strict';

import 'react-native';
import { navigation } from '../navigation';

jest.autoMockOff();

const initialState = {
  global: {
    index: 0,
    key: 'global',
    routes: [{ key: 'tabs' }],
  },
  shopping: {
    index: 0,
    key: 'shopping',
    routes: [{ key: 'feed' }],
  },
};

describe('navigation reducer', () => {
  it('has the correct initial state', () => {
    expect(navigation(undefined, {})).toEqual(initialState);
  });

  describe('pushing a new route', () => {
    it('will push a new route if current route !== new route', () => {
      const newRoute = { type: 'PUSH_ROUTE', route: { key: 'search' }, key: 'shopping' };
      const expectedState = {
        ...initialState,
        shopping: {
          index: 1,
          key: 'shopping',
          routes: [
            initialState.shopping.routes[0],
            { key: 'search' },
          ],
        },
      };

      expect(navigation(undefined, newRoute))
      .toEqual(expectedState);
    });

    it('will not push a new route if current route === new route', () => {
      const newRoute = { type: 'PUSH_ROUTE', route: { key: 'feed' }, key: 'shopping'};

      expect(navigation(undefined, newRoute))
      .toEqual(initialState);
    });
  });

  describe('popping routes', () => {
    it('should pop routes if they are there', () => {
      const currentState = {
        ...initialState,
        shopping: {
          index: 1,
          key: 'shopping',
          routes: [
            initialState.shopping.routes[0],
            { key: 'search' },
          ],
        },
      };

      expect(navigation(currentState, { type: 'POP_ROUTE', key: 'shopping' }))
      .toEqual(initialState);
    });

    it('will not pop a route if we are on the initial route', () => {
      expect(navigation(undefined, { type: 'POP_ROUTE', key: 'shopping' }))
      .toEqual(initialState);
    });
  });
});
