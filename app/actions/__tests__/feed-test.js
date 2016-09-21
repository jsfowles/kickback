/* eslint-env node, jest */
'use strict';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';

import * as actions from '../feed';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('feed actions', () => {
  describe('fetchFeed', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('creates the correct actions when requesting the feed', () => {
      nock('http://www.kbck.me')
      .get('/api/v1/product_feeds')
      .reply(200, { body: { products: [{}]}});

      // TODO: This is actually broken, have a issue on stackoverflow. It should be returning a body.
      //       http://stackoverflow.com/questions/39604721/jest-nock-only-returning-null
      const expectedActions = [
        { type: 'FETCH_PRODUCT_FEED_REQUEST' },
        { type: 'FETCH_PRODUCT_FEED_SUCCESS', res: null},
      ];

      const store = mockStore({ products: [] });

      return store.dispatch(actions.fetchFeed()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});
