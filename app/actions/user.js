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

export const setUserHasScrolled = bool => ({
  type: 'SET_USER_HAS_SCROLLED', bool
})

export const loadCurrentUser = _ => {
  return (dispatch) => {
    getCurrentUser(URL)
    .then(res => dispatch(receiveCurrentUser(res)))
    .catch(e => console.error(e))
  }
}

export const loadMoreCurrentUser = _ => {
  return (dispatch) => {
    getCurrentUser(URL)
    .then(res => dispatch(receiveMoreProducts(res)))
    .catch(e => console.error(e))
  }
}
