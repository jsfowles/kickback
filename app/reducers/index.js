/**
 * @flow
 */
'use strict'

import { combineReducers } from 'redux'
import { navigation } from './navigation'
import { productFeed } from './productFeed'
import { search } from './search'
import { product } from './product'
import { user } from './user'
import { session } from './session'

export default combineReducers({
  navigation,
  productFeed,
  search,
  product,
  user,
  session,
})
