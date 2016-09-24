/* eslint-env node, jest */
'use strict';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as actions from '../feed';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

jest.mock('../../utils/request');

describe('fetchFeed', () => {
  it('creates the correct actions when requesting the feed', () => {
    const products =  [
      { id: 103, title: 'Beal Tiger Unicore Dry Cover Climbing Rope - 10mm' },
      { id: 86, title: 'Beal Joker Unicore Dry Cover Climbing Rope - 9.1mm' },
    ];

    const expectedActions = [
      { type: 'FETCH_PRODUCT_FEED_REQUEST' },
      { type: 'FETCH_PRODUCT_FEED_SUCCESS', res: products},
    ];

    const store = mockStore({ products: [] });

    return store.dispatch(actions.fetchFeed()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
