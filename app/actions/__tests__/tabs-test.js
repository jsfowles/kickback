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
    it('it should PUSH_ROUTE to the login form(session) if there is no current session and they try to view profile', () => {
      const expectedAction = { type: 'PUSH_ROUTE', route: { key: 'session' }, key: 'global' };
      const store = mockStore({ session: { session: null }});

      return expect(store.dispatch(actions.onTabClick(1))).toEqual(expectedAction);
    });

    it('should fire CHANGE_TAB if the tab === current tab and session is null, but the tab stays the same', () => {
      const expectedAction = { type: 'CHANGE_TAB', index: 0 };
      const store = mockStore({ session: { session: null }});

      return expect(store.dispatch(actions.onTabClick(0))).toEqual(expectedAction);
    });

    it('should dispatch CHANGE_TAB if there is a session', () => {
      const expectedAction = { type: 'CHANGE_TAB', index: 1 };
      const store = mockStore({ session: { session: {}}});

      return expect(store.dispatch(actions.onTabClick(1))).toEqual(expectedAction);
    });
  });

  describe('changeTab', () => {
    it('should distatch CHANGE tab with the expected action', () => {
      const expectedAction = { type: 'CHANGE_TAB', index: 1 };
      return expect(actions.changeTab(1)).toEqual(expectedAction);
    });
  });
});
