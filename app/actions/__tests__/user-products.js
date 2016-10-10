/* eslint-env node, jest */
'use strict';

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../user-products';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

jest.mock('../../utils/request');

describe('fetchUserProductsSuccess', () => {
  it('should create a action with a nextPage string and products array', () => {
    const nextPage = 'http://www.kbck.me/api/v1/users/1/products&nextPage=2';
    const products = [];

    const expectedAction = {
      type: 'FETCH_USER_PRODUCTS_SUCCESS',
      nextPage,
      products,
    };

    expect(actions.fetchUserProductsSuccess(nextPage, products))
    .toEqual(expectedAction);
  });
});

describe('fetchUserProducts', () => {
  const products =  [
    { id: 103, title: 'Beal Tiger Unicore Dry Cover Climbing Rope - 10mm' },
    { id: 86, title: 'Beal Joker Unicore Dry Cover Climbing Rope - 9.1mm' },
  ];

  const expectedActions = [
    { type: 'FETCH_USER_PRODUCTS_REQUEST' },
    { type: 'FETCH_USER_PRODUCTS_SUCCESS', nextPage: undefined, products: products },
  ];

  const store = mockStore({
    user: { user: {
      id: 1,
      products: [],
    }},
    session: {},
  });

  it('creates the correct actions when requesting the users products', () => {
    return store.dispatch(actions.fetchUserProducts()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
