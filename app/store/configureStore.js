/* global __DEV__ */
/**
 * @flow
 */

import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';

import { createLogger } from 'redux-logger';
import reducers from '../reducers';

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

const logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

const appStore = applyMiddleware(thunk, logger)(createStore);

function configureStore(onComplete: ?() => void) {
  const store = autoRehydrate()(appStore)(reducers);
  persistStore(store, { storage: AsyncStorage }, onComplete);

  if (isDebuggingInChrome) { window.store = store; }
  return store;
}

export default configureStore;
