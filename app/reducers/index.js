/**
 * @flow
 */
'use strict'

import { combineReducers } from 'redux'
import { navigation } from './navigation'
import { productFeed } from './productFeed'
import { search } from './search'

export default combineReducers({
  navigation,
  productFeed,
  search,
})
