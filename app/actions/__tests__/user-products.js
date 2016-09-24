/* eslint-env node, jest */
'use strict';

import * as actions from '../user-products';

jest.autoMockOff();

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
});
