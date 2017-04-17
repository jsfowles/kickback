'use strict';

import Request from '../utils/request';

export const fetchUserProductsSuccess = (nextPage, products) => ({
  type: 'FETCH_USER_PRODUCTS_SUCCESS',
  nextPage,
  products,
});

export const fetchUserProducts = (session = null) => (dispatch, getState) => {
  let { user } = getState().user;
  let localSession = session || getState().session.session;

  if (user && localSession) {
    let requestObj = {
      path: `/users/${user.id}/products`,
      method: 'GET',
      headers: localSession,
    };

    dispatch({ type: 'FETCH_USER_PRODUCTS_REQUEST' });

    return new Request(requestObj)
    .then(res => (
      dispatch(fetchUserProductsSuccess(res.nextPage, res.products))
    ));
  }
};

