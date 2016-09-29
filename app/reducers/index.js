/**
 * @flow
 */
'use strict';

import { combineReducers } from 'redux';

import { navigation } from './navigation';
import feed from './feed';
import search from './search';
import { product } from './product';
import user from './user';
import session from './session';
import app from './app';
import { settings } from './settings';
import { tabs } from './tabs';

export default combineReducers({
  navigation,
  feed,
  search,
  product,
  user,
  session,
  settings,
  tabs,
  app,
});
