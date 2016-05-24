'use strict'

import { getProductFeed } from '../utils/api'

export const receiveProductFeed = (feed) => ({
  type: 'RECEIVE_PRODUCT_FEED', feed
})

export const changeCarouselPosition = (pos) => ({
  type: 'CHANGE_CAROUSEL_POSITION', pos
})

export const loadProductFeed = () => {
  return (dispatch) => {
    getProductFeed().then(res => {
      dispatch(receiveProductFeed(res))
    })
  }
}
