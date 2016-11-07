'use strict';

import { NavigationExperimental } from 'react-native';

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const initialState = {
  global: {
    index: 0,
    key: 'global',
    routes: [{ key: 'tabs' }],
  },
  shopping: {
    index: 0,
    key: 'shopping',
    routes: [{ key: 'feed' }],
  },
  profile: {
    index: 0,
    key: 'profile',
    routes: [{ key: 'user' }],
  },
  session: {
    index: 0,
    key: 'session',
    routes: [{ key: 'login' }],
  },
};

export const navigation = (state = initialState, action) => {
  switch (action.type) {
    case 'PUSH_ROUTE': {
      const route = action.route;
      const tabKey = action.key;
      const scenes = state[tabKey];

      if (scenes.routes[scenes.routes.length - 1].key !== route.key) {
        const nextScenes = NavigationStateUtils.push(scenes, route);

        return { ...state, [tabKey]: nextScenes };
      }

      return state;
    }
    case 'POP_ROUTE': {
      const tabKey = action.key;
      const scenes = state[tabKey];
      const nextScenes = NavigationStateUtils.pop(scenes);

      if (scenes !== nextScenes) {
        return { ...state, [tabKey]: nextScenes };
      }

      return state;
    }
    case 'DESTROY_SESSION': {
      return initialState;
    }
    default: return state;
  }
};
