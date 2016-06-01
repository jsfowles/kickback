'use strict'

import { getProducts } from '../utils/api'

export const receiveProducts = (products) => ({ type: 'RECEIVE_PRODUCTS', products })
export const toggleSearchOverlay = () => ({ type: 'TOGGLE_SEARCH_OVERLAY' })
export const fetchingProducts = (string) => ({ type: 'FETCHING_PRODUCTS', string })
export const cancelSearch = () => ({ type: 'CANCEL_SEARCH' })

export const requestProducts = (searchTerm) => {
  return (dispatch) => {
    dispatch(toggleSearchOverlay())
    dispatch(fetchingProducts(searchTerm))

    getProducts(searchTerm).then(res => {
      dispatch((receiveProducts(res)))
    })
  }
}
