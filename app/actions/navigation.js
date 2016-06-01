'use strict'

export const switchTab = (tab) => ({ type: 'SWITCH_TAB', tab })

export const setNavigator = (navigator, route) => {
  return {
    type: 'SET_NAVIGATOR', route, navigator
  }
}
