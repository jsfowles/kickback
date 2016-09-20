/* eslint-env node, jest */
'use strict';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../tabs';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

jest.autoMockOff();

describe('tab actions', () => {
  describe('onTabClick', () => {
    it('it should dispatch PUSH_ROUTE if no current user and id !== 0', () => {
      const expectedAction = { type: 'PUSH_ROUTE', route: { key: 'session' }, key: 'global' };
      const store = mockStore({ currentUser: {}});

      return expect(store.dispatch(actions.onTabClick(1))).toEqual(expectedAction);
    });

    it('it should dispatch CHANGE_TAB if no current user and id === 0', () => {
      const expectedAction = { type: 'CHANGE_TAB', index: 0 };
      const store = mockStore({ currentUser: {}});

      return expect(store.dispatch(actions.onTabClick(0))).toEqual(expectedAction);
    });

    it('should dispatch CHANGE_TAB if there is a current user and id !== 0', () => {
      const expectedAction = { type: 'CHANGE_TAB', index: 1 };
      const store = mockStore({ currentUser: { id: 1 }});

      return expect(store.dispatch(actions.onTabClick(1))).toEqual(expectedAction);
    });
  });
});
