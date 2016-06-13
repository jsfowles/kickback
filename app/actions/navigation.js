'use strict'

import { setUserHasScrolled } from './user'

export const switchTab = (tab) => ({ type: 'SWITCH_TAB', tab })

export const setCurrentRoute = (route) => {
  return {
    type: 'SET_ROUTE', route
  }
}

export const scrollToTop = route => {
  return (dispatch, getState) => {
    let route = getState().navigation.route
    let hasScrolled = getState()[route].hasScrolled

    if (hasScrolled) {
      dispatch(setUserHasScrolled(false))
    }
  }
}
