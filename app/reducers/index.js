/**
 * @flow
 */
'use strict'

import { combineReducers } from 'redux'
import { navigation } from './navigation'
import { productFeed } from './productFeed'

export default combineReducers({
  navigation,
  productFeed,
})
