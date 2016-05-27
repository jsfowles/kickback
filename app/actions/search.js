'use strict'

import { getProducts } from '../utils/api'

export const receiveProducts = (products) => ({
  type: 'RECEIVE_PRODUCTS', products
})

export const requestProducts = (searchTerm) => {
  return (dispatch) => {
    getProducts(searchTerm).then(res => {
      // Replace view with searched one
      // toggle search
      console.log(res)
    })
  }
}
