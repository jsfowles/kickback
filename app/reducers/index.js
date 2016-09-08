/**
 * @flow
 */
'use strict';

import { combineReducers } from 'redux';
import { navigation } from './navigation';
import { productFeed } from './productFeed';
import { search } from './search';
import { product } from './product';
import { currentUser } from './user';
import { session } from './session';
import { settings } from './settings';

export default combineReducers({
  navigation,
  productFeed,
  search,
  product,
  currentUser,
  session,
  settings,
});
