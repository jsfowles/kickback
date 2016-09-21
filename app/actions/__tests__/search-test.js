/* eslint-env node, jest */
'use strict';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as actions from '../search';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

jest.autoMockOff();

describe('search actions', () => {
  describe('toggleSearchOverlay', () => {
    it('should create an action to add a todo', () => {
      const expectedAction = { type: 'TOGGLE_SEARCH_OVERLAY' };
      expect(actions.toggleSearchOverlay()).toEqual(expectedAction);
    });
  });

  describe('cancelSearch', () => {
    it('should create an action to add a todo', () => {
      const expectedAction = { type: 'CANCEL_SEARCH' };
      expect(actions.cancelSearch()).toEqual(expectedAction);
    });
  });

  describe('fetchSearch', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('creates the correct actions when requesting the feed', () => {
      nock('http://example.dev')
      .post('/api/v1/product_feeds')
      .reply(200, { body: { products: [{}]}});

      // TODO: This is actually broken, have a issue on stackoverflow.
      //       It should be returning a body.
      //       http://stackoverflow.com/questions/39604721/jest-nock-only-returning-null
      const expectedActions = [
        { type: 'FETCH_SEARCH_REQUEST' },
        { type: 'PUSH_ROUTE', route: { key: 'search' }, key: 'shopping' },
        { type: 'FETCH_SEARCH_SUCCESS', res: { products: null }},
      ];

      const store = mockStore({ products: [] });

      return store.dispatch(actions.fetchSearch('test')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
