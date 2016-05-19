/**
 * @flow
 */
'use strict'

import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native'

import reducers from '../reducers'

let isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent

let logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true,
})

let appStore = applyMiddleware(thunk, logger)(createStore)

function configureStore(onComplete: ?() => void) {
  const store = autoRehydrate()(appStore)(reducers)
  persistStore(store, { storage: AsyncStorage }, onComplete)

  if (isDebuggingInChrome ) { window.store = store }
  return store
}

export default configureStore
