/**
 * @flow
 */
'use strict'

import { combineReducers } from 'redux'
import { navigation } from './navigation'
import { productFeed } from './productFeed'
import { search } from './search'
import { product } from './product'

export default combineReducers({
  navigation,
  productFeed,
  search,
  product,
})
