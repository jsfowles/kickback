'use strict'
import {
  serverUrl,
  apiVersion,
} from '../env'

const URL = `${serverUrl}/api/${apiVersion}/users/1`

import { getCurrentUser } from '../utils/api'

export const receiveCurrentUser = userData => ({
  type: 'RECEIVE_CURRENT_USER', userData
})

export const receiveMoreProducts = userData => ({
  type: 'RECEIVE_MORE_CURRENT_USER', userData
})

export const toggleFetching = bool => ({
  type: 'TOGGLE_USER_FETCHING', bool
})

export const loadCurrentUser = _ => {
  return (dispatch, getState) => {
    let isFetching = getState().user.isFetching

    if (!isFetching) {
      dispatch(toggleFetching(true))
      getCurrentUser(URL)
      .then(res => dispatch(receiveCurrentUser(res)))
      .catch(e => console.error(e))
    }
  }
}

export const loadMoreCurrentUser = _ => {
  return (dispatch, getState) => {
    let nextPageUrl = getState().user.nextPageUrl
    let isFetching = getState().user.isFetching

    if (!isFetching) {
      dispatch(toggleFetching(true))

      getCurrentUser(nextPageUrl)
      .then(res => dispatch(receiveMoreProducts(res)))
      .catch(e => console.error(e))
    }
  }
}
