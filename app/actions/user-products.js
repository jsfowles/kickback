'use strict';

import Request from '../utils/request';

export const fetchUserProductsSuccess = (nextPage, products) => ({
  type: 'FETCH_USER_PRODUCTS_SUCCESS',
  nextPage,
  products,
});

export const fetchUserProducts = () => (dispatch, getState) => {
  let { user } = getState().user;
  let { session } = getState().session;
  let requestObj = {
    path: `/users/${user.id}/products`,
    method: 'GET',
    headers: { ...session },
  };

  dispatch({ type: 'FETCH_USER_PRODUCTS_REQUEST' });

  return new Request(requestObj)
  .then(res => (
    dispatch(fetchUserProductsSuccess(res.nextPage, res.products))
  ));
};

