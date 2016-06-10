'use strict'

import { getCurrentUser } from '../utils/api'

export const receiveCurrentUser = (userData) => ({
  type: 'RECEIVE_CURRENT_USER', userData
})

export const loadCurrentUser = () => {
  return (dispatch) => {
    getCurrentUser().then(res => {
      dispatch(receiveCurrentUser(res))
    })
  }
}
