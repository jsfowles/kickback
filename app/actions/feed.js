'use strict'
import {
  serverUrl,
  apiVersion,
} from '../env'

import { getProductFeed } from '../utils/api'

const URL = `${serverUrl}/api/${apiVersion}/product_feeds`

export const fetchFeed = () => (dispatch, getState) => {
  dispatch({ type: 'FETCH_PRODUCT_FEED_REQUEST' });

  return getProductFeed(URL)
  .then(
    res => dispatch({ type: 'FETCH_PRODUCT_FEED_SUCCESS', res }),
    err => dispatch({ type: 'FETCH_PRODUCT_FEED_FAILURE', err }),
  )
};

/**
 * OLD STUFF
 */
export const receiveProductFeed = feed => ({
  type: 'RECEIVE_PRODUCT_FEED', feed
})

export const changeCarouselPosition = pos => ({
  type: 'CHANGE_CAROUSEL_POSITION', pos
})

export const receiveMoreProducts = feed => ({
  type: 'RECEIVE_MORE_PRODUCT_FEED', feed
})

export const toggleFetching = bool => ({
  type: 'TOGGLE_PRODUCTFEED_FETCHING', bool
})

export const loadProductFeed = _ => {
  return (dispatch, getState) => {
    dispatch(toggleFetching(true))
    getProductFeed(URL)
    .then(res => dispatch(receiveProductFeed(res)))
    .catch(e => console.error(e))
  }
}

// TODO (RILEY) : lets combine loadProductFeed and loadMoreProducts
export const loadMoreProductFeed = _ => {
  return (dispatch, getState) => {
    let nextPageUrl = getState().productFeed.nextPageUrl
    let isFetching = getState().productFeed.isFetching

    if (!isFetching) {
      getProductFeed(nextPageUrl)
      .then(res => dispatch(receiveMoreProducts(res)))
      .catch(e => console.error(e))
    }
  }
}
