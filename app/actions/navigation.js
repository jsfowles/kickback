'use strict'

export const switchTab = tab => ({ type: 'SWITCH_TAB', tab })
export const setHasScrolled = route => ({ type: `SET_${route.toUpperCase()}_HAS_SCROLLED` })
export const setCurrentRoute = route => ({ type: 'SET_ROUTE', route })

export const scrollToTop = route => {
  return (dispatch, getState) => {
    let route = getState().navigation.route
    let hasScrolled = getState()[route].hasScrolled

    if (hasScrolled) {
      dispatch(setHasScrolled(route))
    }
  }
}
