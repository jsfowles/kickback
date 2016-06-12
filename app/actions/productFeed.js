'use strict'
import {
  serverUrl,
  apiVersion,
} from '../env'

import { getProductFeed } from '../utils/api'

const URL = `${serverUrl}/api/${apiVersion}/product_feeds`

export const receiveProductFeed = feed => ({
  type: 'RECEIVE_PRODUCT_FEED', feed
})

export const changeCarouselPosition = pos => ({
  type: 'CHANGE_CAROUSEL_POSITION', pos
})

export const receiveMoreProducts = feed => ({
  type: 'RECEIVE_MORE_PRODUCTS', feed
})

export const loadProductFeed = _ => {
  return (dispatch, getState) => {
    getProductFeed(URL)
    .then(res => dispatch(receiveProductFeed(res)))
    .catch(e => console.error(e))
  }
}

// TODO (RILEY) : lets combine loadProductFeed and loadMoreProducts
export const loadMoreProducts = _ => {
  return (dispatch, getState) => {
    let nextPageUrl = getState().productFeed.nextPageUrl

    getProductFeed(nextPageUrl)
    .then(res => dispatch(receiveMoreProducts(res)))
    .catch(e => console.error(e))
  }
}
