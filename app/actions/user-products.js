'use strict';

import {
  getUsersProducts,
} from '../utils/api';

export const fetchUserProductsSuccess = (nextPage, products) => ({
  type: 'FETCH_USER_PRODUCTS_SUCCESS',
  nextPage,
  products,
});

export const fetchUserProducts = () => (dispatch, getState) => {
  let { user } = getState().user;
  let { session } = getState().session;

  dispatch({ type: 'FETCH_USER_PRODUCTS_REQUEST' });

  return getUsersProducts(user.id, session)
  .then(
    json => dispatch(fetchUserProductsSuccess({ type: 'FETCH_USER_PRODUCTS_SUCCESS', ...json })),
    err => dispatch({ type: 'FETCH_USER_PRODUCTS_ERROR' }),
  );
};

