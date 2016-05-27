'use strict'

import { getProducts } from '../utils/api'

export const receiveProducts = (products) => ({ type: 'RECEIVE_PRODUCTS', products })
export const toggleSearchOverlay = () => ({ type: 'TOGGLE_SEARCH_OVERLAY' })
export const updateSearchText = (string) => ({ type: 'UPDATE_SEARCH_TEXT', string })
export const cancelSearch = () => ({ type: 'CANCEL_SEARCH' })

export const requestProducts = (searchTerm) => {
  return (dispatch) => {
    dispatch(updateSearchText(searchTerm))
    dispatch(toggleSearchOverlay())

    getProducts(searchTerm).then(res => {
      dispatch((receiveProducts(res)))
    })
  }
}
